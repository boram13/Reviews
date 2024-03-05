const express = require('express');

const router = express.Router();

const eventController = require('../controller/event');

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
router.get('/events', eventController.getAllEvents);
 

module.exports = router;