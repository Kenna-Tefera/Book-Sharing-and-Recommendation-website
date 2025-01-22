const express=require('express')

const router=express.Router()
const {CreateBook,GetAllBooks,GetOneBook,UpdateBook,DeleteBook,AddComment,LikeBook,SearchBooks,FilterBooksByGenre,RateBook}=require('../controller/book')
const auth=require('../middleware/auth')
const multer = require('multer');
const Book = require('../model/book');

router.post('/create',auth,CreateBook)
router.get('/allbooks',GetAllBooks)
router.get('/search',SearchBooks)
router.get('/filterbook',FilterBooksByGenre)
router.get('/:bookId',GetOneBook)
router.put('/updatebook/:bookId',auth,UpdateBook)
router.delete('/deletebook/:bookId',auth,DeleteBook)
router.post('/comment/:bookId',auth,AddComment)
router.post('/:bookId/like',auth,LikeBook)
router.post('/:bookId/rate',auth,RateBook)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // Make sure this folder exists
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  });
  
  const upload = multer({ storage: storage });
  
  // Your routes
  router.post('/', upload.single('file'), async (req, res) => {
    try {
      const { title, author, genre, description } = req.body;
      const filePath = req.file ? req.file.path : null;
  
      const newBook = new Book({
        title,
        author,
        genre,
        description,
        filePath,
      });
  
      await newBook.save();
      res.status(201).json(newBook);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

module.exports=router