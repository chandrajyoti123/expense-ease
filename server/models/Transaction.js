import { model,Schema } from "mongoose";
const transactionschema=new Schema({
   user:{
            type:Schema.Types.ObjectId,
            ref:"SingUpUser",
            required:true
    },
  
amount:{
    type:"Number",
    required:true,
},
type:{
    type:"String",
    enum : ["debit","credit"],
    required : true
},
category:{
    type:"String",
    enum : ['food','shopping','education','travel','entertainment',"salary","business","EMI","housing","vehicle","financial expenses","investment","other"],
    default:"other"
  
},
description:{
    type:"String",
    
}

},{
    timestamps:true
})
const Transaction=model("Transaction",transactionschema)
export default Transaction;