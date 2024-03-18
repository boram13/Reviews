const express = require('express');

const router = express.Router();

const { body, check } = require('express-validator/check');

const eventController = require('../controller/event');
const isAuth = require('../middleware/is-auth');

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     description: Retrieve all events from the database.
 *     responses:
 *       '200':
 *         description: List of all events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       '500':
 *         description: Error
 */
const isObject = value => {
    return typeof value === 'object' && value !== null;
};

router.post(
    '/paginate',
    isAuth,
    [
        check('paginate').optional().custom(isObject).withMessage('Pagination must be an object'),
        body('paginate.page').optional().isInt({ min: 1 }).withMessage('Page must be a positive number!'),
        body('paginate.limit').optional().isInt({ min: 3, max: 10 }).withMessage('Limit should be a number between 3 and 10'),
        check('sort').optional().custom(isObject).withMessage('Sort must be an object'),
        body('sort.sortField').optional().isString().withMessage('Sort field should be a string'),
        body('sort.sortOrder').optional().isIn(['asc', 'desc']).withMessage('Sort order should be "asc" or "desc"'),
        check('filter').optional().custom(isObject).withMessage('Filter must be an object'),
        body('filter.eventName').optional().isString().withMessage('Event name should be a string'),
        body('filter.userId').optional().isString().withMessage('User ID should be a string'),
        body('filter.action').optional().isString().withMessage('Action should be a string')
    ],
    eventController.getAllEvents
);

module.exports = router;