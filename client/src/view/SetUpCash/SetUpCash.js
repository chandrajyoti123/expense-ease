import React, { useState,useEffect, useId } from 'react'
import './SetUpCash.css'
import axios from 'axios'


  export default function SetUpCash() {
    const [cashamt,setCashamt]=useState('')
    const [userid,setUserid]=useState()
    const loaduserfromlclStr=()=>{
      const response=JSON.parse(localStorage.getItem("exloginuser"))
      setUserid(response._id)
    }
     useEffect(()=>{
      loaduserfromlclStr();
    
      

     },[])

    const postapicashamt=async()=>{
     
      try{
        const response=await axios.post('/api/cashamount',{
          user:userid,cash:cashamt
        })
        if(response?.data?.data){
          alert("cash added successfully")
          window.location.href='/password'
          localStorage.setItem("excash",JSON.stringify(response?.data?.data))
        }else{
          alert(response?.data?.message)
        }
        }catch(err){
        console.log(err)
        }
    }
   

  return (
    <div className='setupcash-container'>
     <div className='setupcash-subcon'>
     <div className='heading'>Set up your cash balance</div>
     <div className='text'>How much cash do you have in your physical wallet</div>
     <input type='number' placeholder='NIR' id='first_name' className='input-box-cash' value={cashamt} onChange={(e) => {
                setCashamt(e.target.value)
              }} />
     <button type='button' className='submit-btn margin-top cash-btn' onClick={postapicashamt}>Done</button>
     </div>
     
    </div>
  )
}
