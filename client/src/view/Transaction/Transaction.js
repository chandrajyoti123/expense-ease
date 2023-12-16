import React, { useEffect, useState } from 'react'
import SideBar from '../../components/SideBar/SideBar'
import './Transaction.css'
import axios from 'axios'
import plus from './plus.png'

import TransacCard from '../../components/TransacCard/TransacCard'



export default function Transaction() {
  const [transactions, setTransactions] = useState([])
  const [userid, setUserid] = useState('')
  const [creditAmt, setCreditAmt] = useState('');
  const [debitAmt, setDebitAmt] = useState('');
  const loadlogineduser = () => {
    const response = JSON.parse(localStorage.getItem('exloginuser'))
   setUserid(response._id)
  }
  const loadTransaction = async () => {
    try {
      const response = await axios.get(`/api/transactions/${userid}`)
      if (response?.data?.data) {
        setTransactions(response?.data?.data)
      }
    } catch (error) {
      console.log(error)
    }

    // let totalCredit = 0;
    // let totalDebit = 0;
    // transactions.forEach((tranasaction) => {
    //   if (tranasaction.type === "credit") {
    //     totalCredit += tranasaction.amount;
    //   } else {
    //     totalDebit += tranasaction.amount;
    //   }
    // });
    // setCreditAmt(totalCredit);
    // setDebitAmt(totalDebit);
  }
  useEffect(() => {
    loadlogineduser()
    loadTransaction()
  }, [])
  // useEffect(() => {
  //   loadTransaction()
  // }, [userid])

  
  // ------------post transaction -----------------

  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [modelclass, setModelclass] = useState('displaynone')
  const [ismodel, setIsmodel] = useState('')
  const [modelwrapper, setModelwrapper] = useState('')
  const openmodel = () => {
    setModelclass('postmodel')
    setModelwrapper('model-wrapper')
    document.body.style.overflowY = "hidden"

  }
  const closemodel = async (_id) => {
    if(!userid){
      alert("user is not found")
      return
    }
    if(!amount){
      alert("please enter amount")
      return
    }
    if(!type){
      alert("please enter a type")
      return
    }
    if(!category){
      alert("please enter category")
      return
    }
    if(!description){
      alert("please enter description")
    }
   
 try{
    const response = await axios.post("/api/transactions", {
      user: userid,
      amount: amount,
      type: type,
      category: category,
      description: description})
    if (response?.data?.data) {
      loadTransaction()
      setAmount('')
      setCategory('')
      setType('')
      setDescription('')
      setModelclass('displaynone')
      setModelwrapper('')
      document.body.style.overflowY = "scroll"
     } else (
      alert(response?.data?.message)
    )
   }catch(err){
    console.log(err)
   }


  }
  const close_model_global = () => {
    setUserid('')
    setAmount('')
    setType('')
    setCategory('')
    setDescription('')
    setModelclass('displaynone')
    setModelwrapper('')
    document.body.style.overflowY = "scroll"
  

  }

 
  const [alltran, setAlltran] = useState('')
  const [credittran, setCredittran] = useState('displaynone')
  const [debit, setDebit] = useState('displaynone')
  const [transactionid, setTransactionid] = useState('')
  const [isedit, setIsedit] = useState('')

  const alltranfun = () => {
    setAlltran('displayblock')
    setCredittran('displaynone')
    setDebit('displaynone')
  }
  const credittranfun = () => {
    setCredittran('displayblock')
    setAlltran('displaynone')
    setDebit('displaynone')

  }
  const debittranfun = () => {
    setDebit('displayblock')
    setCredittran('displaynone')
    setAlltran('displaynone')

  }
  // -----------delete transaction-------

  const deleteTransaction = async (_id) => {
   try{
    const response = await axios.delete(`/api/transactions/${_id}`)
   }catch(err){
    console.log(err)
   }
    loadTransaction()
  }


  const editetransactions = async (_id) => {

    setModelclass('postmodel')
    setModelwrapper('model-wrapper')
    document.body.style.overflowY = "hidden"
    try{
    const response = await axios.get(`/api/transaction/${_id}`)
    
    if (response?.data?.data) {
      const { _id, user, amount, type, category, description } = response?.data?.data
      setUserid(user)
      setAmount(amount)
      setType(type)
      setCategory(category)
      setDescription(description)
      setTransactionid(_id)
      
      }
   
     }
   catch(err){
    console.log(err)
     }
   }

  // useEffect(() => {
  //   const response = JSON.parse(localStorage.getItem('edittran'))
  //   setIsedit(response)

  // }, [transactionid])

//   console.log(userid)
// console.log(transactionid)
  const updatetransactionfuc = async () => {
    if(!userid){
      alert("user not found")
      return
    }
    if(!amount){
      alert("enter amount")
      return
    }
    if(!type){
      alert("enter type")
      return
    }
    if(!category){
      alert("enter category")
      return
    }
    if(!description){
      alert("enter a description")
      return
    }
    try{
     const response = await axios.put(  `/api/transaction/${transactionid}`, {
      user: userid,
      amount: amount,
      type: type,
      category: category,
      description: description
     })
     
     if (response?.data?.data) {
      setUserid('')
      setAmount('')
      setType('')
      setCategory('')
      setDescription('')
      setModelclass('displaynone')
      setModelwrapper('')
       document.body.style.overflowY = "scroll"
       loadTransaction()
       alert("transaction updated successfully")
     
   }else{
    alert(response?.data?.data)
  }

   
  
  }
   catch(err){
    console.log(err)
     }


  }


  // -------------------transaction type-----------------------
  const [typeclasscredit,setTypeclasscredit]=useState('')
  const [typeclassdebit,setTypeclassdebit]=useState('')
  const [istype,setIstype]=useState('')

  const typecredit=()=>{
    setType("credit")
    setTypeclasscredit("type-bold")
    setTypeclassdebit("")
  }
  const typedebit=()=>{
    setType("debit")
    setTypeclassdebit("type-bold")
    setTypeclasscredit("")
    
  }

  return (
    <div className='main-container' >


      <SideBar />
       <div className='sub-container'>
        <h1>credit={creditAmt} debit={debitAmt}</h1>

         <div className='navhead'>
          <span className='navhead-link' onClick={alltranfun}>all</span>
          <span className='navhead-link' onClick={credittranfun}>credit</span>
          <span className='navhead-link' onClick={debittranfun}>debit</span>

         </div>
        <div className={`all-transaction ${alltran}`} >
          {
            transactions.map((transaction, i) => {
              const { amount, category, description, _id } = transaction
              return <TransacCard amount={amount} category={category} description={description} _id={_id} deletetransaction={deleteTransaction}  editetransactions={editetransactions}  />
            })
          }
        </div>
         <div className={`credited-transaction ${credittran}`} >
          {
            transactions.map((transaction, i) => {
              const { amount, category, description, type } = transaction
              if (type == "credit") {
                return <TransacCard amount={amount} category={category} description={description} deletetransaction={deleteTransaction} editetransactions={editetransactions} />
              }
            })
          }

        </div> 
       <div className={`debited-transaction ${debit}`}>
          {
            transactions.map((transaction, i) => {
              const { amount, category, description, type } = transaction
              if (type == "debit") {
                return <TransacCard amount={amount} category={category} description={description} deletetransaction={deleteTransaction} editetransactions={editetransactions} />
              }

            })
          }

        </div> 
        <img src={plus} className='plus-img' onClick={openmodel} />


      </div>


      <div className={`${modelwrapper}`} onClick={close_model_global}></div>
      <div className={` transaction-model ${modelclass}`}>
        {/* <div className='model-heading'>add your transactions</div> */}
        <div className='type-section'>
          <div className={`credeb credit  ${typeclasscredit}`} onClick={typecredit}>Credit</div>
          <div className={`credeb debit  ${typeclassdebit}`} onClick={typedebit}>Debit</div>
        </div>
        <div>
        <label className='input-label' id='amount'>Amount</label>
        <input type='text' placeholder='amount' id='amount' className='input-box' value={amount} onChange={(e) => {
          setAmount(e.target.value)
        }} />
        </div>
        {/* <input type='text' placeholder='type' className='input-field' value={type} onChange={(e) => {
          setType(e.target.value)
        }} /> */}
        {/* <input type='text' placeholder='category' className='input-field' value={category} onChange={(e) => {
          setCategory(e.target.value)
        }} /> */}
  <label htmlFor='category' className='input-label'>Category</label>      
<select  id='category' value={category} onChange={(e)=>{
  setCategory(e.target.value)
}} className='select-field'>
  <option>select category</option>
  <option value={'food'}>Food</option>
  <option value={'shopping'}>Shopping</option>
  <option value={'education'}>Education</option>
  <option value={'travel'}>Travel</option>
  <option value={'entertainment'}>Entertainment</option>
  <option value={'salary'}>Salary</option>
  <option value={'business'}>Business</option>
  <option value={'EMI'}>EMI</option>
  <option value={'housing'}>Housing</option>
  <option value={'vehicle'}>Vehicle</option>
  <option value={'financial expenses'}>Financial Expenses</option>
  <option value={'investment'}>Investment</option>
  <option value={'other'}>Other</option>
</select>

        <input type='email' placeholder='description' className='input-field' value={description} onChange={(e) => {
          setDescription(e.target.value)
        }} />
        <button type='button' className='submit-btn' onClick={closemodel}>submit</button>
         <button type='button' className='submit-btn' onClick={updatetransactionfuc}>update</button> 

      </div>


    </div>


  )
}
