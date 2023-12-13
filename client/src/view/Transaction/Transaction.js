import React, { useEffect, useState } from 'react'
import SideBar from '../../components/SideBar/SideBar'
import './Transaction.css'
import axios from 'axios'
import plus from './plus.png'

import TransacCard from '../../components/TransacCard/TransacCard'


export default function Transaction() {
  const [transactions,setTransaction]=useState([])
  const [userid,setUserid]=useState('')
  const loadlogineduser=()=>{
    const response=JSON.parse(localStorage.getItem('exloginuser'))
    if(response){
      setUserid(response._id)
    }
  }
  useEffect(()=>{
    loadlogineduser()
  })
  console.log(userid)

  const loadTransaction=async()=>{
   try{
    const response=await axios.get(`/api/gettransactionsbyid/${userid}`)
    if(response?.data?.data){
      setTransaction(response?.data?.data)
    }
   }catch(error){
    console.log(error)
   }
  }
  useEffect(()=>{
loadTransaction()
  },[userid])
  // ------------post transaction -----------------
  const [modelclass,setModelclass]=useState('displaynone')
  const [ismodel, setIsmodel] = useState('')
    const [modelwrapper, setModelwrapper] = useState('')
  const openmodel=()=>{
    setModelclass('postmodel')
    setModelwrapper('model-wrapper')
    document.body.style.overflowY = "hidden"
    
  }
  const closemodel=async()=>{
    
    const response =await axios.post("/api/transactions",{
      user:userid,
      amount:amount,
      type:type,
      category:category,
      description:description


    })
    if(response?.data?.data){
      setModelclass('displaynone')
    setModelwrapper('')
    document.body.style.overflowY = "scroll"
    
    loadTransaction()
    setAmount('')
    setCategory('')
    setType('')
    setDescription('')
  

    }else(
      alert(response?.data?.message)
    )

    
  }
  const close_model_global=()=>{
    setModelclass('displaynone')
    setModelwrapper('')
    document.body.style.overflowY = "scroll"

  }
  
  const [amount,setAmount]=useState('')
  const [category,setCategory]=useState('')
  const [description,setDescription]=useState('')
  const [type, setType]=useState('')
  

  return (
    <div className='main-container' >
      
  
        <SideBar/>
     <div className='sub-container'>
      {
        transactions.map((transaction,i)=>{
          const {amount, category,description}=transaction
          return <TransacCard amount={amount} category={category} description={description}/>
        })
      }
    <img src={plus} className='plus-img' onClick={openmodel}/>

    
      </div>
      <div className={`${modelwrapper}`} onClick={close_model_global}>

</div>
      <div className={`${modelclass}`}>
     
        <input type='text' placeholder='amount' className='input-field' value={amount} onChange={(e)=>{
            setAmount(e.target.value)
          }}/>
        <input type='text' placeholder='type' className='input-field' value={type} onChange={(e)=>{
            setType(e.target.value)
          }}/>
          <input type='text' placeholder='category' className='input-field' value={category} onChange={(e)=>{
            setCategory(e.target.value)
          }}/>
          <input type='email' placeholder='description' className='input-field' value={description} onChange={(e)=>{
            setDescription(e.target.value)
          }} />
             <button type='button' className='submit-btn' onClick={closemodel}>submit</button>

      </div>
      
    
    </div>
   
   
  )
}
