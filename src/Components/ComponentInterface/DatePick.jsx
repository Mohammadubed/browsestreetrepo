import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { motion } from 'framer-motion';

export default function DatePick(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <motion.div
        initial={{ opacity: 0, width: '0ch' }} // Start with zero width
        animate={{ opacity: 1, width: '35ch' }} // Animate to 35ch width
        transition={{ duration: 0.5 }} // Fade-in effect
        whileHover={{ scale: 1.05 }} // Grow effect on hover
        style={{ marginLeft: '0' }} // Centering
      >
        <DatePicker
          label="Date Of Birth"
          slotProps={{
            textField: {
              size: 'small',
              sx: {
                width: '35ch', // Set the TextField width to 35ch
                '& .MuiInputBase-input': {
                  color: 'yellow', // Inner text color
                  '&:hover': {
                    transform: 'scale(1.05)', // Grow inner input field on hover
                    transition: 'transform 0.2s', // Smooth transition for the grow effect
                  },
                  '&:focus': {
                    transform: 'scale(1.05)', // Grow inner input field on focus
                    transition: 'transform 0.2s', // Smooth transition for the grow effect
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'maroon', // Label color
                  fontWeight: 'bold', // Thicker label
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Increased shadow effect on label
                },
                '& .MuiSvgIcon-root': {
                  color: 'maroon', // Icon color
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'maroon',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Focused label color
                },
                '& .MuiOutlinedInput-root': {
                  boxShadow: '0px 4px 6px maroon', // Maroon shadow
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'maroon', // Border color
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'yellow', // Border color on hover
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'yellow', // Change border color on focus
                  },
                  '&:hover, &:focus': {
                    transform: 'scale(1.05)', // Grow effect on hover and focus
                  },
                },
              },
            },
          }}
          value={props.value}
          onChange={(e) => props.onChange(e)}
          sx={{
            width: '35ch', // Set outer DatePicker to 35ch
            marginTop: '2%',
            marginBottom: '0%',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
            left:'-2%'
          }}
        />
      </motion.div>
    </LocalizationProvider>
  );
}
