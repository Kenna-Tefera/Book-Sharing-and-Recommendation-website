

const express=require('express')
const router=express.Router()
const {Login,Signup,UpdateProfile,DeleteProfile,getOneUser,getAllUsers,requireResetPassword,resetPassword,Follow,UnFollow}= require('../controller/user')
const auth= require('../middleware/auth')

router.post('/signup',Signup)
router.post('/login',Login)
router.get('/alluser',auth,getAllUsers)
router.get('/:userId',auth,getOneUser)
router.put('/updateProfile/:userId',auth,UpdateProfile)
router.delete('/deleteProfile/:userId',auth,DeleteProfile)
router.post('/forgotpassword', requireResetPassword);
router.post('/reset/:token',resetPassword);
router.post('/:userId/follow',auth,Follow)
router.post('/:userId/unfollow',auth,UnFollow)



module.exports= router
