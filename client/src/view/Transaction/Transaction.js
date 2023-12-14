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
  },[])
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
  const closemodel=async(_id)=>{
      
    
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
    setUserid('')
    setAmount('')
    setType('')
    setCategory('')
    setDescription('')

  }
  
  const [amount,setAmount]=useState('')
  const [category,setCategory]=useState('')
  const [description,setDescription]=useState('')
  const [type, setType]=useState('')
  const [alltran,setAlltran]=useState('')
  const [credittran,setCredittran]=useState('displaynone')
  const [debit,setDebit]=useState('displaynone')
  const [transactionid,setTransactionid]=useState('')
  const [isedit,setIsedit]=useState('')

  const alltranfun=()=>{
    setAlltran('displayblock')
 setCredittran('displaynone')
 setDebit('displaynone')
  }
  const credittranfun=()=>{
    setCredittran('displayblock')
    setAlltran('displaynone')
    setDebit('displaynone')
    
  }
  const debittranfun=()=>{
    setDebit('displayblock')
    setCredittran('displaynone') 
    setAlltran('displaynone')

  }
  // -----------delete transaction-------

  const deleteTransaction=async(_id)=>{
      
      
     
  

      const response =await axios.delete(`/api/transactions/${_id}`)
      loadTransaction()
      }

     
      const editetransactions=async(_id)=>{

     
        const responsegetbyid=await axios.get(`/api/transaction/${_id}`)
        if(responsegetbyid?.data?.data){
        const {user,amount,type,category,description,_id}=responsegetbyid?.data?.data
        setUserid(user)
        setAmount(amount)
        setType(type)
        setCategory(category)
        setDescription(description)
        setTransactionid(_id)
        localStorage.setItem('edittran',JSON.stringify("true"))
        
        }
        setModelclass('postmodel')
        setModelwrapper('model-wrapper')
        document.body.style.overflowY = "hidden"
    
     
      
        

      }
      useEffect(()=>{
        const response=JSON.parse(localStorage.getItem('edittran'))
        setIsedit(response)
        
      },[transactionid])
    
   
   const updatetransaction=async()=>{
       const obj={
        user:userid,
        amount:amount,
        type:type,
        category:category,
        description:description


    }
       const response=await axios.put(`/api/transaction/${transactionid}`,obj)
      if(response?.data?.data){
        setModelclass('displaynone')
    setModelwrapper('')
    document.body.style.overflowY = "scroll"
    setUserid('')
    setAmount('')
    setType('')
    setCategory('')
    setDescription('')
    loadTransaction()

      }
      
   }
   

  return (
    <div className='main-container' >
      
  
        <SideBar/>
     <div className='sub-container'>
      
      <div className='navhead'>
        <span className='navhead-link' onClick={alltranfun}>all</span>
        <span className='navhead-link' onClick={credittranfun}>credit</span>
        <span className='navhead-link' onClick={debittranfun}>debit</span>
        
      </div>
      <div className={`all-transaction ${alltran}`} >
      {
        transactions.map((transaction,i)=>{
          const {amount, category,description,_id}=transaction
          return <TransacCard amount={amount} category={category} description={description} _id={_id}  deletetransaction={deleteTransaction} editetransactions={editetransactions}/>
        })
      }
      </div>
      <div className={`credited-transaction ${credittran}`} >
      {
        transactions.map((transaction,i)=>{
          const {amount, category,description,type}=transaction
          if(type=="credit"){
            return <TransacCard amount={amount} category={category} description={description} deletetransaction={deleteTransaction}  editetransactions={editetransactions}/>
          }
          })
      }

      </div>
      <div className={`debited-transaction ${debit}`}>
      {
        transactions.map((transaction,i)=>{
          const {amount, category,description,type}=transaction
          if(type=="debit"){
            return <TransacCard amount={amount} category={category} description={description} deletetransaction={deleteTransaction} editetransactions={editetransactions}/>
          }
          
        })
      }
        
      </div>
    <img src={plus} className='plus-img' onClick={openmodel}/>

    
      </div>


      <div className={`${modelwrapper}`} onClick={close_model_global}></div>
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
          <button type='button' className='submit-btn' onClick={isedit?updatetransaction:closemodel}>submit</button>
          {/* <button type='button' className='submit-btn' onClick={updatetransaction}>submit</button> */}

      </div>
      
    
    </div>
   
   
  )
}
