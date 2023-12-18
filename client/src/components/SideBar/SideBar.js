import React, { useEffect } from 'react'
import './SideBar.css'
import userimg from './man.png'
import { Link} from 'react-router-dom'
import { useState } from 'react'

export default function SideBar() {
  const [user ,setUser]=useState('')
  const loaduserfromlclStr=()=>{
    const response=JSON.parse(localStorage.getItem("exloginuser"))
    setUser(response)
  }
  useEffect(()=>{
    loaduserfromlclStr();
  },[])
  const logout=()=>{
    localStorage.removeItem("exloginuser")
    window.location.reload()
    
  }
  // console.log(user)
  return (
    <div className='sidebar'>
        <div className='user-section'>
            <img src={userimg} className='userimg'/>
            <div className='user-name'>{user.first_name} {user.last_name}</div>
        </div>
        <ul> 
            <li><Link to={'/'}  className='links'>Dashboard</Link> </li>
            <li><Link to={'/transaction'}  className='links'>Transaction</Link> </li>
            {/* <li><Link to={'/graph'}  className='links'>graph</Link> </li> */}
            {/* <li><Link to={''}  className='links'>balance</Link> </li> */}
        </ul>


        <button type='button' className='submit-btn margin-top cash-btn side-btn' onClick={logout}>logout</button>
      
    </div>
  )
}
