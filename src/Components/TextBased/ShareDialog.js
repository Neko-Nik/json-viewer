import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Link
} from '@mui/material';


const ShareDialog = ({ open, onClose, shareResult, shareError }) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="share-dialog-title">
      <DialogTitle id="share-dialog-title">
        {shareError ? 'Error Sharing JSON' : 'JSON Shared Successfully'}
      </DialogTitle>
      <DialogContent>
        {shareError ? (
          <DialogContentText color="error">{shareError}</DialogContentText>
        ) : (
          <>
            <DialogContentText>
              Your JSON has been shared!
            </DialogContentText>
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2">
                Share URL:{' '}
                <Link
                  href={`https://jsonviewer.nekonik.com/?share=${shareResult?.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://jsonviewer.nekonik.com/?share={shareResult?.id}
                </Link>
              </Typography>
              <Typography variant="body2">Created at: {shareResult?.created_at}</Typography>
              <Typography variant="body2">Expires at: {shareResult?.expires_at}</Typography>
            </Box>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ShareDialog
