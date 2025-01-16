const mongoose=require('mongoose')


const bookShema= new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    author:{
       type:String 
    },
    genre:{
        type:String
    },
    coverPage:{
        type:String
    },
    creator:{type:String},

    comments:[{
        
       commentator:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
       comment:String
    }],
    like:{
        type:[String],
        default:[]
    },
   rate:{
       number_of_star:{
        type:Number,
        default:0
       },
       rater:[
        {
            userId:{type: mongoose.Schema.Types.ObjectId , ref:'User'},
            star:{type:Number}
        }
       ]
   }


},{timestamps:true})

module.exports= mongoose.model('Book',bookShema)