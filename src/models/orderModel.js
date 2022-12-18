const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({
    customerId:{
        type: ObjectId,
        ref: "Customer",
        required:true
    },
    title:{
        type: String,
        required:[true,"Food Title is required"]
    },
    description: {
        type: String
    },//no of orders(n_ord)
    n_ord: {
        type : Number,
        required : [true,"Quantity is required"]
    },
    price : {
        type : Number,
        required : [true,"Price is required"]
    },
    cuisine : {
        type : String,
        required : [true, "Cuisine is required"]
    }
})


module.exports = mongoose.model("Order",orderSchema)