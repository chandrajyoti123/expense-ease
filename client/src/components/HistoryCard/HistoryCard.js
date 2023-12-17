import React from 'react'
import './History.css'
import chat from './chat.png'

export default function HistoryCard({amount,category,description,type}) {
   
  return (
    <div className='recent-history-container'>
      
       
        <div className='history-category'>
            <div className='category'>{category}</div>
            <div className='message'><img src={chat} className='chat-img'/>{description}</div>
        </div>
        <div className='history-amount'>{type=="credit"?<span className='history-credit'>+{amount}</span>:<span className='history-debit'>-{amount}</span>}</div>
      
    </div>
  )
}
