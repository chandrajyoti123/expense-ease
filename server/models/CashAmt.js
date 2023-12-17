import { model, Schema } from "mongoose";
const amountschema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "SingUpUser",
        required: true
    },

    cash: {
        type: "Number",
        required: true,
    },
},{
    timestamps:true
} )
const Amount=model("Amount",amountschema)
export default Amount;