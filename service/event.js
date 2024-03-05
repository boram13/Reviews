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

const getAllEvents =  async() => {

  try{
    const events = await UserEvent.find().exec();
    return events;
  }catch (error) {
    throw new Error ('error getting the events from the database')
  }
  
}

module.exports = {
  getAllEvents,
  saveEvent
};