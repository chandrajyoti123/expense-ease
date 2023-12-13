import React, { useState } from 'react'
import './SingUp.css'
import axios from 'axios'

export default function SingUp() {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [number, setNumber] = useState('')
  const [password, setPassword] = useState('')
  const [passwordcon, setPasswordcon] = useState('')
  const singUpPostapi = async () => {
   
      const response = await axios.post('/api/singupusers', {
        first_name: firstname,
        last_name: lastname,
        phone_no: number,
        email: email,
        password: password
      })
      if (response?.data?.data) {
        localStorage.setItem('exsinguser',JSON.stringify(response.data.data))
        alert('you are successfully singed in')
        window.location.href = '/login'
      } else {
        alert(response?.data?.message)
      }
   

  }
  

  return (
    <div>
      <div className='singup-container'>
        <div className='signup-model'>
          <input type='text' placeholder='enter your first name' className='input-field' value={firstname} onChange={(e)=>{
            setFirstname(e.target.value)
          }}/>
          <input type='text' placeholder='enter your  last name' className='input-field' value={lastname} onChange={(e)=>{
            setLastname(e.target.value)
          }}/>
          <input type='email' placeholder='enter your email' className='input-field' value={email} onChange={(e)=>{
            setEmail(e.target.value)
          }} />
          <input type='number' placeholder='enter your phone' className='input-field' value={number} onChange={(e)=>{
            setNumber(e.target.value)
          }} />
          <input type='password' placeholder='enter your password' className='input-field'  value={password} onChange={(e)=>{
            setPassword(e.target.value)
          }}/>
          <input type='password' placeholder='confirm password' className='input-field' value={passwordcon} onChange={(e)=>{
            setPasswordcon(e.target.value)
          }} />
          <button className='sing-up' onClick={singUpPostapi}>sign up</button>




        </div>


      </div>

    </div>
  )
}
