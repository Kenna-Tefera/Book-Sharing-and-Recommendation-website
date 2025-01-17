

const auth=require('../middleware/auth')
const express=require('express')
const router= express.Router()
  
const {CreateGroup,GetAllGroup,GetOneGroup,UpdateGroup,DeleteGroup}= require('../controller/groupDisscusion')

router.post('/create',auth,CreateGroup)
router.get('/allgroups',auth,GetAllGroup)
router.get('/:groupId',auth,GetOneGroup)
router.put('/update/:groupId',auth,UpdateGroup)
router.delete('/delete/:groupId',auth,DeleteGroup)

module.exports= router