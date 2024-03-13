const express = require('express');

const router = express.Router();

const { query } = require('express-validator/check');

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

router.get(
    '/events',
    isAuth,
    [
        query('page').isInt({ min: 1 }).withMessage('Page have to be a positive number!'),
        query('limit').isInt({ min: 3, max: 100 }).withMessage('Limit should be number between 3 and 100')
    ],
    eventController.getAllEvents
);
 
module.exports = router;