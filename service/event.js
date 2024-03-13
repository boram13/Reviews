const UserEvent = require('../models/userEvent');
const mongoose = require('mongoose');

const saveEvent = async (userId, eventName, action) => {
    const session = await mongoose.startSession();

  try {
    const event = new UserEvent({
      userId,
      eventName,
      eventDate: new Date(),
      action,
    });

    const savedEvent = await event.save();

    return savedEvent;
  } catch (error) {
    throw new Error(`Failed to save event: ${error.message}`);
  }
};

const getAllEvents =  async(page, limit) => {

  try{
    const offset = (page - 1) * limit;
    let events;
    if(page ===1){
      events = await UserEvent.find().limit(limit).exec();
    }else{
      events = await UserEvent.find().skip(0).limit(limit).exec();
    }
    return events;
  }catch (error) {
    throw new Error (' can not get the events from the database');
    
  }
}

const getTotalEventCount = async () => {
  try {
      const count = await UserEvent.countDocuments();
      return count;
  } catch (error) {
      throw new Error('Can not get total event');
  }
};

module.exports = {
  getAllEvents,
  saveEvent,
  getTotalEventCount,
};