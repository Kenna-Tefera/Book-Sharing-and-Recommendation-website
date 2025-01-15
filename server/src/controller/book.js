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

const GetOneBook=async(req,res)=>{
       try{
        const bookId= req.params.bookId
        const book= await Book.findById(bookId)
        if(!book) return res.status(400).json('coudnt find the book with that id')
         res.status(200).json(book)   
       }catch(err){
        res.status(500).json(err.message)

       }

}

const GetAllBooks=async(req,res)=>{
    try{
       const books= await Book.find()
       if(!books) return res.status(400).json('failed to fetch')
        res.status(200).json(books)
    }catch(err){
        res.status(500).json(err.message)

    }
}


module.exports=  {CreateBook,GetOneBook,GetAllBooks}