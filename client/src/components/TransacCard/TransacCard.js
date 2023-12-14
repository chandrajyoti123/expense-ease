import React, { useEffect, useState } from 'react'
import './TransacCard.css'

import chat from './chat.png'
import trash from './trash.png'
import edit from './edit.png'
import date from './date.png'

import business from './business.png'
import home from './home.png'
import education from './education.png'
import entertainment from './entertainment.png'
import food from './food.png'
import interest from './interest.png'
import investment from './investment.png'
import other from './other.png'
import salary from './salary.png'
import shopping from './shopping.png'
import travel from './travel.png'
import vehicle from './vehicle.png'

// 'food','shopping','education','travel','entertainment',"salary","business","EMI","housing","vehicle","financial expenses","investment","other" 

export default function TransacCard({deletetransaction,_id,amount,category,description,editetransactions}) {
 
  const [categoryimg,setCategoryimg]=useState('')
  const setimgtocategory=()=>{
    if(category=="food"){
      setCategoryimg(food)
    }
    else if(category=="shopping"){
      setCategoryimg(shopping)
    }
    else if(category=="education"){
      setCategoryimg(education)
    }
    else if(category=="travel"){
      setCategoryimg(travel)
    }
    else if(category=="entertainment"){
      setCategoryimg(entertainment)
    }
    else if(category=="salary"){
      setCategoryimg(salary)
    }
    else if(category=="business"){
      setCategoryimg(business)
    }
    else if(category=="EMI"){
      setCategoryimg(interest)
    }
    else if(category=="housing"){
      setCategoryimg(home)
    }
    else if(category=="vehicle"){
      setCategoryimg(vehicle)
    }
    else if(category=="financial expenses"){
      setCategoryimg(investment)
    }
    else if(category=="other"){
      setCategoryimg(other)
    }
    else{
      setCategoryimg(other)
    }
   console.log("tara") 
  }
  useEffect(()=>{
    setimgtocategory()
  },[category])


  // const setimgtocategory = () => {
  //   const categoryImages = {
  //     food,
  //     shopping,
  //     education,
      // ... add other categories
    // };
  
    // setCategoryimg(categoryImages[category] || other);
  // };
    
// --------get by id----------------


  return (
    <>
    <div className='transaction-card'>
        {/* <div className='tran-money'>{amount}</div>
        <div className='category'>{category}</div>
        <div className='tran-description'> {description}</div> */}
        <div className='transaction-card1'>
          <img src={categoryimg} className='transaction-card-img'/>

        </div>
        <div className='transaction-card2'>
          <div className='transaction-amount'>
         +₹{amount}
          </div>
          <div className='category'>{category}</div>
          <div className='transaction-message '> <img src={chat} className='chat-img'/>{description}</div>

        </div>
        <div className='transaction-card3'>
          <div className='edit-section'>
          <spna><img src={trash}  className='edit-img' onClick={()=>{
            deletetransaction(_id)
          }} /></spna>
          <spna><img src={edit}   className='edit-img' onClick={()=>{
            editetransactions(_id)
          }}/></spna>
          </div>
          <div className='date-section'><img className='date-img' src={date}/>10 dec 2023  </div>

        </div>
        
      
    </div>
    </>

  )
}
