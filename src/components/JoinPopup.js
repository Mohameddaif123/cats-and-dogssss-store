import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { styled } from '@mui/material/styles'; // Import styled function from @mui/material/styles

const StyledDialogTitle = styled(DialogTitle)({
  textAlign: 'center',
  fontFamily: 'Arial, sans-serif',
  color: '#333', // Example styling
});

const StyledDialogContent = styled(DialogContent)({
  textAlign: 'center',
  fontFamily: 'Arial, sans-serif',
  color: '#666', // Example styling
});

const StyledDialogActions = styled(DialogActions)({
  justifyContent: 'center',
});

const JoinPopup = () => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <StyledDialogTitle>Welcome to Our Website!</StyledDialogTitle>
      <StyledDialogContent>
        <p>Thank you for joining us. We're glad to have you here.</p>
      </StyledDialogContent>
      <StyledDialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </StyledDialogActions>
    </Dialog>
  );
};

export default JoinPopup;
