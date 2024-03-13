const { validationResult } = require('express-validator/check');
const eventService = require('../service/event');

exports.getAllEvents = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(500).json({ errors: errors.array() });
    }

    try {
        let { page, limit } = req.query;

        // if (!page || !limit || isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
        //     return res.json('Page and limit values must be integers');
        // }

        const totalCount = await eventService.getTotalEventCount();
        const totalPages = Math.ceil(totalCount / limit);

        if (page > totalPages) {
            return res.json('more pages than total');
        }
        console.log("totalCount", totalCount);
     
        const events = await eventService.getAllEvents(page, limit);
        res.json({ events, totalPages });
    } catch (error) {
        console.error('Error occurred while getting all events:', error);
        res.json('An error occurred while getting all events');
    }
};

  

