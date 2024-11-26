import React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { motion } from 'framer-motion'; // Import Framer Motion

function PasswordInterface(props) {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
  
    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }} // Start slightly below and transparent
            animate={{ opacity: 1, y: 0 }} // Fade in and slide up effect
            transition={{ duration: 0.5 }} // Duration of the animation
        >
            <FormControl
                size="small"
                sx={{
                    width: '35ch', // Adjusted width
                    marginTop: '2%',
                    '& .MuiOutlinedInput-root': {
                        boxShadow: '0px 4px 6px maroon', // Maroon shadow
                        transition: 'border-color 0.3s, transform 0.3s', // Transition for border color and transform
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'maroon', // Set border color to maroon
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'yellow', // Change border color on hover
                        },
                        '&:focus .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'yellow', // Change border color on focus
                        },
                        '&:hover, &:focus': {
                            transform: 'scale(1.05)', // Grow effect on hover and focus
                        },
                        '& .MuiInputBase-input': {
                            color: 'yellow', // Input text color
                            '&:hover': {
                                transform: 'scale(1.05)', // Grow inner input field on hover
                                transition: 'transform 0.2s', // Smooth transition for the grow effect
                            },
                            '&:focus': {
                                transform: 'scale(1.05)', // Grow inner input field on focus
                                transition: 'transform 0.2s', // Smooth transition for the grow effect
                            },
                        },
                    },
                    '& .MuiInputLabel-root': {
                        color: 'maroon', // Label color
                        fontWeight: 'bold', // Make label thicker
                        '&.Mui-focused': {
                            color: 'maroon', // Focused label color
                        },
                    },
                }}
                variant="outlined"
            > 
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={props.value}
                    onChange={(e) => { props.setvalue(e.target.value); }}
                    endAdornment={
                        <InputAdornment position="end">
                            <motion.div
                                whileHover={{ scale: 1.1 }} // Scale up on hover
                                whileTap={{ scale: 0.9 }} // Scale down on tap/click
                            >
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </motion.div>
                        </InputAdornment>
                    }
                    label="Password"
                />
            </FormControl>
        </motion.div>
    );
}

export default PasswordInterface;

