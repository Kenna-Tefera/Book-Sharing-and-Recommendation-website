const express=require('express')

const router=express.Router()
const {CreateBook}=require('../controller/book')
const auth=require('../middleware/auth')

router.post('/create',auth,CreateBook)


module.exports=router