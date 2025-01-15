const Book=require('../model/book')


const CreateBook=async( req,res)=>{
    try{
        const inputs= req.body
        const newBook= await Book.create({...inputs,creator:req.userId})
        if(!newBook) return res.status(400).json('failed to create books')
        res.status(200).json(newBook)    

    }catch(err){
        res.status(500).json(err.message)
    }
   
}


module.exports=  {CreateBook}