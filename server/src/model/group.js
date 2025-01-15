const mongoose=require('mongoose')

const groupSchema= new mongoose.Schema({
    name:{
        type:String
    },
    
    description:{
        type:String
    },
    creator:{
        type:String
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:[]
    }],
    


},{timestamps:true})

module.exports = mongoose.model('Group',groupSchema)
