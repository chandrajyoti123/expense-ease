import React, { useState,useEffect } from 'react'
import axios from 'axios'
import './PasswordSet.css'


export default function PasswordSet() {
    const [password,setPassword]=useState('')
    const [password2,setPassword2]=useState('')
    const [userid,setUserid]=useState()
    const loaduserfromlclStr=()=>{
      const response=JSON.parse(localStorage.getItem("exloginuser"))
      setUserid(response._id)
    }
     useEffect(()=>{
      loaduserfromlclStr();
     },[])

     const postApiPassword=async()=>{
        // if(!userid){
        //   alert("user not found")
        //   return
        // }
        // if(!cashamt){
        //   alert("enter amount")
        // }
        if(password!=password2){
          
        }
        try{
          const response=await axios.post('/api/passwords',{
            user:userid,password
          })
          if(response?.data?.data){
            alert("pass word set successfully")
            window.location.href='/'
            localStorage.setItem("expassword",JSON.stringify(response?.data?.data))
            localStorage.setItem("excheckpass","true")
          }else{
            alert(response?.data?.message)
          }
        }catch(err){
          console.log(err)
        }
      }
     console.log(userid)
  return (
    <div>
  <div className='password-container'>
     <div className='setupcash-subcon password-main-container '>
     <div className='heading'>Set Security Pin</div>
     <div className='text'>To secure your transaction set security pin</div>
     <input type='password' placeholder='enter security pin'  className='input-box-cash input-pass' value={password} onChange={(e) => {
                setPassword(e.target.value)
              }} />

<input type='password' placeholder='Reenter it'  className='input-box-cash input-pass' value={password2} onChange={(e) => {
                setPassword2(e.target.value)
              }} />       
              <button type='button' className='submit-btn margin-top cash-btn pass-btn' onClick={postApiPassword} >Done</button>
     </div>
    </div>
    </div>
  )
}
