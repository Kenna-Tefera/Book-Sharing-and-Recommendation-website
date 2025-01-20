

const auth=require('../middleware/auth')
const express=require('express')
const router= express.Router()
  
const {CreateGroup,GetAllGroup,GetOneGroup,UpdateGroup,DeleteGroup,AddMember,RemoveMember,SendJoinRequest,CancelJoinRequest,LeaveGroup}= require('../controller/groupDisscusion')
const {WriteChat,EditMyChat}= require('../controller/chat')

router.post('/create',auth,CreateGroup)
router.get('/allgroups',auth,GetAllGroup)
router.get('/:groupId',auth,GetOneGroup)
router.put('/update/:groupId',auth,UpdateGroup)
router.delete('/delete/:groupId',auth,DeleteGroup)
router.post('/:groupId/addmember',auth,AddMember)
router.post('/:groupId/removemember',auth,RemoveMember)
router.post('/:groupId/sendjoinrequest',auth,SendJoinRequest)
router.post('/:groupId/canceljoinrequest',auth,CancelJoinRequest)
router.post('/:groupId/leavegroup',auth,LeaveGroup)

router.post('/:groupId/writechat',auth,WriteChat)
router.put('/:groupId/editchat',auth,EditMyChat)



module.exports= router