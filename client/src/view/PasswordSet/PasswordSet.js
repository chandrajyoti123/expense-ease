import React, { useState,useEffect } from 'react'
import axios from 'axios'

export default function PasswordSet() {
    const [password,setPassword]=useState('')
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
  <div className='setupcash-container'>
     <div className='setupcash-subcon'>
     <div className='heading'>Password add</div>
     <div className='text'>to Secure Your Transaction add passord</div>
     <input type='password' placeholder='enter a password'  className='input-box-cash' value={password} onChange={(e) => {
                setPassword(e.target.value)
              }} />
              <button type='button' className='submit-btn margin-top cash-btn' onClick={postApiPassword} >Done</button>
     </div>
    </div>
    </div>
  )
}
