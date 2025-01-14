

const express=require('express')
const router=express.Router()
const {Login,Signup,UpdateProfile}= require('../controller/user')

router.post('/signup',Signup)
router.post('/login',Login)
router.put('/updateProfile/:userId',UpdateProfile)

module.exports= router