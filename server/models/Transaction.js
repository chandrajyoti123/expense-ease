import { model,Schema } from "mongoose";
const transactionschema=new Schema({
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
    enum : ['food','shopping','education','travell','entertainment',"salary","business","money interest","other"],
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