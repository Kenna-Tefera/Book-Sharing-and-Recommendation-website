const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
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
    address:String,
    follower:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:[]
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:[]
    }],
    group:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Group',
        default:[]
    }],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    


},{timestamps:true})

module.exports = mongoose.model('User',userSchema)
