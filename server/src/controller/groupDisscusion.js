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
        if(!groups) return res.status(400).json('failed to fetch')
         res.status(200).json(groups)   
    }catch(err){
        res.status(500).json(err.message)
    }
}

const GetOneGroup=async(req,res)=>{
    try{
        const {groupId}= req.params
        const group= await Group.findById(groupId)
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


module.exports= {CreateGroup,GetAllGroup,GetOneGroup,UpdateGroup,DeleteGroup}