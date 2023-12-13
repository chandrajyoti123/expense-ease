import SingUpUser from "../models/SingUp.js";
const postapisingupuser=async(req,res)=>{
    const {first_name,last_name,phone_no,email,password,gender}=req.body;
    const newuser=new SingUpUser({
        first_name,last_name,phone_no,email,password,gender
    })
   try{
    const saveduser=await newuser.save()
    return res.json({
        success:true,
        data:saveduser,
        message:"user saved successfully"
    })
   }
   catch(err){
    return res.json({
        success:false,
        message:err.message
    })
   }
}


const postapilogin=async(req,res)=>{
    const {email, password}=req.body
     if(!email &&  !password){
       return res.json({
            success:false,
            message:"please enter email and password"
        })
    }
  
     const logineduser= await SingUpUser.findOne({email:email, password:password})

     if(!logineduser){
       return res.json({
            success:false,
            message:"Invalid credential"
        })
     }

    return res.json({
        success:true,
        data:logineduser,
        message:"user login successfully"

      })
  


}
export {postapilogin,postapisingupuser}