

const express=require('express')
const router=express.Router()
const {Login,Signup,UpdateProfile,DeleteProfile,getOneUser,getAllUsers,requireResetPassword,resetPassword}= require('../controller/user')
const auth= require('../middleware/auth')

router.post('/signup',Signup)
router.post('/login',Login)
router.get('/alluser',getAllUsers)
router.get('/:userId',getOneUser)
router.put('/updateProfile/:userId',auth,UpdateProfile)
router.delete('/deleteProfile/:userId',auth,DeleteProfile)
router.post('/require-reset',requireResetPassword)
router.post('/reset-password/:token',resetPassword)

module.exports= router