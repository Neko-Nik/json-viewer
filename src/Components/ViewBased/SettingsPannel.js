import { Box, Button, ButtonGroup } from '@mui/material'
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
          variant={state ? 'contained' : 'outlined'}
        >
          {text}
        </Button>
      )
    }



    const handleDownload = () => {
      const element = document.createElement("a");
      const file = new Blob([JSON.stringify(modJSON, null, 2)], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = "Neko_Nik-JSON_Editor.json";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
    }


    return (
        <Box sx={{ width: '100%', height: '100%'}}>
            <ButtonGroup variant="outlined" aria-label="outlined primary button group" size='secondary'>
                <ModButton text='Data Types' state={displayDataTypes} setState={setDisplayDataTypes} />
                <ModButton text='Object Size' state={displayObjectSize} setState={setDisplayObjectSize} />
                <ModButton text='Edit' state={enableEditing} setState={setEnableEditing} />
                <Button text='Download' onClick={handleDownload} variant='contained' color='secondary'>Download</Button>
            </ButtonGroup>
        </Box>
    )
}

export default SettingsPannel