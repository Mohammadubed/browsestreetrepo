import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';

const OTPInput = ({ length = 6, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill("")); // Initialize state with empty strings for each input

  // Handle input change
  const handleChange = (element, index) => {
    const value = element.value;

    if (/^[0-9]$/.test(value)) { // Only allow numeric input
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp); // Update local state

      // Update parent component
      onChange(newOtp.join(""));

      // Move to the next input
      if (element.nextSibling) {
        element.nextSibling.focus();
      }
    }
  };

  // Handle key events
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      // If the current input is empty, move focus back and clear previous
      if (!newOtp[index]) {
        if (index > 0) {
          newOtp[index - 1] = ""; // Clear the previous input
          setOtp(newOtp); // Update local state
          onChange(newOtp.join("")); // Update parent component
          setTimeout(() => {
            e.target.previousSibling.focus(); // Move focus to previous input
          }, 0);
        }
      } else {
        newOtp[index] = ""; // Clear the current input
        setOtp(newOtp); // Update local state
        onChange(newOtp.join("")); // Update parent component
      }
    }
  };

  return (
    <Box display="flex" gap={1}>
      {otp.map((value, index) => (
        <TextField
          key={index}
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          inputProps={{
            maxLength: 1,
            style: { textAlign: 'center', fontSize: '1.5rem' },
          }}
          sx={{ width: '3rem', height: '3rem' }}
        />
      ))}
    </Box>
  );
};

export default OTPInput;
