import { Box } from '@mui/material'
import React from 'react'
import TextSettingsPannel from '../../Components/TextBased/TextSettingsPannel'
import InputTextArea from '../../Components/TextBased/InputTextArea'

const Text = ({ jsonData, setJsonData }) => {
  
  
  return (
    <Box sx={{ width: '100%' }}>
      
      <TextSettingsPannel jsonData={jsonData} setJsonData={setJsonData} />

      <InputTextArea jsonData={jsonData} setJsonData={setJsonData} />
    
    </Box>
  )
}

export default Text