import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import './Login.css'
import { Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loginPostapi=async()=>{
   try{
    const response=await axios.post('/api/loginusers',{
      email:email,
      password:password
    })
    if(response?.data?.data){
      localStorage.setItem('exloginuser',JSON.stringify(response.data.data))
      alert("you are logined successfully")
      if(JSON.parse(localStorage.getItem('excash'))){
        window.location.href='/'
        return
      
      } else{
        window.location.href='/setupcash'
      }
     
    }else{
     alert(response?.data?.message)
    }
   }catch(err){
    console.log(err)
   }
  }
  return (
    <div>
    
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
         <div className='switch'><Link to={'/singup'} className='singup-link'>Don't have any account?</Link> </div>
          <button type='button' className='submit-btn margin-top' onClick={loginPostapi}>Login</button>

      

      

      </div>

    </div>

  </div>
  )
}
