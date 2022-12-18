const express = require("express")


const router = new express.Router()
const customerController = require("../controllers/customerController")
const orderController = require("../controllers/orderController")
const customerModel = require("../models/customerModel")

router.post("/customers",customerController.createCustomer)
router.post("/orders",orderController.createOrder)
router.get("/",(req,res) => {
    res.send("hi")
})

// router.post("/customers",async (req,res) => {
//     try{
//         let customer = req.body
//         let customerDetails = await customerModel.create(customer)
//         return res.status(201).send({status:true, data : customerDetails})
//     }
//     catch(err){
//         return res.status(500).send({status: false, message : err.message})
//     }
// })

module.exports = router