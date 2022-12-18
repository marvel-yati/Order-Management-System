const mongoose = require("mongoose")
const orderModel = require("../models/orderModel")
const nodemailer = require("nodemailer")




const createOrder = async function(req,res) {
    try{
        
        let order = req.body
        let customerCategory = "",message = ""
        if(order.n_ord >= 1 && order.n_ord <= 9){
            customerCategory = "Regular"
            message = "You are now a regular customer"
        }
        if(order.n_ord == 9){
            let transporter = nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user: 'detitin20@gmail.com',
                    pass:'ucfunluldsqupsbb'
                }
            })
            let mailOptions = {
                from:'detitin20@gmail.com',//sender emailid
                to:'jayantakrsarkar@gmail.com',//give any email id here(receiver emailid)
                subject:'Sending Email using Node.js',
                text: 'You have placed 9 orders with us. Buy one more stuff and you will be promoted to Gold customer and enjoy 10% discounts'
            }
            transporter.sendMail(mailOptions,function(err,info){
                if(err){
                    console.log(err)
                }
                else{
                    console.log('Email sent: '+info.response)
                }
            })
        }
        else if(order.n_ord >= 10 && order.n_ord < 20){
            customerCategory = "Gold"
            message = "You are now a gold customer, you are getting 10% discount 😄"
        }
        else if(order.n_ord >= 20){
            customerCategory = "Platinum"
            message = "You are a platinum customer, you are getting 20% discount 😄"
        }
        let orderCreated = await orderModel.create(order)
        res.status(201).send({status:true,message:"Order Placed", category: customerCategory,message : message, data : orderCreated})
    }
    catch(err){
        res.status(500).send({status:false, message : err.message})
    }
}


module.exports.createOrder = createOrder