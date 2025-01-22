const express=require('express')
const mongoose=require('mongoose')
const cors = require('cors');
const app= express()
require('dotenv').config()
const userRoute= require('./src/route/user')
const bookRoute= require('./src/route/book')
const groupRoute= require('./src/route/groupDisscusion')

const PORT= process.env.PORT || 5000;
MONGODB_URL =process.env.MONGODB_URL || 'mongodb://localhost/booksharing'
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));  

app.use('/user',userRoute)
app.use('/book',bookRoute)
app.use('/group',groupRoute)


mongoose.connect(MONGODB_URL)
.then(() => {
    console.log('Database is successfully connected');
    app.listen(PORT, () => {
      console.log(`Backend is running on port ${PORT}`);
    });
  })
        .catch((err)=>console.log(err))


        
app.use(cors({
            origin: 'http://localhost:3000', // Replace with your frontend URL
            credentials: true,
          }));
app.listen(5001,()=>{
    console.log(`backend is running on port  ${PORT}`)
} )