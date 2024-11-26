import React, { useState, useEffect } from 'react'
import './SignUp.css'
import TextSpace from '../../../Components/TextSpace'
import Button from '../../../Components/Button'
import DatePick from '../../../Components/Datepicker'
import { Link } from 'react-router-dom'
import Password from '../../../Components/Password'

function SignUp(props) {
  const [trigger, setTrigger] = useState(0)

  const [check, setCheck] = useState({
    email: false,
    name: false,
    dob: false,
    password: false,
    reEnterPass: false
  })

  useEffect(() => {
    const handleOTPGeneration = async () => {
      if (check.email && check.password && check.dob && check.reEnterPass) {

        props.setCheck(true)
        // Wait for OTP generation
        await props.generateOTP();

        // Navigate to /otp after OTP is generated
      }
    };

    handleOTPGeneration(); // Call the async function
  }, [check]);
  return (
    <>
      <ul className='textFeilds'>
        <li>
          <TextSpace massage='Enter a valid Email'
            type='email'
            label='Email'
            value={props.credential.email}
            trigger={trigger}
            check={(value) => {
              setCheck(prev => ({ ...prev, email: value })); // Correctly spread previous state
            }}
            onChange={(value) => {
              props.setCredential(prev => ({ ...prev, email: value })); // Correctly spread previous state
            }}
          /></li>
        <li>
          <TextSpace
            massage='Name Should Only contain alphabets seprated with space'
            type='name'
            value={props.credential.name}
            trigger={trigger}
            check={(value) => {
              setCheck(prev => ({ ...prev, name: value })); // Correctly spread previous state
            }}
            onChange={(value) => {
              props.setCredential(prev => ({ ...prev, name: value })); // Correctly spread previous state
            }}
            label='User Name' /></li>
        <li>
          <DatePick
            massage='Name Should Be alpha-numeric seprated with space'
            type='name'
            value={props.credential.dob}
            trigger={trigger}
            check={(value) => {
              setCheck(prev => ({ ...prev, dob: value })); // Correctly spread previous state
            }}
            onChange={(value) => {
              props.setCredential(prev => ({ ...prev, dob: value })); // Correctly spread previous state
            }} /></li>
        <li>
          <Password
            check={(value) => {
              setCheck(prev => ({ ...prev, password: value }));
            }}
            massage='Password Must Be Of 8 digits'
            label='Password'
            trigger={trigger}
            value={props.credential.password}
            onChange={(value) => {
              props.setCredential(prev => ({ ...prev, password: value })); // Correctly spread previous state
            }} /></li>
        <li>
          <Password
            check={(value) => {
              setCheck(prev => ({ ...prev, reEnterPass: value }));
            }}
            password={props.credential.password}
            massage='This Should be same as above'
            trigger={trigger}
            value={props.credential.reEnterPass}
            onChange={(value) => {
              props.setCredential(prev => ({ ...prev, reEnterPass: value })); // Correctly spread previous state
            }}
            label='Re-Enter Password' /></li>
      </ul>
      <div className='button'>
        <Button variant='contained' text='SignUp' onClick={() => { setTrigger(trigger + 1); }} />
        <Link to='/Auth/login'>
          <Button variant='outlined' text='login' />
        </Link>
      </div>
    </>
  )
}

export default SignUp;
