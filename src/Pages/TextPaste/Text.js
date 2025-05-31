import { Box } from '@mui/material'
import React from 'react'
import TextSettingsPannel from '../../Components/TextBased/TextSettingsPannel'
import InputTextArea from '../../Components/TextBased/InputTextArea'
import { getSharedJson } from '../../Functions/ApiService'

const Text = ({ jsonData, setJsonData }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const loadSharedJson = async () => {
      const pathParts = window.location.pathname.split('/');
      const uuid = pathParts[pathParts.length - 1];
      
      if (uuid && uuid.length > 10) {
        try {
          setIsLoading(true);
          const content = await getSharedJson(uuid);
          if (content) {
            setJsonData(typeof content === 'string' ? content : JSON.stringify(content, null, 2));
          }
        } catch (error) {
          console.error('Error loading shared JSON:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadSharedJson();
  }, []);
  
  return (
    <Box sx={{ width: '100%' }}>
      <TextSettingsPannel jsonData={jsonData} setJsonData={setJsonData} />
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          Loading shared JSON...
        </Box>
      ) : (
        <InputTextArea jsonData={jsonData} setJsonData={setJsonData} />
      )}
    </Box>
  )
}

export default Text