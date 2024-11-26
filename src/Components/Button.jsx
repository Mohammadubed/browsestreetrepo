import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function AppButton(props) {
  return (
    <Box>
      <Button
        variant={props.variant}
        disabled={props.disabled}
        startIcon={props.startIcon}
        size="medium"
        sx={{
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
          textTransform: 'none',
          ...(props.variant === 'contained' && {
            backgroundColor: 'maroon',
            color: 'white',
            '&:hover': {
              backgroundColor: 'yellow',
              color: 'maroon',
              transform: 'scale(1.05)',
            },
            '&:focus': {
              outline: '2px solid maroon',
              transform: 'scale(1.05)',
            },
          }),
          ...(props.variant === 'outlined' && {
            borderColor: 'yellow',
            color: 'yellow',
            '&:hover': {
              backgroundColor: 'yellow',
              color: 'white',
              transform: 'scale(1.05)',
            },
            '&:focus': {
              borderColor: 'yellow',
              transform: 'scale(1.05)',
            },
          }),
        }}
        onClick={props.onClick}
      >
        {props.text}
      </Button>
    </Box>
  );
}

export default AppButton;

