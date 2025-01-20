
const Group= require('../model/group')
const User= require('../model/user')


const WriteChat=async(req,res)=>{
    try{
        const {groupId}= req.params
        const userId= req.userId
        const {text}= req.body

        const group= await Group.findById(groupId)
        if(!group) return res.status(400).json('group not found')
        const user= await User.findById(userId)
        if(!user) return res.status(400).json('user not found')

        if(!(group.members.includes(userId)))  return res.status(400).json('can not write text if you u are not member')  
        
        group.chats.push({text:text, texter:userId})
        await group.save()
        res.status(200).json(group)
    }catch(err){
        res.status(500).json(err.message)
    }

}

const EditMyChat=async(req,res)=>{
    try{
        const {groupId,chatId}= req.params
        const userId= req.userId
        const { text}=req.body

        const group= await Group.findById(groupId)
        if(!group) return res.status(400).json('group not found')

        const user= await User.findById(userId)
        if(!user) return res.status(400).json('user not found')
        
        if(!(group.members.includes(userId)))  return res.status(400).json(' you u are  not even member')  


        const chat= group.chats.id(chatId)
        if (!chat) return res.status(404).json('Chat not found');
         
        if(chat.texter.toString() !== userId) return res.status(400).json('You can only update your own chat');
        chat.text=text

        await group.save();

        res.status(200).json(group);
    }catch(err){
        res.status(500).json(err.message)

    }
}

const DeleteMyChat=async(req,res)=>{
    try{
        const {groupId,chatId} = req.params
        const userId= req.userId

        const group= await Group.findById(groupId)
        if(!group) return res.status(400).json('group not found')

        const user= await User.findById(userId)
        if(!user) return res.status(400).json('user not found')
       
        if(!(group.members.includes(userId)))  return res.status(400).json(' you u are  not even member')  


         const chat= group.chats.id(chatId)
        if (!chat) return res.status(404).json('Chat not found');
        if((chat.texter.toString() !== userId) || (group.creator !== userId)) return res.status(400).json('You can only delete your own chat or group u created');

        group.chats= group.chats.filter((e)=>e._id.toString() !==chatId)
        await group.save()
        res.status(200).json(group);



    }catch(err){
        res.status(500).json(err.message)

    }
   



}




module.exports={WriteChat,EditMyChat,DeleteMyChat}