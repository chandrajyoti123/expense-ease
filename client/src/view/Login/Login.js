import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import './Login.css'
import { Link } from 'react-router-dom'

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
    {/* <div className='singup-container'>
      <div className='signup-model'>
        
        <input type='email' placeholder='enter your email' className='input-field' value={email} onChange={(e)=>{
          setEmail(e.target.value)
        }} />
       
        <input type='password' placeholder='enter your password' className='input-field'  value={password} onChange={(e)=>{
          setPassword(e.target.value)
        }}/>
       
        <button className='sing-up' onClick={loginPostapi}>login</button>




      </div>


    </div> */}
    <div className='login-container'>
      <div className='login-sub-container'>
      <div className='heading'>login to your account</div>
 
      <div className='model-feild-con'>
              <label className='input-label' htmlFor='email'>Email</label>
              <input type='email' placeholder='enter your email' id='email' className='input-box' value={email} onChange={(e) => {
              setEmail(e.target.value)
            }} />
            </div>


             <div className='model-feild-con'>
            <label className='input-label' htmlFor='password'>Password</label>
            <input type='password' placeholder='enter your password' id='password' className='input-box' value={password} onChange={(e) => {
              setPassword(e.target.value)
            }} />
          </div>
         <div className='switch'><Link to={'/singup'} className='singup-link'>Don't have any accoutn?</Link> </div>
          <button type='button' className='submit-btn margin-top'>Login</button>

      

      

      </div>

    </div>

  </div>
  )
}
