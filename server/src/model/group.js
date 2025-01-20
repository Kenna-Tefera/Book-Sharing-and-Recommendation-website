const mongoose=require('mongoose')



const groupSchema= new mongoose.Schema({
    name:{
        type:String
    },
    username:{
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
    join_requests:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],

    chats:[{
        texter:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
        text:{type:String}
         
    }]
    


},{timestamps:true})

module.exports = mongoose.model('Group',groupSchema)
