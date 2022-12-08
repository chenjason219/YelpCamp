const express = require('express');
//when using express router, it keeps params separate
//so when using it you pass {mergeParams: true} into express.Router in order to have access to that id's params
// if we dont pass {mergeParams: true}, there will be an error when using req.params.id in this file
//because it would not have access
const router = express.Router({mergeParams: true});

const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware');
const catchAsync = require('../utils/catchAsync');
const reviews = require('../controllers/reviews');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;