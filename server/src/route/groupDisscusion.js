

const auth=require('../middleware/auth')
const express=require('express')
const router= express.Router()
  
const {CreateGroup}= require('../controller/groupDisscusion')
router.post('/create',auth,CreateGroup)

module.exports= router