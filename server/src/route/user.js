

const express=require('express')
const router=express.Router()
const {Login,Signup}= require('../controller/user')

router.post('/signup',Signup)
router.post('/login',Login)

module.exports= router