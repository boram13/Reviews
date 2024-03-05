const eventService = require('../service/event');

exports.getAllEvents = async (req,res) => {
    try{
        const events = await eventService.getAllEvents();
        res.json(events);
    }catch(error){
        res.json('error hapend to get all the events');
    }
}

