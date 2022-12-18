const mongoose = require("mongoose")

const customerSchema = new mongoose.Schema({
    name : {
        type:String,
        required:[true,"Name is required"],
        trim:true
    },
    phone:{
        type: Number,
        required: [true,"Phone is required"],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        trim: true,
        unique:true
    },
    category: {
        type:String,
        enum: ["regular","gold","platinum"],
        default:"regular"
    },
},{timestamps:true})

module.exports = mongoose.model("Customer",customerSchema)