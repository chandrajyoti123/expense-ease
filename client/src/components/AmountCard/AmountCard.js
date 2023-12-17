import React from 'react'
import './AmountCard.css'

export default function AmountCard({type,amount,heading}) {
  return (
    <div className='amount-card'>
        <div className='amount-card-heading'>{heading}</div>
        <div className='amount-card-value'>{type=="credit"?<span className='history-credit'>₹{amount}</span>:<span className='history-debit'>₹{amount}</span> }</div>
      
    </div>
  )
}
