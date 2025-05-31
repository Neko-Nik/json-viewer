import React, { useState, useEffect } from 'react';
import { Box, Button, ButtonGroup } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';

import { minifyJSON, beautifyJSON, clearData } from '../../Functions/JsonBased';
import { postJsonData, getSharedJson } from '../../Functions/ApiService';
import ShareDialog from './ShareDialog';



const TextSettingsPanel = ({ jsonData, setJsonData }) => {
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareResult, setShareResult] = useState(null);
  const [shareError, setShareError] = useState(null);

  // Only run once on initial mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const shareId = urlParams.get('share');

    if (shareId) {
      setJsonData('Loading . . .');
      getSharedJson(shareId)
        .then(data => setJsonData(JSON.stringify(data.data.content, null, 2)))
        .catch(() => setJsonData('{"error": "Failed to fetch shared JSON data."}'));
    }
  }, [setJsonData]);

  const handleMinifyJSON = () => {
    setJsonData(minifyJSON(jsonData));
  };

  const handleBeautifyJSON = () => {
    setJsonData(beautifyJSON(jsonData));
  };

  const handleClearData = () => {
    // Clear the Path parameter from the URL
    const url = new URL(window.location.href);
    url.searchParams.delete('share');
    window.history.replaceState({}, '', url.toString());
    // Clear the JSON data
    setJsonData('');
    // Optionally clear any shared data
    setShareResult(null);
    setShareError(null);
    // Call the clearData function to reset any other state if needed
    clearData(setJsonData);
  };

  const handleLoadJSONFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = e => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = event => {
        setJsonData(event.target.result);
      };

      reader.readAsText(file, 'UTF-8');
    };

    input.click();
  };

  const handleShareJSON = async () => {
    try {
      const parsed = JSON.parse(jsonData);
      const result = await postJsonData(parsed);
      setShareResult(result.data);
      setShareError(null);
    } catch (err) {
      setShareResult(null);
      setShareError(err.message || 'Invalid JSON');
    } finally {
      setShareDialogOpen(true);
    }
  };

  return (
    <Box sx={{ width: '100%', height: '100%', pb: 1 }}>
      <ButtonGroup variant="outlined" size="medium">
        <Button onClick={handleMinifyJSON}>Minify</Button>
        <Button onClick={handleBeautifyJSON}>Beautify</Button>
        <Button onClick={handleLoadJSONFile}>Load</Button>
        <Button onClick={handleClearData}>Clear</Button>
        <Button onClick={handleShareJSON} startIcon={<ShareIcon />}>
          Share
        </Button>
      </ButtonGroup>

      <ShareDialog
        open={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        shareResult={shareResult}
        shareError={shareError}
      />
    </Box>
  );
};

export default TextSettingsPanel;
