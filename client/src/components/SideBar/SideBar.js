import React from 'react'
import './SideBar.css'
import user from './user.png'
import { Link} from 'react-router-dom'

export default function SideBar() {
  return (
    <div className='sidebar'>
        <div className='user-section'>
            <img src={user} className='userimg'/>
            <div className='user-name'>chandani adil</div>
        </div>
        <ul> 
            <li><Link to={''}  className='links'>dashboard</Link> </li>
            <li><Link to={'/transaction'}  className='links'>transaction</Link> </li>
            <li><Link to={''}  className='links'>graph</Link> </li>
            <li><Link to={''}  className='links'>balance</Link> </li>
        </ul>
      
    </div>
  )
}
