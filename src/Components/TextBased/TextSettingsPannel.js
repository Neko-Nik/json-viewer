import { Box, Button, ButtonGroup } from '@mui/material'
import React from 'react'

import {minifyJSON , beautifyJSON , clearData} from '../../Functions/JsonBased'


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


    return (
        <Box sx={{ width: '100%', height: '100%', pb: 1 }}>
            <ButtonGroup variant="outlined" aria-label="outlined primary button group" size='secondary'>
                <Button onClick={handleMinifyJSON}>Minify</Button>
                <Button onClick={handleBeautifyJSON}>Beautify</Button>
                <Button onClick={handleLoadJSONFile}>Load</Button>
                <Button onClick={handleClearData}>Clear</Button>
            </ButtonGroup>
        </Box>
    )
}

export default TextSettingsPannel