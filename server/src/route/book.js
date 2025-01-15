const express=require('express')

const router=express.Router()
const {CreateBook,GetAllBooks,GetOneBook}=require('../controller/book')
const auth=require('../middleware/auth')

router.post('/create',auth,CreateBook)
router.get('/allbooks',GetAllBooks)
router.get('/:bookId',GetOneBook)


module.exports=router