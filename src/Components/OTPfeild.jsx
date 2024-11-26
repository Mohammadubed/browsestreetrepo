import React from 'react'
import OTPInput from './ComponentInterface/OTPInput'

function OTPfeild({onChange}) {
  return (
    <div>
        <OTPInput onChange={(value)=>onChange(value)}></OTPInput>
    </div>
  )
}

export default OTPfeild
