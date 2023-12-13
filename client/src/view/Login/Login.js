import React from 'react'
import { useState } from 'react'
import axios from 'axios'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loginPostapi=async()=>{
    const response=await axios.post('/api/loginusers',{
      email:email,
      password:password
    })
    if(response?.data?.data){
      localStorage.setItem('exloginuser',JSON.stringify(response.data.data))
      alert("you are logined successfully")
      window.location.href='/'
    }else{
     alert(response?.data?.message)
    }
  }
  return (
    <div>
    <div className='singup-container'>
      <div className='signup-model'>
        
        <input type='email' placeholder='enter your email' className='input-field' value={email} onChange={(e)=>{
          setEmail(e.target.value)
        }} />
       
        <input type='password' placeholder='enter your password' className='input-field'  value={password} onChange={(e)=>{
          setPassword(e.target.value)
        }}/>
       
        <button className='sing-up' onClick={loginPostapi}>login</button>




      </div>


    </div>

  </div>
  )
}
