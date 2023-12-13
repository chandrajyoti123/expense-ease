import React from 'react'
import './TransacCard.css'


export default function TransacCard({amount,category,description}) {
    
  return (
    <div className='transaction-card'>
        <div className='tran-money'>{amount}</div>
        <div className='category'>{category}</div>
        <div className='tran-description'> {description}</div>
      
    </div>
  )
}
