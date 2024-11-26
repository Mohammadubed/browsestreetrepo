import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';

const Timer = ({ reset, setReset }) => {
  const [time, setTime] = useState(120); // 2:00 in seconds

  // Format time to display in MM:SS format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  useEffect(() => {
    let interval;
    if (time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    // Clear interval when the timer reaches zero
    if (time === 0) {
      clearInterval(interval); // Stop the timer
    }

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [time]);

  useEffect(() => {
    // Reset the timer externally when reset prop is true
    if (reset) {
      setTime(120); // Reset the timer to 2:00 (120 seconds)
      setReset(false); // Set reset to false to avoid loops
    }
  }, [reset, setReset]);

  return (
    <Box marginLeft="20px">
      <Typography variant="h4" component="div" gutterBottom>
        {formatTime(time)}
      </Typography>
    </Box>
  );
};

export default Timer;

