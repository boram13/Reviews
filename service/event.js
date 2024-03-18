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

const getAllEvents = async (page, limit, sortField, sortOrder) => {
  try {
    const offset = (page - 1) * limit;
    const sortOptions = {};
    if (sortField && sortOrder) {
      sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;
    }
    const events = await UserEvent.find().sort(sortOptions).skip(offset).limit(limit).exec();
    return events;
  } catch (error) {
    throw new Error('Cannot get the events from the database');
  }
};

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