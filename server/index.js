import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Transaction from './models/Transaction.js'
import Amount from './models/CashAmt.js'
import Password from './models/Password.js'
// import getapitransactionbyid from './controllers/TransactionById.js'
import path from "path"


import { postapilogin, postapisingupuser } from './controllers/SingUp.js'

dotenv.config()

const app = express()
app.use(express.json())
  const __dirname = path.resolve();
const connectMongoDB = async () => {
    const connect = await mongoose.connect(process.env.MONGODB_URI)
    if (connect) {
        console.log('mongo db connected successfully')
    }

}

      app.post("/api/transactions", async (req, res) => {
    const { user, amount, type, category, description } = req.body;
    const transaction = new Transaction({
        user, amount, type, category, description
      })
        try {
        const savedtransaction = await transaction.save();
        return res.json({
            success: true,
            data: savedtransaction,
            message: "transaction saved successfully"
        })
    } catch (err) {
        return res.json({
            success: true,
            message: err.message
        })
    }
})
     app.get("/api/transactions", async (req, res) => {
    const alltransaction = await Transaction.find().populate('user');
    return res.json({
        success: true,
        data: alltransaction,
        message: "all transaction fetched successfully"
      })
})
app.get('/api/transactions/:_id', async (req, res) => {

    const { _id } = req.params
    const findtransaction = await Transaction.find({ user: { _id: _id } }).populate('user')

    res.json({
        success: true,
        data: findtransaction,
        message: " Order of user founds successfully"
    })

})
app.delete('/api/transactions/:_id', async (req, res) => {
    const { _id } = req.params;
    await Transaction.deleteOne({ _id: _id })
    const alltransaction = await Transaction.find()
    return res.json({
        success: true,
        data: alltransaction,
        message: "transaction deleted successfully"

    })
})

app.get('/api/transaction/:_id', async (req, res) => {
    const { _id } = req.params
    const foundtransaction = await Transaction.findOne({ _id: _id }).populate('user')
    return res.json({
        success: true,
        data: foundtransaction,
        message: "data got successfully "
     })
})

app.put('/api/transaction/:_id', async (req, res) => {
    const { _id } = req.params
    const { user, amount, type, category, description } = req.body
    try {
        await Transaction.updateOne({ _id: _id }, {
            $set: {
                user: user,
                amount: amount,
                type: type,
                category: category,
                description: description
            }
        })
        const updatedtransaction = await Transaction.findOne({ _id: _id })
        res.json({
            success: true,
            data: updatedtransaction,
            message: "transaction updated successfully"
        })
    } catch (err) {
        return res.json({
            success: false,
            message: err.message
        })
    }

})



// -------------singup--------------
app.post('/api/singupusers', postapisingupuser)
 app.post('/api/loginusers', postapilogin)


// ----------------------amount---------------

app.post('/api/cashamount', async (req, res) => {
    const { user, cash } = req.body
    const newcash = new Amount({
        user, cash
    })
    try {
        const savedcash = await newcash.save()
        return res.json({
            success: true,
            data: savedcash,
            message: "cashadded successfully"
        })
    } catch (err) {
        return res.json({
            success: false,
            message: err.message
        })
    }


})
 app.get('/api/cashamount/:_id', async (req, res) => {
    const { _id } = req.params
    const findcashamt = await Amount.find({ user: { _id: _id } }).populate('user')

    return res.json({
        success: true,
        data: findcashamt,
        message: "all cash found successfully"
    })
})

// -----------------password------------------

app.post('/api/passwords', async (req, res) => {
    const { user, password } = req.body
    const newpassword = new Password({
        user, password
    })
    try {
        const savedpassword = await newpassword.save()
        return res.json({
            success: true,
            data: savedpassword,
            message: "password set successfully"
        })
       } catch (err) {
        return res.json({
            success: false,
            message: err.message
        })
    }


})

  app.get('/api/passwords/:_id', async (req, res) => {
    const { _id } = req.params
    const findPassword = await Password.find({ user: { _id: _id } }).populate('user')

    return res.json({
        success: true,
        data:findPassword,
        message: "password find successfully"
    })
})


  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

     app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
     })
   }


connectMongoDB()
const PORT = 8080
app.listen(PORT, () => {
    console.log(`server is running in port ${PORT}`)
})