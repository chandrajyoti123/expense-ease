import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Transaction from './models/Transaction.js'
// import getapitransactionbyid from './controllers/TransactionById.js'


import { postapilogin,postapisingupuser } from './controllers/SingUp.js'

dotenv.config()

const app=express()
app.use(express.json())
const connectMongoDB=async()=>{
    const connect=await mongoose.connect(process.env.MONGODB_URI)
    if(connect){
    console.log('mongo db connected successfully')
    }

}

app.post("/api/transactions",async(req,res)=>{
    const {user,amount,type,category,description}=req.body;
    const transaction=new Transaction({
        user,amount,type,category,description
    })
   try{
    const savedtransaction=await transaction.save();
    return res.json({
        success:true,
        data:savedtransaction,
        message:"transaction saved successfully"
    })
   }catch(err){
    return res.json({
        success:true,
        message:err.message
    })
   }
})
app.get("/api/transactions",async (req,res)=>{
    const alltransaction=await Transaction.find().populate('user');
    return res.json({
        success:true,
        data:alltransaction,
        message:"all transaction fetched successfully"
    })
})
app.get('/api/gettransactionsbyid/:_id',async(req,res)=>{
   
    const {_id}=req.params
    const findtransaction= await Transaction.find({user:{_id:_id}}).populate('user')
    
    res.json({
      success:true,
      data:findtransaction,
       message:" Order of user founds successfully"  
     })
 
})

// -------------singup--------------
 app.post('/api/singupusers',postapisingupuser)
app.post('/api/loginusers',postapilogin)



connectMongoDB()
   const PORT=8080
app.listen(PORT,()=>{
    console.log(`server is running in port ${PORT}`)
})