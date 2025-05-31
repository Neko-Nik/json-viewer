import { Box, Button, ButtonGroup } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share';
import json5 from 'json5'
import { useState } from 'react';
import ShareDialog from '../ShareDialog';
import { postJsonData } from '../../Functions/ApiService';


const SettingsPannel = ({ displayDataTypes, setDisplayDataTypes,
                          displayObjectSize, setDisplayObjectSize,
                          enableEditing, setEnableEditing, modJSON }) => {

    const [shareDialogOpen, setShareDialogOpen] = useState(false);
    const [shareResult, setShareResult] = useState(null);
    const [shareError, setShareError] = useState(null);

    const ModButton = ({ text, state, setState }) => {
      // state is a boolean

      const handleClick = () => {
        setState(!state)
      }
      // The button color is based on the state of the button
      return (
        <Button
          onClick={handleClick}
          variant='outlined'
          color={state ? 'success' : 'error'}
        >
          {text}
        </Button>
      )
    }

    const handleDownload = () => {
      // Download the modified JSON file as a .json file prompt user to save
      const element = document.createElement('a')
      const file = new Blob([JSON.stringify(json5.parse(modJSON), null, 2)], {type: 'text/plain'})
      element.href = URL.createObjectURL(file)
      element.download = 'NekoNik-modifiedJSON.json'
      document.body.appendChild(element)
      element.click()
    }

    const handleShareJSON = async () => {
      try {
        const parsed = json5.parse(modJSON);
        const result = await postJsonData(parsed);
        setShareResult(result.data);
        setShareError(null);
      } catch (err) {
        setShareResult(null);
        setShareError(err.message || 'Invalid JSON');
      } finally {
        setShareDialogOpen(true);
      }
    };

    return (
        <Box sx={{ width: '100%', height: '100%', pb: 2 }}>
            <ButtonGroup variant="outlined" aria-label="outlined primary button group" size='secondary'>
                <ModButton text='Data Types' state={displayDataTypes} setState={setDisplayDataTypes} />
                <ModButton text='Object Size' state={displayObjectSize} setState={setDisplayObjectSize} />
                <ModButton text='Edit' state={enableEditing} setState={setEnableEditing} />
                <Button text='Download' onClick={handleDownload} variant='outlined' color='secondary'>Download</Button>
                <Button onClick={handleShareJSON} startIcon={<ShareIcon />}>Share</Button>
            </ButtonGroup>

            <ShareDialog
              open={shareDialogOpen}
              onClose={() => setShareDialogOpen(false)}
              shareResult={shareResult}
              shareError={shareError}
            />
        </Box>
    )
}

export default SettingsPannel