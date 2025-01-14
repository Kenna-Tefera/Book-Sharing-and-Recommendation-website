

const express=require('express')
const router=express.Router()
const {Login,Signup,UpdateProfile,DeleteProfile}= require('../controller/user')

router.post('/signup',Signup)
router.post('/login',Login)
router.put('/updateProfile/:userId',UpdateProfile)
router.delete('/deleteProfile/:userId',DeleteProfile)

module.exports= router