const { validationResult } = require('express-validator/check');
const eventService = require('../service/event');

exports.getAllEvents = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let { paginate: { page, limit }, sort: { sortField, sortOrder }, filter } = req.body;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 5;

        const totalDocuments = await eventService.getTotalEventCount(filter);
        const totalPages = Math.ceil(totalDocuments / limit);

        if (page > totalPages) {
            return res.status(400).json('Requested page does not exist');
        }

        sortField = sortField || '_id';
        sortOrder = sortOrder || 'asc';const { validationResult } = require('express-validator/check');
        const eventService = require('../service/event');
        
        exports.getAllEvents = async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
        
            try {
                let { paginate: { page, limit }, sort: { sortField, sortOrder }, filter } = req.body;
        
                page = parseInt(page) || 1;
                limit = parseInt(limit) || 5; 
        
                const totalDocuments = await eventService.getTotalEventCount(filter);
                const totalPages = Math.ceil(totalDocuments / limit);
        
                if (page > totalPages) {
                    return res.status(400).json('Requested page does not exist');
                }
        
                sortField = sortField || '_id'; 
                sortOrder = sortOrder || 'asc'; 
             
                const events = await eventService.getAllEvents(page, limit, sortField, sortOrder, filter);
                res.json({ events, totalPages, totalDocuments });
            } catch (error) {
                console.error('Error occurred while getting all events:', error);
                res.status(500).json('An error occurred while getting all events');
            }
        };
        

        const events = await eventService.getAllEvents(page, limit, sortField, sortOrder, filter);
        res.json({ events, totalPages, totalDocuments });
    } catch (error) {
        console.error('Error occurred while getting all events:', error);
        res.status(500).json('An error occurred while getting all events');
    }
};
