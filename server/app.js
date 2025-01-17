const express=require('express')
const mongoose=require('mongoose')
const app= express()
require('dotenv').config()
const cors=require('cors')
const userRoute= require('./src/route/user')
const bookRoute= require('./src/route/book')
const groupRoute= require('./src/route/groupDisscusion')

const PORT= process.env.PORT || 5000
MONGODB_URL =process.env.MONGODB_URL || 'mongodb://localhost/booksharing'
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));  

app.use('/user',userRoute)
app.use('/book',bookRoute)
app.use('/group',groupRoute)


mongoose.connect(MONGODB_URL)
        .then(()=>{console.log('databse is successfully connected yea')})
        .catch((err)=>console.log(err))


        

app.listen(PORT,()=>{
    console.log(`backend is running on port  ${PORT}`)
} )