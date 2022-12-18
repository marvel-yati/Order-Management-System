const customerModel = require("../models/customerModel")
const validator = require("validator")
const nodemailer = require("nodemailer")
let phoneRegex = /^([+]\d{2})?\d{10}$/

const createCustomer = async function(req,res)  {
    try{
        let customer = req.body
        let {name,email,phone} = customer
        if(!validator.isAlpha(name)){
            return res.status(400).send("Name is not valid,provide a valid name")
        }
        if(!validator.isEmail(email)){
            return res.status(400).send("Email is not valid, provide a valid email")
        }
        if(!phoneRegex.test(phone)){
            return res.status(400).send("Phone is not valid,enter a valid one")
        }
        let getCustomerDetails = await customerModel.findOne({$or:[{email:email},{phone:phone}]})
        console.log(getCustomerDetails)
        if(getCustomerDetails){
            if(getCustomerDetails.email == email){
                return res.status(400).send({status:false,msg:`${email} is already registered`})
            }
            else{
                return res.status(400).send({status: false, msg:`${phone} is already used`})
            }
        }
        let customerDetails = await customerModel.create(customer)
        return res.status(201).send({status:true, data : customerDetails})
    }
    catch(err){
        return res.status(500).send({status: false, message : err.message})
    }
}

// let transporter = nodemailer.createTransport({
//     service:'gmail',
//     auth:{
//         user: 'detitin20@gmail.com',
//         pass:'ucfunluldsqupsbb'
//     }
// })

// let mailOptions = {
//     from:'detitin20@gmail.com',
//     to:'debayatisarkar@gmail.com',
//     subject:'Sending Email using Node.js',
//     text: 'Hey,whatsapp'
// }

// transporter.sendMail(mailOptions,function(err,info){
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log('Email sent: '+info.response)
//     }
// })
module.exports.createCustomer = createCustomer