

const auth=require('../middleware/auth')
const express=require('express')
const router= express.Router()
  
const {CreateGroup,GetAllGroup,GetOneGroup,UpdateGroup,DeleteGroup,AddMember,RemoveMember,SendJoinRequest,LeaveGroup}= require('../controller/groupDisscusion')

router.post('/create',auth,CreateGroup)
router.get('/allgroups',auth,GetAllGroup)
router.get('/:groupId',auth,GetOneGroup)
router.put('/update/:groupId',auth,UpdateGroup)
router.delete('/delete/:groupId',auth,DeleteGroup)
router.post('/:groupId/addmember',auth,AddMember)
router.post('/:groupId/removemember',auth,RemoveMember)
router.post('/:groupId/sendjoinrequest',auth,SendJoinRequest)


module.exports= router