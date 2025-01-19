

const auth=require('../middleware/auth')
const express=require('express')
const router= express.Router()
  
const {CreateGroup,GetAllGroup,GetOneGroup,UpdateGroup,DeleteGroup,AddMember,RemoveMember,LeaveGroup}= require('../controller/groupDisscusion')

router.post('/create',auth,CreateGroup)
router.get('/allgroups',auth,GetAllGroup)
router.get('/:groupId',auth,GetOneGroup)
router.put('/update/:groupId',auth,UpdateGroup)
router.delete('/delete/:groupId',auth,DeleteGroup)
router.post('/:groupId/addmember',auth,AddMember)
router.post('/:groupId/removemember',auth,RemoveMember)


module.exports= router