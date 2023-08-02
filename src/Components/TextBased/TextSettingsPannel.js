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


    return (
        <Box sx={{ width: '100%', height: '100%'}}>
            <ButtonGroup variant="outlined" aria-label="outlined primary button group" size='secondary'>
                <Button onClick={handleMinifyJSON}>Minify</Button>
                <Button onClick={handleBeautifyJSON}>Beautify</Button>
                <Button onClick={handleClearData}>Clear</Button>
            </ButtonGroup>
        </Box>
    )
}

export default TextSettingsPannel