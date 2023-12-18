import React, { useState,useEffect } from 'react'
import './CheckPass.css'
import axios from 'axios'
import lock from './lock.png'

export default function CheckPass() {
    const [checkpass,setCheckpass]=useState('')
    const [passworddata,setPassworddata]=useState({})

   
    const loaduserfromlclStr=()=>{
      const response=JSON.parse(localStorage.getItem("expassword"))
      setPassworddata(response.password)
    }
     useEffect(()=>{
      loaduserfromlclStr();
    
      },[])

      const checkpasswordfun=()=>{
        if(checkpass==passworddata){
            alert("correct")
            window.location.href='/'
            localStorage.setItem("excheckpass","true")

        }
        else{
            alert("incorrectpassword")
        }
      }
    //   const getapiPassword=async()=>{
    //     const response=await axios.get(`/api/passwords/${userid}`)
    //     if(response?.data?.data){
    //         setPassworddata(response?.data?.data)

    //     }else{
    //         alert(response?.data?.message)
    //     }
    //   }
    //   useEffect(()=>{
      
    //   },[userid])
   

  return (
    <div className='checkpassword-container'>
        <div className='checkpassword'>
            <img  src={lock} className='lock-img'/>
        <input type='text' placeholder=''  className='input-box-cash lock-input' value={checkpass} onChange={(e) => {
                setCheckpass(e.target.value)
              }} />
              <button type='button' className='submit-btn margin-top cash-btn lock-btn' onClick={checkpasswordfun} >Done</button>

        </div>
   
    </div>
  )
}
