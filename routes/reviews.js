const express = require('express')
const router = express.Router({mergeParams:true})

const catchAsync = require('../utils/catchAsync')
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware')
const review = require('../controllers/review')

// post a new review
router.post('/', isLoggedIn, validateReview, catchAsync(review.postReview))

// delete reviews
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(review.deleteReview))

module.exports = router