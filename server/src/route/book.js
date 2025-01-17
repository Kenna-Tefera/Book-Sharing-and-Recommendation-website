const express=require('express')

const router=express.Router()
const {CreateBook,GetAllBooks,GetOneBook,UpdateBook,DeleteBook,AddComment,LikeBook,SearchBooks,FilterBooksByGenre,RateBook}=require('../controller/book')
const auth=require('../middleware/auth')

router.post('/create',auth,CreateBook)
router.get('/allbooks',GetAllBooks)
router.get('/search',SearchBooks)
router.get('/filterbook',FilterBooksByGenre)
router.get('/:bookId',GetOneBook)
router.put('/updatebook/:bookId',auth,UpdateBook)
router.delete('/deletebook/:bookId',auth,DeleteBook)
router.post('/comment/:bookId',auth,AddComment)
router.post('/:bookId/like',auth,LikeBook)
router.post('/:bookId/rate',RateBook)

module.exports=router