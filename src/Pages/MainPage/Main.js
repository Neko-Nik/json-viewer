import React from 'react';
import {
  Box, Tab, Tabs, IconButton,
  ThemeProvider, createTheme, CssBaseline
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

import JSONViewer from '../Viewer/JSONViewer';
import Text from '../TextPaste/Text';
import { isValidJSON } from '../../Functions/JsonBased';

const Main = () => {
  const [jsonData, setJsonData] = React.useState('');
  const [value, setValue] = React.useState('Text');

  const [mode, setMode] = React.useState(() => localStorage.getItem('theme') || 'light');

  const theme = React.useMemo(() =>
    createTheme({
      palette: { mode },
    }), [mode]);

  React.useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleChange = (event, newValue) => {
    if (newValue === 'About') {
      window.open('https://www.nekonik.com/about', '_blank');
    } else if (newValue === 'Visual') {
      if (isValidJSON(jsonData)) {
        setValue(newValue);
      } else {
        alert('Cats! The JSON is not valid!');
      }
    } else {
      setValue(newValue);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="tabs"
          >
            <Tab value="Visual" label="Visual" />
            <Tab value="Text" label="Text" />
            <Tab value="About" label="About" />
          </Tabs>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>

        {value === 'Visual' && <JSONViewer modJSON={jsonData} setModJSON={setJsonData} />}
        {value === 'Text' && <Text jsonData={jsonData} setJsonData={setJsonData} />}
      </Box>
    </ThemeProvider>
  );
};

export default Main;
