import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const AlertBar = ({ type, message, open, setOpen }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return; // Do nothing when the user clicks outside
    }
    setOpen(false); // Close the snackbar
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000} // Auto close after 6 seconds
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position
    >
      <Alert 
        onClose={handleClose} 
        severity={type === 'success' ? 'success' : 'error'} // Change severity based on type
        iconMapping={{
          success: <span style={{ color: 'green' }}>✔️</span>, // Custom success icon
          error: <span style={{ color: 'red' }}>❌</span> // Custom error icon
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertBar;
