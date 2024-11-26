import React, { useState, useEffect } from 'react';
import OTPfeild from '../../../Components/OTPfeild';
import './OtpForm.css';
import Button from '../../../Components/Button';
import { Link, useNavigate } from 'react-router-dom';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Timer from '../../../Components/Timer';
import axios from 'axios';
function OtpForm(props) {

  const [checkOTP, setCheckOTP] = useState(false);
  const navigate = useNavigate();
  const [enterdOtp, setEnterdOtp] = useState('000000');
  const [reset, setReset] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true);

  const handleClick = () => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, 120000)
    props.Otp.current = null; // 2 minutes
  };

  const checkFeild = () => {
    if (props.Otp.current.toString() === enterdOtp) {
      setCheckOTP(true);
    } else {
      props.setBartype('error')
      props.message("OTP didn't Matched");
      props.setOpen(true);
    }
  };

  const handleOtpChange = (newOtpValue) => {
    setEnterdOtp(newOtpValue);
  };

  useEffect(() => {
    async function redirect() {
      try {
        if (checkOTP) {
          props.setBartype('success')
          props.message("SignUp successful now login");
          props.setOpen(true);
          const response = await axios.post("http://localhost:8080/public/sign-up", props.credential)
          navigate("/Auth/login");
        }
      } catch (e) {
        props.setBartype('Error')
        props.message("An Error Occurred while Singup please try again later");
        props.setOpen(true);
        console.log(e)
      }
    }
    redirect()
  }
    , [checkOTP]);

  useEffect(() => {
    if (!props.check && props.Otp.current === null) { navigate("SignUp") }
    else {
      setTimeout(() => {
        setIsDisabled(false);
      }, 120000)
    }
  })
  return (
    <ul className='box'>
      <li>
        <h5>Enter Six digit verification code from your Email below</h5>
      </li>
      <li>
        <OTPfeild value={enterdOtp} onChange={(value) => { handleOtpChange(value) }} />
      </li>
      <li style={{ marginTop: '30px', display: "flex", flexFlow: "row" }}> <Button
        text='Re-Genrate'
        startIcon={<AutorenewIcon />}
        variant='outlined'
        disabled={isDisabled}
        onClick={() => { props.generateOTP(); setReset(true); handleClick() }} />
        <Timer reset={reset} setReset={setReset}></Timer></li>
      <li className='button'>
        <Button text='Submit' variant='contained' onClick={checkFeild} />
        <Link to='/SignUp'>
          <Button text='Back' variant='outlined' />
        </Link>
      </li>
    </ul>
  );
}

export default OtpForm;

