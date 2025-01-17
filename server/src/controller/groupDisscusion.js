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
        const groups= await Group.find().populate('members')
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

module.exports= {CreateGroup,GetAllGroup,GetOneGroup}