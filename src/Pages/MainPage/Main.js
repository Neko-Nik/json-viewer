import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import JSONViewer from '../Viewer/JSONViewer';
import Text from '../TextPaste/Text';
import { isValidJSON } from '../../Functions/JsonBased';


const Main = () => {

  const [jsonData, setJsonData] = React.useState('')
  const [value, setValue] = React.useState('Text')

  const handleChange = (event, newValue) => {
    if (newValue === 'About') {
      window.open('https://www.nekonik.com/about', '_blank')
    } else if (newValue === 'Visual') {
      if (isValidJSON(jsonData)) {
        setValue(newValue)
      } else {
        alert('Cats! The JSON is not valid!')
      }
    } else {
      setValue(newValue)
    }
  };


  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        sx={{ pb: 1 }}
      >
        <Tab value="Visual" label="Visual" />
        <Tab value="Text" label="Text" />
        <Tab value="About" label="About" />
      </Tabs>

      { value === 'Visual' &&
        <JSONViewer jsonStringData={jsonData} />
      }

      { value === 'Text' &&
        <Text jsonData={jsonData} setJsonData={setJsonData} />
      }

    </Box>
  )
}

export default Main