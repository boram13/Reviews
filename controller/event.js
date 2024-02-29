const eventService = require('../service/event');

exports.saveEvent = async(req,res) => {
    const {userId, eventName,action } = req.body;

    try{
        const savedEvent = await eventService.saveEvent(userId, eventName, action);
        res.json(savedEvent);
    }catch (error) {

res.json({error: error.message});
}
}

