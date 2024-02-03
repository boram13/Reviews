const express = require('express');

const reviewController = require('../controller/review');

const isAuth = require('../middleware/is-auth');

const isAdmin = require('../middleware/is-admin');
const { body, param } = require('express-validator/check');


const router = express.Router();

router.post('', isAuth, reviewController.createReview);

router.put(
    '/:reviewId',
    isAuth,
    [
        body('rate')
            .isNumeric()
            .withMessage('Please enter a valid rate.'),
        body('description')
            .isString()
            .withMessage('Please enter a valid description.'),
        param('reviewId')
            .isString()
            .isLength(24)
            .withMessage('Please enter a valid reviewId param.'),
    ],
    reviewController.updateReview
);// request param

router.get('/', reviewController.readAllReviews);

router.delete('/:reviewId', isAuth, isAdmin, reviewController.deleteReview);

module.exports = router;