
const express=require('express')
const app=express()
const User=require('../model/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const Signup= async(req,res)=>{
     try{
        const {fullname,email,password}= req.body
        const isUserExist= await User.findOne({email:email})
        if(isUserExist) return res.status(400).json('user aleardy exist')
        const salt=   await bcrypt.genSalt(10)
        const hashedPassword= await bcrypt.hash(password,salt)
        const newUser= await User.create({email,fullname,password:hashedPassword})
        if (!newUser) return res.status(400).json('failed to create new user')
        const token= jwt.sign({id:newUser._id, email:newUser.email},'book',{expiresIn:'30d'})    
         res.status(200).json({msg:'registerd',newUser,token})   
     }catch(err){
         res.status(500).json(err)
     }
}

const Login= async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user) return res.status(400).json('user not found')
        const passwordMatch= await bcrypt.compare(password,user.password)   
        if(!passwordMatch) return res.status(400).json('email or password not correctt')
        const token= jwt.sign({id:user._id, email:user.email},'book',{expiresIn:'30d'})    
        res.status(200).json({msg:'logedIn',user,token})  

    }catch(err){
        res.status(500).json(err.message)
    }
}

const getAllUsers=async(req,res)=>{
    try{
         const users= await User.find().populate()
         if(!users) return res.status(400).json('failed to fetch')
         res.status(200).json(users)  
    }catch(err){
        res.status(500).json(err.message)
    }
}

const getOneUser=async(req,res)=>{
    try{
        const userId= req.params.userId
        const user= await User.findById(userId)
        if(!user) return res.status(400).json('failed to fetch')
        res.status(200).json(user)  
    
    }catch(err){
        res.status(500).json(err.message)

    }
}


const UpdateProfile= async(req,res)=>{
    try{
        const inputs= req.body
        const userId= req.params.userId
        const user= await User.findById(userId)
        if(!user) return res.status(400).json('user with tis id not found')
        const updatedUser= await User.findByIdAndUpdate(userId,inputs,{new:true})  
        if(!updatedUser) return res.status(400).json('failed to update user') 
        res.status(200).json(updatedUser)
    }catch(err){
      res.status(500).json(err.message)
    }
}
  
const DeleteProfile=async(req,res)=>{
    try{
        const {userId}=req.params
        const user= await User.findById(userId)
        if(!user) return res.status(400).json('user with tis id not found')
        const deletedUser= await User.findByIdAndDelete(userId)  
        if(!deletedUser) return res.status(400).json('failed to delete')
         res.status(200).json({msg:'this user deleted successfully', deletedUser})  
    }catch(err){
        res.status(500).json(err.message)


    }
}


module.exports={Signup,Login,UpdateProfile,DeleteProfile,getAllUsers,getOneUser}
