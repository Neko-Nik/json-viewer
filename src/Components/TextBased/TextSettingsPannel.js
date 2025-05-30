import { Box, Button, ButtonGroup } from '@mui/material'
import React from 'react'

import {minifyJSON , beautifyJSON , clearData} from '../../Functions/JsonBased'
import { postJsonData } from '../../Functions/ApiService'


const TextSettingsPannel = ({ jsonData , setJsonData }) => {

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
            // Try to parse the JSON to ensure it's valid
            const parsedData = JSON.parse(jsonData);
            const result = await postJsonData(parsedData);
            // You can implement your own UI to show the key to the user
            alert(`Your JSON has been shared!\nKey: ${result.key}\nExpires at: ${result.expiresAt}`);
        } catch (error) {
            alert('Error sharing JSON: ' + (error.message || 'Invalid JSON'));
        }
    }

    return (
        <Box sx={{ width: '100%', height: '100%', pb: 1 }}>
            <ButtonGroup variant="outlined" aria-label="outlined primary button group" size='secondary'>
                <Button onClick={handleMinifyJSON}>Minify</Button>
                <Button onClick={handleBeautifyJSON}>Beautify</Button>
                <Button onClick={handleLoadJSONFile}>Load</Button>
                <Button onClick={handleClearData}>Clear</Button>
                <Button onClick={handleShareJSON}>Share</Button>
            </ButtonGroup>
        </Box>
    )
}

export default TextSettingsPannel