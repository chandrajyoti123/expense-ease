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
      localStorage.setItem('exsinguser', JSON.stringify(response.data.data))
      alert('you are successfully singed in')
      window.location.href = '/login'
    } else {
      alert(response?.data?.message)
    }


  }


  return (
    <div>
      {/* <div className='singup-container'>
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


      </div> */}

      <>
        <div className='signup-container'>
          <div className='singup-sub-container'>
            <div className='heading'>Create an Account</div>
            <div className='model-feild-con'>
              {/* <label className='input-label' htmlFor='first_name'>first name</label> */}
              <input type='text' placeholder='enter your first name' id='first_name' className='input-box' value={firstname} onChange={(e) => {
                setFirstname(e.target.value)
              }} />
            </div>

            <div className='model-feild-con'>
              {/* <label className='input-label' htmlFor='last_name'>last name</label> */}
              <input type='text' placeholder='enter your  last name'  id='last_name' className='input-box' value={lastname} onChange={(e) => {
                setLastname(e.target.value)
              }} />
            </div>

            <div className='model-feild-con'>
              {/* <label className='input-label' htmlFor='email' >email</label> */}
              <input type='email' placeholder='enter your email' id='email' className='input-box' value={email} onChange={(e) => {
                setEmail(e.target.value)
              }} />
            </div>

            <div className='model-feild-con'>
              {/* <label className='input-label' htmlFor='phone'>mobile no</label> */}
              <input type='number' placeholder='enter your phone' id='phone' className='input-box' value={number} onChange={(e) => {
                setNumber(e.target.value)
              }} />
            </div>

            <div className='model-feild-con'>
              {/* <label className='input-label' htmlFor='password'>password</label> */}
              <input type='password' placeholder='enter your password' id='password' className='input-box' value={password} onChange={(e) => {
                setPassword(e.target.value)
              }} />
            </div>
            <div className='model-feild-con'>
              {/* <label className='input-label' htmlFor='confirm'>confirm password</label> */}
              <input type='password' placeholder='confirm password' id='confirm' className='input-box' value={passwordcon} onChange={(e) => {
                setPasswordcon(e.target.value)
              }} />
            </div>
            
            <button type='button' className='submit-btn'>signup</button>

          </div>

        </div>

      </>

    </div>
  )
}
