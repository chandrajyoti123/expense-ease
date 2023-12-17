import React from 'react'
import SideBar from '../../components/SideBar/SideBar'
import './Home.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import HistoryCard from '../../components/HistoryCard/HistoryCard'
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


  const data = [
    { name: "credit", amount:creditAmt },
    { name: "debit", amount: debitAmt },
    // { name: "Twiter", users: 1000000000 },
    // { name: "Telegram", users: 500000000 },
  ];

  const [userid, setUserid] = useState()
 
  
  useEffect(() => {

    const response = JSON.parse(localStorage.getItem("exloginuser"))
    setUserid(response._id)
 

   }, [])

  // -------------all transactions-----------------
   const [transactions, setTransactions] = useState([])
  const loadTransaction = async () => {
    if(!userid){
        alert('user not found')
        return
    }
 
      const response = await axios.get(`/api/transactions/${userid}`)
      if (response?.data?.data) {
        setTransactions(response?.data?.data.slice(-4).reverse())
      }

       let totalCredit = 0;
    let totalDebit = 0;
    transactions.forEach((tranasaction) => {
      if (tranasaction.type === "credit") {
        totalCredit += tranasaction.amount;
      } else {
        totalDebit += tranasaction.amount;
      }
    });
    setCreditAmt(totalCredit);
    setDebitAmt(totalDebit);

  
  }
  useEffect(()=>{
    loadTransaction()
  })
  console.log(userid)
  console.log(transactions)

   
 




  return (
    <div className='main-container' >


      <SideBar />
      <div className='sub-container home-container'>
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
        <div className='recent-history'>
     
        <div className='main-heading'>Recent History</div>

          {  
            transactions.map((transaction, i) => {
              const { amount, category, type, description, _id } = transaction
              
              return <HistoryCard amount={amount} category={category}  description={description} type={type}  />
            })
          }

        </div> 

      </div>
    </div>

  )
}
