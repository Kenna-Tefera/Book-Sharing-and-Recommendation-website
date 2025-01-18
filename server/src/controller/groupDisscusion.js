const Group= require('../model/group')
const User=require('../model/user')

const CreateGroup=async(req,res)=>{
    try{
        const {name,username,description}= req.body
        const userId=req.userId
       
        if(!name || !username || !description) return res.status(400).json('enter all field')
        const IsUsernameTaken= await Group.findOne({username})
        if(IsUsernameTaken) return res.status(400).json('username already taken')
        
        const group=  await Group.create({name,username, description, creator:userId,members:[userId]})
         if(!group) return res.status(400).json('failed to create the group')
         await User.findByIdAndUpdate(userId, { $push: { group: group._id } });
   
         res.status(200).json(group)
    }catch(err){
        res.status(500).json(err.message)
    }
}

const GetAllGroup=async(req,res)=>{
    try{
        const groups= await Group.find().populate('members','fullname')
        if(!groups) return res.status(400).json('fgroup not found')
         res.status(200).json(groups)   
    }catch(err){
        res.status(500).json(err.message)
    }
}

const GetOneGroup=async(req,res)=>{
    try{
        const {groupId}= req.params
        const group= await Group.findById(groupId).populate('join_requests','email fullname').populate('members','email fullname')
        if(!group) return res.status(400).json('failed to fetch')
        res.status(200).json(group)   

    }catch(err){
        res.status(500).json(err.message)
    }
}

const UpdateGroup=async(req,res)=>{
    try{
        const {groupId}= req.params
        const userId = req.userId
        const inputs= req.body

        const group= await Group.findById(groupId)
        if(!group)  return res.status(400).json('group not found')
        if(!(group.creator === userId))  return res.status(400).json('you can only update the group you created')
        
            const updatedGroup = await Group.findByIdAndUpdate(groupId,inputs,{new:true})
        if(!updatedGroup)  return res.status(400).json('failed to update the group')
         res.status(200).json(updatedGroup)
    }catch(err){
        res.status(500).json(err.message)
 
    }

}

const DeleteGroup=async(req,res)=>{
    try{
        const {groupId}= req.params
        const userId = req.userId

        const group= await Group.findById(groupId)
        if(!group)  return res.status(400).json('group not found')
        if(!(group.creator === userId))  return res.status(400).json('you can only delete the group you created')
        
        const deletedGroup = await Group.findByIdAndDelete(groupId)
        if(!deletedGroup)  return res.status(400).json('failed to delete the group')
        res.status(200).json({msg:"deleted", deletedGroup})
    }catch(err){
        res.status(500).json(err.message)
 
    }

}

const AddMember=async(req,res)=>{
      try{
        const {groupId}= req.params
        const userId = req.userId
        const {newMember} = req.body
        const group= await Group.findById(groupId)
        const user= await User.findById(newMember)

        if(!group)  return res.status(400).json('group not found')
        if(!user)  return res.status(400).json('member not found in user list of the web')

        if(!(group.creator === userId))  return res.status(400).json('you can only add member to the group you created')
        const alreadyExist= group.members.findIndex((e)=>e.toString()===newMember)
        if(alreadyExist !== -1) {
             return res.status(400).json('already member')
          }else{
            group.members.push(newMember)
            
            if(group.join_requests.includes(newMember)){
                group.join_requests=  group.join_requests.filter((e)=>e.toString() !== newMember )
            }
            user.group.push(groupId)
            await group.save()
            await user.save()
           
            res.status(200).json(group)

          }

      }catch(err){
        res.status(500).json(err.message)

      }
}

const RemoveMember=async(req,res)=>{
    try{
      const {groupId}= req.params
      const userId = req.userId
      const {memberToRemove} = req.body
      
      const group= await Group.findById(groupId)
      const user= await User.findById(memberToRemove)

      if(!group)  return res.status(400).json('group not found')
      if(!user)  return res.status(400).json('member not found in user list of the web')

      if(!(group.creator === userId))  return res.status(400).json('you can only remove member from the group you created')
      const isExist= group.members.findIndex((e)=>e.toString()===memberToRemove)
      if(isExist === -1) {
           return res.status(400).json(' member to remove not already member')
        }else{
          group.members = group.members.filter((e)=>e.toString() !== memberToRemove)
        // const  updatedMembers= await Group.findByIdAndUpdate(groupId, {members:newMembers},{new:true})
        user.group = user.group.filter((e)=>e.toString() !== groupId)
        //  const updatedGroups= await User.findByIdAndUpdate(memberToRemove, {groups:newGroups},{new:true})
        await group.save()
        await user.save()
         res.status(200).json(updatedMembers)

        }
    }catch(err){
      res.status(500).json(err.message)

    }
}

const SendJoinRequest=async(req,res)=>{

    try{
         
        const {groupId}= req.params
        const userId = req.userId
        const {memberToJoin} = req.body

        const group= await Group.findById(groupId)
        const user= await User.findById(memberToJoin)
  
        if(!group)  return res.status(400).json('group not found')
        if(!user)  return res.status(400).json('member not found in user list of the web')

        
        const alreadyExist= group.members.findIndex((e)=>e.toString()===newMember)
        if(alreadyExist !== -1) {
             return res.status(400).json('you are already member')
          }else{
            group.join_requests.push(newMember)
            await group.save()
            res.status(200).json(group)


          }

            
    }catch(err){
        res.status(500).json(err.message)
 
    }
}

const CancelJoinRequest=async(req,res)=>{
    try{
        const {userId}= req.userId
        const {userToCancel} = req.body
        const {groupId} =req.params
        
        const group = await Group.findById(groupId)
        if(!group)  return res.status(400).json('group not found')
        
        if((userId === group.creator) || (userId === userToCancel)){
             group.join_requests=group.join_requests.filter((e)=>e.toString() !== userToCancel)
             await  group.save()
             res.status(200).json(group)
            }else{
                return res.status(400).json('u cant cancel others join request')
            }
    }catch(err){
        res.status(500).json(err.message)

    }
}



//guys to accept the join request of group just use addMember api with id of join request sender



module.exports= {CreateGroup,GetAllGroup,GetOneGroup,UpdateGroup,DeleteGroup,AddMember,RemoveMember,SendJoinRequest,CancelJoinRequest}