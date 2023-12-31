import React from 'react'
import SideBar from '../../components/SideBar/SideBar'
import './Home.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import HistoryCard from '../../components/HistoryCard/HistoryCard'
import AmountCard from '../../components/AmountCard/AmountCard'
import lock from './lock.png'

import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";


export default function Home() {
   const [creditAmt, setCreditAmt] = useState('');
  const [debitAmt, setDebitAmt] = useState('');
  const [cashamtdata, setCashamtdata] = useState('')
  const [alltransactions, setAlltransactions] = useState([])
  const [userid, setUserid] = useState()
  const loadlogineduser = async() => {
  const response =JSON.parse(localStorage.getItem("exloginuser"))
   setUserid(response._id)
  }
  const loadTransaction = async () => {
    // if (!userid) {
    //   alert('user not found')
    //   return
    // }

    try {
      const response = await axios.get(`/api/transactions`)
      if (response?.data?.data) {
        setTransactions(response?.data?.data.slice(-4).reverse())
        setAlltransactions(response?.data?.data)

      }
    } catch (err) {
      console.log(err)
    }

    let totalCredit = 0;
    let totalDebit = 0;

    alltransactions.forEach((tranasaction) => {
      const {user}=tranasaction

    if(user._id==userid){
      if (tranasaction.type === "credit") {
        totalCredit += tranasaction.amount;


      } else {
        totalDebit += tranasaction.amount;

      }
    }
    });
    setCreditAmt(totalCredit);
    setDebitAmt(totalDebit);



  }
useEffect(() => {
      if (!(JSON.parse(localStorage.getItem('exloginuser')))) {

        if (!(JSON.parse(localStorage.getItem('exsinguser')))) {
          window.location.href = '/singup'
          return

        }
        window.location.href = '/login'

      }

      loaduserfromlclStr11();
      if (!(JSON.parse(localStorage.getItem('excheckpass')))){
        setModelclass('postmodelhome')
        setModelwrapper('model-wrapperhome')
        document.body.style.overflowY = "hidden"
      }

      loadlogineduser()
      loadgetapicashamt()
        loadTransaction()

 }, [])
  console.log(userid)

  // -------------all transactions-----------------
    const [transactions, setTransactions] = useState([])

 
   const data = [
    { name: "credit", amount: creditAmt?creditAmt:50 },
    { name: "debit", amount: debitAmt?debitAmt:50 },

];
//  useEffect(()=>{
//   loadgetapicashamt()
//  },[userid])


    // --------------get cash------------

  const loadgetapicashamt = async () => {
   try{
    const response = await axios.get(`/api/cashamount/65818841d329dcdfc042950e`)
    if (response?.data?.data) {
      setCashamtdata((response?.data?.data[0]).cash)
    }
   }catch(err){
    console.log(err)
   }
  }
  //    console.log(cashamtdata.cash)


  window.addEventListener('beforeunload', function (event) {
    localStorage.removeItem('excheckpass')
  });

// -------------password model-----------------

const [modelclass, setModelclass] = useState('displaynone')
const [modelwrapper, setModelwrapper] = useState('')


// ------------------------logic--------------------
const [checkpass,setCheckpass]=useState('')
const [passworddata,setPassworddata]=useState({})
const loaduserfromlclStr11=()=>{
const response=JSON.parse(localStorage.getItem("expassword"))
setPassworddata(response.password)
}
const checkpasswordfun=()=>{
  if(checkpass==passworddata){
    localStorage.setItem("excheckpass","true")
      setModelclass('displaynone')
      setModelwrapper('')
      document.body.style.overflowY = "scroll"
    
   


  }
  else{
      alert("incorrectpassword")
  }
}
// -----------------------logic-----------







  return (
    <div className='main-container' >


      <SideBar />
      <div className='sub-container home-container'>
        <div className='sub-container1'>
          <div className='graph-container'>
            <div className='main-heading'>All Transactions</div>
            <div style={{ textAlign: "center" }}>
              <div className="graph-subcon">
                <PieChart width={500} height={500}>
                  <Pie className="piechart"
                    dataKey="amount"
                    isAnimationActive={false}
                    data={data}
                    cx={200}
                    cy={130}
                    outerRadius={80}
                    fill="#d49ff9"
                    label
                  />
                  <Tooltip />
                </PieChart>

              </div>
            </div>




          </div>

          <div className='transaction-amount-section'>
            <AmountCard type={"total"} heading={"Total balance"} amount={cashamtdata + creditAmt - debitAmt} />
            <AmountCard type={"credit"} heading={"Total Credit"} amount={creditAmt} />
            <AmountCard type={"debit"} heading={"Total Debit"} amount={debitAmt} />
          </div>
          <div>
          </div>
              <div className='recent-history'>
            <div className='main-heading'>Recent History</div>
            {
              transactions.map((transaction, i) => {
                const { amount, category, type, description, _id,user } = transaction
              if(user._id==userid){
                return <HistoryCard amount={amount} category={category} description={description} type={type} />
              }

               
              })
            }
          </div>
        </div>
      </div>



      <div className={`${modelwrapper}`}></div>
      <div className={` transaction-model  ${modelclass}`}>
         
     <div className='lock-img-con'> <img  src={lock} className='lock-img'/></div>
      <div className='pin-heading'>Enter a pin</div>
        <input type='password' placeholder=''  className='input-box lock-input' value=      {checkpass} onChange={(e) => {
                setCheckpass(e.target.value)
         }} />
              <button type='button' className='submit-btn margin-top lock-btn' onClick={checkpasswordfun} >open</button>
   
      
      </div>
     

    </div>

  )
}
