const Group= require('../model/group')

const CreateGroup=async(req,res)=>{
    try{
        const {name,username,description}= req.body
        const userId=req.userId
       
        if(!name || !username || !description) return res.status(400).json('enter all field')
        const IsUsernameTaken= await Group.findOne({username})
        if(IsUsernameTaken) return res.status(400).json('username already taken')
        
        const group=  await Group.create({name,username, description, creator:userId,members:[userId]})
         if(!group) return res.status(400).json('failed to create the group')
         res.status(200).json(group)
    }catch(err){
        res.status(500).json(err.message)
    }
}

module.exports= {CreateGroup}