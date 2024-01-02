const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Review = require('../model/Review');
const { getLoggedinUser } = require('../middleware/user');

// Add a new review with validation
router.post(
  '/',
  getLoggedinUser,
  [
    body('bookId').isMongoId().notEmpty(),
    body('rating').isInt({ min: 1, max: 5 }),
    body('comment').isString().notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { bookId, rating, comment } = req.body;
      const userId = res.loggedinUser ? res.loggedinUser._id : null;

      const newReview = new Review({ bookId, userId, rating, comment });
      await newReview.save();
      res.status(201).json(newReview);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
