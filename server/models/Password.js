import { model, Schema } from "mongoose";
const passwordschema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "SingUpUser",
        required: true
    },

    password: {
        type: "String",
        required: true,
    },
},{
    timestamps:true
} )
const Password=model("Password",passwordschema)
export default Password;