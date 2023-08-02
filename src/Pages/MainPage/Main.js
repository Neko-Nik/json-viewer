import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import JSONViewer from '../Viewer/JSONViewer';
import Text from '../TextPaste/Text';
import About from '../About/About';

const Main = () => {

  const [jsonData, setJsonData] = React.useState('')
  const [value, setValue] = React.useState('Text')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  };


  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="Visual" label="Visual" />
        <Tab value="Text" label="Text" />
        <Tab value="About" label="About" />
      </Tabs>

      { value === 'Visual' &&
        <JSONViewer />
      }

      { value === 'Text' &&
        <Text jsonData={jsonData} setJsonData={setJsonData} />
      }

      { value === 'About' &&
        <About />
      }


    </Box>
  )
}

export default Main