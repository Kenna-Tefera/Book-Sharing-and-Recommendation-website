const express=require('express')
const mongoose=require('mongoose')
const app= express()
require('dotenv').config()
const cors=require('cors')
const userRoute= require('./src/route/user')

const PORT= process.env.PORT || 5000
MONGODB_URL =process.env.MONGODB_URL || 'mongodb://localhost:27017/booksharing'
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));  

app.use('/user',userRoute)

mongoose.connect(MONGODB_URL)
        .then(()=>{console.log('databse is successfully connected')})
        .catch((err)=>console.log(err))



app.listen(PORT,()=>{
    console.log(`backend is running on port  ${PORT}`)
} )