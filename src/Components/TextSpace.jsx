import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Varification from './Varification';
import { motion } from 'framer-motion'; // Import Framer Motion

function TextSpace(props) {
    const [warn, setWarn] = useState(false);
    const prevTriggerRef = useRef(props.trigger); // Create a ref to store the previous trigger value

    const verify = () => {
        if (props.type) {
            // Check if the verification function exists and validate the input value
            const isValid = Varification(props.type, props.value);

            if (isValid) {
                setWarn(false); // No warning if validation passes
                props.check(true);  // Call props.check with true if validation passes
            } else {
                setWarn(true);       // Show warning if validation fails
                props.check(false);  // Call props.check with false if validation fails
            }
        } else {
            setWarn(true); // Set warning if type is not provided
        }
    };

    // Trigger the verify function when props.trigger changes
    useEffect(() => {
        if (prevTriggerRef.current !== props.trigger) {
            verify(); // Call verify only if the trigger value changes
            prevTriggerRef.current = props.trigger; // Update the ref with the new trigger value
        }
    }, [props.trigger]);

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {
                    width: '35ch',
                },
            }}
            noValidate
            autoComplete="off"
        >
            {/* Animated warning message */}
            <motion.h6
                style={{
                    marginTop: '0%',
                    marginLeft: '1%',
                    marginBottom: '0%',
                    color: 'red',
                }}
                initial={{ opacity: 0, y: 10 }} // Start animation from invisible state
                animate={{ opacity: warn ? 1 : 0, y: warn ? 0 : -10 }} // Animate based on warn state
                transition={{ duration: 0.3 }} // Set duration for smooth transition
            >
                {props.massage}
            </motion.h6>

            {/* Animated TextField with hover/focus scaling */}
            <motion.div
                initial={{ scale: 1 }} // Initial scale of the TextField
                whileHover={{ scale: 1.05 }} // Scale up on hover
                whileFocus={{ scale: 1.05 }} // Scale up on focus
                transition={{ duration: 0.2 }} // Set duration for smooth scaling effect
            >
                <TextField
                    style={{ marginTop: '1%' }}
                    label={props.label}
                    id="outlined-size-small"
                    value={props.value}
                    onChange={(e) => props.onChange(e.target.value)}
                    size="small"
                    variant="outlined"
                    InputProps={{
                        style: {
                            color: 'yellow', // Input text color
                        },
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            boxShadow: '0px 4px 6px maroon', // Maroon shadow
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'maroon', // Default border color
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'yellow', // Change border color on hover
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'yellow', // Change border color on focus
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
                />
            </motion.div>
        </Box>
    );
}

export default TextSpace;

