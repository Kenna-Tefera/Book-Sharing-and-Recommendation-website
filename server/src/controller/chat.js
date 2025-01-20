
const Group= require('../model/group')
const User= require('../model/user')


const WriteChat=async(req,res)=>{
    try{
        const {groupId}= req.params
        const userId= req.userId
        const {text}= req.body

        const group= await Group.findById(groupId)
        const user= await User.findById(userId)
        if(!group) return res.status(400).json('group not found')
        if(!user) return res.status(400).json('user not found')

        if(!(group.members.includes(userId)))  return res.status(400).json('cnat write text if you u are not member')  
        group.chats.push({text:text, texter:userId})
        await group.save()
        res.status(200).json(group)
    }catch(err){
        res.status(500).json(err.message)
    }

}

const DeleteMyChat=()=>{
    try{
        const {groupId}= req.res
        const userId= req.userId
        
    }catch(err){
        res.status(500).json(err.message)

    }
}




module.exports={WriteChat}