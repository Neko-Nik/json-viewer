import { Box, Button, ButtonGroup } from '@mui/material'
import json5 from 'json5'
import React from 'react'


const SettingsPannel = ({ displayDataTypes, setDisplayDataTypes,
                          displayObjectSize, setDisplayObjectSize,
                          enableEditing, setEnableEditing, modJSON }) => {

    
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


    return (
        <Box sx={{ width: '100%', height: '100%', pb: 2 }}>
            <ButtonGroup variant="outlined" aria-label="outlined primary button group" size='secondary'>
                <ModButton text='Data Types' state={displayDataTypes} setState={setDisplayDataTypes} />
                <ModButton text='Object Size' state={displayObjectSize} setState={setDisplayObjectSize} />
                <ModButton text='Edit' state={enableEditing} setState={setEnableEditing} />
                <Button text='Download' onClick={handleDownload} variant='outlined' color='secondary'>Download</Button>
            </ButtonGroup>
        </Box>
    )
}

export default SettingsPannel