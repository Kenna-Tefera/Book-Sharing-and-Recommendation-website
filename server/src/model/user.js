const mongoose=require('mongoose')

const useSchema= new mongoose.Schema({
    fullname:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    sex:{
        type:String
    },
    age:{
        type:Number
    },
    profile_picture:{
        type:String
    },
    bio:{
        type:String
    },
    follower:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    group:[{
      type:mongoose.Schema.Types.ObjectId,
        ref:'Group'
    }]
    


},{timestamps:true})

module.exports = mongoose.model('User',useSchema)
