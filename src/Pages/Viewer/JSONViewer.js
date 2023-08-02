import { Box } from '@mui/material'
import React from 'react'

const JSONViewer = ({ jsonStringData }) => {

  return (
    <Box sx={{ width: '100%' }}>
      <h1>Settings Pannel which resizes according to screen</h1>
      <h1>JSON Viewer</h1>
      {jsonStringData}
    </Box>
  )
}

export default JSONViewer