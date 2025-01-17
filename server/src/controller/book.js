const book = require('../model/book')
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
        const book= await Book.findById(bookId).populate('comments.commentator','fullname email')
                                               //  .exec();
        if(!book) return res.status(400).json('coudnt find the book with that id')
         res.status(200).json(book)   
       }catch(err){
        res.status(500).json(err.message)

       }

}

const GetAllBooks=async(req,res)=>{
    try{
      // const books= await Book.find()
       const books= await Book.find().populate('comments.commentator','fullname email')
       if(!books) return res.status(400).json('failed to fetch')
        res.status(200).json(books)
    }catch(err){
        res.status(500).json(err.message)

    }
}


const UpdateBook= async(req,res)=>{
    try{
        const {bookId}= req.params
        const inputs= req.body
        const book= await Book.findById(bookId)
        if(!book) return res.status(400).json('book not found')
        const updatedBook= await Book.findByIdAndUpdate(bookId, inputs,{new:true})  
        if(!updatedBook) return res.status(400).json('failed to update') 
        res.status(200).json(updatedBook)     
    }catch(err){
        res.status(500).json(err.message)

    }

}


const DeleteBook=async(req,res)=>{
    try{
        const {bookId}=req.params
        const book= await Book.findById(bookId)
        if(!book) return res.status(400).json('book with this id not found')
         const deletedBook= await Book.findByIdAndDelete(bookId) 
        if(!deletedBook) return res.status(400).json('failed to delete book')
         res.status(200).json({msg:'book deleted', deletedBook})   

    }catch(err){
        res.status(500).json(err.message)

    }
}

const AddComment=async(req,res)=>{
    try{
        const bookId=req.params.bookId
        const {comment}=req.body
        const userId= req.userId
        const book= await Book.findById(bookId)
        if(!book) return res.status(400).json('book with this id not found')
        book.comments.push({comment:comment, commentator:userId}) 
        await book.save()
        res.status(200).json({msg:'commnet added', book})
    }catch(err){
        res.status(500).json(err.message)

    }

}

const LikeBook=async(req,res)=>{
    try{
        const {bookId }=req.params
        const {liker}= req.body
        const book= await Book.findById(bookId)
        if(!book) return res.status(400).json('book with this id not found')
        if(book.likes.includes(liker)) return res.status(400).json('User already liked this book');
        book.likes.push(liker)
        await book.save()
        res.status(200).json({msg:'liked', book})


    }catch(err){
        res.status(500).json(err.message)

    }
}

const SearchBooks = async (req, res) => {
    try {
        const { searchQuery } = req.query;

        if (!searchQuery) {
            return res.status(400).json({ msg: "Search query is required" });
        }
        const books = await Book.find({
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } }, 
                { author: { $regex: searchQuery, $options: 'i' } }, 
                { genre: { $regex: searchQuery, $options: 'i' } }
            ]
        });

        if ( books.length === 0) {
            return res.status(404).json({ msg: "No books found" });
        }

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const FilterBooksByGenre= async (req, res) => {
    try {
        const { genre } = req.query;

        if (!genre) {
            return res.status(400).json({ msg: "genre query is required" });
        }
        const books = await Book.find({genre: { $regex: genre, $options: 'i' }  });

        if ( books.length === 0) {
            return res.status(404).json({ msg: "No books found" });
        }

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports=  {CreateBook,GetOneBook,GetAllBooks,UpdateBook, DeleteBook, AddComment,LikeBook,SearchBooks,FilterBooksByGenre}

