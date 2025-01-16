const express=require('express')

const router=express.Router()
const {CreateBook,GetAllBooks,GetOneBook,UpdateBook,DeleteBook,AddComment}=require('../controller/book')
const auth=require('../middleware/auth')

router.post('/create',auth,CreateBook)
router.get('/allbooks',GetAllBooks)
router.get('/:bookId',GetOneBook)
router.put('/updatebook/:bookId',auth,UpdateBook)
router.delete('/deletebook/:bookId',auth,DeleteBook)
router.post('/comment/:bookId',auth,AddComment)



module.exports=router