import React, { useEffect, useState } from 'react'
import './SignUp.css'
import TextSpace from '../../../Components/TextSpace'
import Button from '../../../Components/Button'
import { Link, useNavigate } from 'react-router-dom'
import Password from '../../../Components/Password'
import Check from '../../../Components/Check'
import axios from 'axios'
import { setToken ,setIsShopExist} from '../../../Cookies'

function Login(props) {
  const [trigger, setTrigger] = useState(0)
  const [checkBox,setCheckBox] = useState(false)
  const navigate = useNavigate()
  const [credential , setCredential] = useState({
    email:'',
    password:''
  })
  const [check, setCheck] = useState({

    email: false,
    password: false
  })
  
  const valid = async() => {
    try{
    if (check.email && check.password) {
      const response = await axios.post("http://localhost:8080/public/login", credential);
      props.token.current = response.data.token;
      setToken(response.data.token)
      setIsShopExist(response.data.Shop)
      if(checkBox){

        setIsShopExist(response.data.Shop)
        setToken(response.data,7)
      }
      navigate('/')
    }}
    catch(e){
      props.message('Invalid Credentail') 
      props.setOpen(true)
    }
  }

  useEffect(()=>{
    valid();
  },[check])
  return (
    <>
      <ul className='textFeilds'>
        <li>
          <TextSpace massage='Enter a valid Email'
            type='email'
            label='Email'
            value={credential.email}
            trigger={trigger}
            check={(value) => {
              setCheck(prev => ({ ...prev, email: value })); // Correctly spread previous state
            }}
            onChange={(value) => setCredential(prev => ({ ...prev, email: value }) )} 
                    />
        </li>
        <li>
          <Password
            check={(value) => {
              setCheck(prev => ({ ...prev, password: value })); // Correctly spread previous state
            }}
            massage='Password Must Be Of 8 digits'
            label='Password'
            type='password'
            trigger={trigger}
            value={credential.password}
            onChange={(value) => setCredential(prev => ({ ...prev, password: value }) )} />
        </li>
        <li>
          <Check value={checkBox} setValue={(value)=>{setCheckBox(value)}}/>
        </li>
      </ul>
      <div className='button'>
        <Button variant='contained'
          text='Login'
          onClick={() => { // Check validity immediately before state changes
            setTrigger(trigger + 1); // Update trigger after valid check
          }} />
        <Link to="/Auth/SignUp"><Button variant='outlined' text='SignUp' /></Link>
      </div>
    </>
  )
}

export default Login
