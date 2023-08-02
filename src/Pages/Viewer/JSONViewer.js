import { Box } from '@mui/material'
import React from 'react'
import ReactJson from '@microlink/react-json-view'
import { isValidJSON } from '../../Functions/JsonBased'
import SettingsPannel from '../../Components/ViewBased/SettingsPannel'
import json5 from 'json5'

const JSONViewer = ({ modJSON, setModJSON }) => {

  const [displayDataTypes, setDisplayDataTypes] = React.useState(true)
  const [displayObjectSize, setDisplayObjectSize] = React.useState(true)
  const [enableEditing, setEnableEditing] = React.useState(false)


  return (
    <Box sx={{ width: '100%' }}>

      <SettingsPannel 
        displayDataTypes={displayDataTypes} setDisplayDataTypes={setDisplayDataTypes}
        displayObjectSize={displayObjectSize} setDisplayObjectSize={setDisplayObjectSize}
        enableEditing={enableEditing} setEnableEditing={setEnableEditing}
        modJSON={modJSON}
      />

      
      { isValidJSON(modJSON) &&
        <ReactJson
          style={{ zoom: '1.5' }}
          src={json5.parse(modJSON)} indentWidth={7} collapsed={1}
          displayDataTypes={displayDataTypes} displayObjectSize={displayObjectSize}
          onEdit={enableEditing ? e => setModJSON(JSON.stringify(e.updated_src)) : false}
          onAdd={enableEditing ? e => setModJSON(JSON.stringify(e.updated_src)) : false}
          onDelete={enableEditing ? e => setModJSON(JSON.stringify(e.updated_src)) : false}
        />
      }

    </Box>
  )
}

export default JSONViewer