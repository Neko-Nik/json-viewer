import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Divider,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { format } from 'date-fns';

const formatTimestamp = (timestamp) => {
  try {
    return format(new Date(timestamp), "dd MMM yyyy, hh:mm a 'UTC'");
  } catch {
    return timestamp;
  }
};

const ShareDialog = ({ open, onClose, shareResult, shareError }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackbarOpen(true);
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const shareUrl = shareResult
    ? `https://jsonviewer.nekonik.com/?share=${shareResult.id}`
    : '';

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {shareError ? 'Error Sharing JSON' : '🎉 JSON Shared Successfully'}
        </DialogTitle>

        <DialogContent dividers>
          {shareError ? (
            <Typography color="error">{shareError}</Typography>
          ) : (
            <>
              <Typography gutterBottom>
                Here’s your shareable link:
                <Tooltip title="Copy link">
                  <IconButton
                    size="small"
                    onClick={() => handleCopy(shareUrl)}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Typography>

              <Box
                onClick={() => handleCopy(shareUrl)}
                sx={{
                  p: 1.5,
                  border: '1px solid #ccc',
                  borderRadius: 2,
                  bgcolor: '#f9f9f9',
                  position: 'relative',
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  },
                  mb: 2,
                }}
              >
                <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                    {shareUrl}
                </Typography>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Box>
                <Typography variant="caption" color="text.secondary">
                  Created: {formatTimestamp(shareResult?.created_at)}
                </Typography>
                <br />
                <Typography variant="caption" color="text.secondary">
                  Expires: {formatTimestamp(shareResult?.expires_at)}
                </Typography>
              </Box>
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" variant="filled">
          Link copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ShareDialog;
