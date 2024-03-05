const express = require('express');

const reviewController = require('../controller/review');
const isAuth = require('../middleware/is-auth');
const isAdmin = require('../middleware/is-admin');
const { body, param } = require('express-validator/check');

const router = express.Router();

/**
 * @swagger
 * /reviews:
 *   post:
 *     summary: Create a new review
 *     description: Create a new review with the given user ID, rate, and description.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               rate:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#./models/components/schemas/Review'
 *       '500':
 *         description: Failed to create review
 */

router.post('', isAuth, reviewController.createReview);

/**
 * @swagger
 * /reviews/{reviewId}:
 *   put:
 *     summary: Update a review
 *     description: Update an existing review with the given review ID.
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the review to update
 *       - in: body
 *         name: review
 *         description: Review object that needs to be updated
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *             description:
 *               type: string
 *             rate:
 *               type: number
 *     responses:
 *       '200':
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#.models/components/schemas/Review'
 *       '500':
 *         description: Failed to update review
 */

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

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get all reviews
 *     description: Retrieve all reviews from the database.
 *     responses:
 *       '200':
 *         description: A list of reviews.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *               $ref: '#/./models/components/schemas/Review'
 *       '500':
 *         description: Failed to retrieve reviews from the database.
 */

router.get('/', reviewController.readAllReviews);

router.delete('/:reviewId', isAuth, isAdmin, reviewController.deleteReview);

module.exports = router;