import { Box, Button, ButtonGroup, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material'
import React, { useState } from 'react'
import ShareIcon from '@mui/icons-material/Share'

import {minifyJSON , beautifyJSON , clearData} from '../../Functions/JsonBased'
import { postJsonData } from '../../Functions/ApiService'


const TextSettingsPannel = ({ jsonData , setJsonData }) => {
    const [shareDialog, setShareDialog] = useState(false);
    const [shareResult, setShareResult] = useState(null);
    const [shareError, setShareError] = useState(null);

    const handleDialogClose = () => {
        setShareDialog(false);
        setShareError(null);
    };

    const handleMinifyJSON = () => {
        setJsonData(minifyJSON(jsonData))
    }

    const handleBeautifyJSON = () => {
        setJsonData(beautifyJSON(jsonData))
    }

    const handleClearData = () => {
        clearData(setJsonData)
    }

    const handleLoadJSONFile = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = e => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsText(file,'UTF-8');
            reader.onload = readerEvent => {
                setJsonData(readerEvent.target.result)
            }
        }
        input.click();
    }

    const handleShareJSON = async () => {
        try {
            const parsedData = await JSON.parse(jsonData);
            const result = await postJsonData(parsedData);
            setShareResult(result);
            setShareDialog(true);
        } catch (error) {
            setShareError(error.message || 'Invalid JSON');
            setShareDialog(true);
        }
    }

    return (
        <Box sx={{ width: '100%', height: '100%', pb: 1 }}>
            <ButtonGroup variant="outlined" aria-label="outlined primary button group" size='secondary'>
                <Button onClick={handleMinifyJSON}>Minify</Button>
                <Button onClick={handleBeautifyJSON}>Beautify</Button>
                <Button onClick={handleLoadJSONFile}>Load</Button>
                <Button onClick={handleClearData}>Clear</Button>
                <Button onClick={handleShareJSON} startIcon={<ShareIcon />}>Share</Button>
            </ButtonGroup>

            <Dialog
                open={shareDialog}
                onClose={handleDialogClose}
                aria-labelledby="share-dialog-title"
            >
                <DialogTitle id="share-dialog-title">
                    {shareError ? 'Error Sharing JSON' : 'JSON Shared Successfully'}
                </DialogTitle>
                <DialogContent>
                    {shareError ? (
                        <DialogContentText color="error">
                            {shareError}
                        </DialogContentText>
                    ) : (
                        <>
                            <DialogContentText>
                                Your JSON has been shared!<br />
                                Share Link: {`https://api.nekonik.com/neko-nik/json-share/${shareResult?.id}`}<br />
                                Expires at: {shareResult?.expiresAt}
                            </DialogContentText>
                            <Button 
                                variant="outlined" 
                                sx={{ mt: 2 }}
                                onClick={() => {
                                    navigator.clipboard.writeText(`https://api.nekonik.com/neko-nik/json-share/${shareResult?.id}`);
                                }}
                            >
                                Copy Link
                            </Button>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default TextSettingsPannel