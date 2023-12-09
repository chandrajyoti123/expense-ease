import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Transaction from './models/Transaction.js'
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
    const {amount,type,category,description}=req.body;
    const transaction=new Transaction({
        amount,type,category,description
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

connectMongoDB()
   const PORT=5000
app.listen(PORT,()=>{
    console.log(`server is running in port ${PORT}`)
})