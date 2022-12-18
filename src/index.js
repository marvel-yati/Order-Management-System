const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const mongoose = require("mongoose")
const route = require("./routes/route")

app.use(express.json())

// app.use("/",(req,res) => {
//     res.send("hi welcome")
// })



mongoose.set('strictQuery',true)
mongoose.connect("mongodb+srv://debayatisarkar:cI2Ty1yHOKIVgSkh@bookmanagement.6gwntxc.mongodb.net/OrderManagement",{
    useNewUrlParser : true
})
.then(() => console.log("MongoDB is connected"))
.catch((err) => console.log(err))

app.use("/",route)
app.listen(port,() => {
    console.log(`Express app is running on port ${port}`)
})