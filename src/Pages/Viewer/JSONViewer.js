import { Box } from '@mui/material'
import React from 'react'
import ReactJson from '@microlink/react-json-view'
import { isValidJSON } from '../../Functions/JsonBased'
import SettingsPannel from '../../Components/ViewBased/SettingsPannel'

const JSONViewer = ({ jsonStringData }) => {

  const [displayDataTypes, setDisplayDataTypes] = React.useState(true)
  const [displayObjectSize, setDisplayObjectSize] = React.useState(true)
  const [enableEditing, setEnableEditing] = React.useState(false)

  const [modJSON, setModJSON] = React.useState(JSON.parse(jsonStringData))


  return (
    <Box sx={{ width: '100%' }}>

      <SettingsPannel 
        displayDataTypes={displayDataTypes} setDisplayDataTypes={setDisplayDataTypes}
        displayObjectSize={displayObjectSize} setDisplayObjectSize={setDisplayObjectSize}
        enableEditing={enableEditing} setEnableEditing={setEnableEditing}
        modJSON={modJSON}
      />

      
      { isValidJSON(jsonStringData) &&
        <ReactJson 
          src={JSON.parse(jsonStringData)} indentWidth={7} collapsed={1}
          displayDataTypes={displayDataTypes} displayObjectSize={displayObjectSize}
          onEdit={enableEditing ? e => setModJSON(e.updated_src) : false}
          onAdd={enableEditing ? e => setModJSON(e.updated_src) : false}
          onDelete={enableEditing ? e => setModJSON(e.updated_src) : false}
        />
      }

    </Box>
  )
}

export default JSONViewer