import React, { useEffect, useRef, useState } from 'react';
import './Auth.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import SignUp from './LoginEntryForm/SignUp';
import OtpForm from './LoginEntryForm/OtpForm';
import Login from './LoginEntryForm/Login';
import AlertBar from '../../Components/AlertBar';
import axios from 'axios';
import { motion } from 'framer-motion'; // Import Framer Motion
import { TextField } from '@mui/material'; // Import Material-UI TextField

function Auth(props) {
  const [open, setOpen] = useState(false);
  const [bartype, setBartype] = useState('error');
  const [message, setMessage] = useState('');
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();

  var otp = useRef(null);
  const [credential, setCredential] = useState({
    email: '',
    name: '',
    dob: null,
    password: '',
    reEnterPass: ''
  });

  const generateOTP = async () => {
    var response;
    try {
      response = await axios.post("http://localhost:8080/public/otp", credential);
      otp.current = response.data;
      navigate("/Auth/otp");
    } catch (error) {
      if (error.code === 'ERR_BAD_REQUEST') {
        setOpen(true);
        setMessage("User Already Exists");
        setBartype('error');
      } else {
        console.error("Error generating OTP:", error);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }} // Background fade-in effect
      className="background"
      style={{
        backgroundColor: 'white', // White as the background
        color: 'maroon',           // Maroon for text and elements
        fontFamily: "'Roboto', sans-serif" // A clean, readable font
      }}
    >
      {/* Animating the container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} // Starts slightly smaller
        animate={{ opacity: 1, scale: 1 }} // Zoom in to full size
        transition={{ duration: 0.5, ease: 'easeInOut' }} // Smooth transition
        className="container"
        style={{
          border: '2px solid maroon', // Maroon border for container
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)', // Soft shadow
          padding: '20px',
          borderRadius: '8px'
        }}
      >
        <div className="logo"></div>

        {/* Animating Routes for smooth transitions */}
        <motion.div
          initial={{ opacity: 0, x: -50 }} // Start slightly off-screen
          animate={{ opacity: 1, x: 0 }} // Slide in from the left
          exit={{ opacity: 0, x: 50 }} // Exit slide to the right
          transition={{ duration: 0.4 }} // Smooth route transition
        >
          <Routes>
            <Route path="/" element={<Navigate to="/Auth/login" />} />
            <Route
              path="login"
              element={
                <Login token={props.token} setOpen={setOpen} message={setMessage} />
              }
            />
            <Route
              path="SignUp"
              element={
                <SignUp
                  credential={credential}
                  setCredential={setCredential}
                  generateOTP={generateOTP}
                  setCheck={setCheck}
                />
              }
            />
            <Route
              path="otp"
              element={
                <OtpForm
                  message={setMessage}
                  Otp={otp}
                  credential={credential}
                  setOpen={setOpen}
                  check={check}
                  generateOTP={generateOTP}
                  setBartype={(value) => setBartype(value)}
                />
              }
            />
          </Routes>
        </motion.div>

        {/* AlertBar with smooth animation */}
        <AlertBar
          type={bartype}
          message={message}
          open={open}
          setOpen={() => setOpen(false)}
        />
      </motion.div>

      {/* Adding Focus Effects to Input Fields */}
      <style>
        {`
          .MuiOutlinedInput-root {
            transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          }
          .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
            border-color: maroon;
            box-shadow: 0 0 5px maroon; // Shadow effect on focus
          }
        `}
      </style>
    </motion.div>
  );
}

export default Auth;
