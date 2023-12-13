import { model,Schema } from "mongoose";
const singupuserschema=new Schema({
 first_name:{
    type:"String",
    required:true
 },
 last_name:{
    type:"String",
    required:true
 },
 phone_no:{
    type:"Number",
    required:true
 },
 email:{
    type:"String",
    required:true
 },
 password:{
    type:"String",
    required:true
 },
 gender:{
    type:"String",
 }
},{
    timestamps:true
})
const SingUpUser=model("SingUpUser",singupuserschema)
export default SingUpUser;