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

const getAllEvents = async (page, limit, sortField, sortOrder, filter) => {
  try {
    const offset = (page - 1) * limit;
    const sortOptions = {};
    if (sortField && sortOrder) {
      sortOptions[sortField] = sortOrder === 'asc' ? 1 : -1;
    }

    let query = UserEvent.find();

    if (filter && Object.keys(filter).length > 0) {
      if (filter.eventName) {
        query = query.where('eventName').equals(filter.eventName);
      }
      if (filter.userId) {
        query = query.where('userId').equals(filter.userId);
      }
      if (filter.action) {
        query = query.where('action').equals(filter.action);
      }
    }

    const events = await query.sort(sortOptions).skip(offset).limit(limit).exec();
    return events;
  } catch (error) {
    throw new Error('Cannot get the events from the database');
  }
};

const getTotalEventCount = async (filter) => {
  try {
      const count = await UserEvent.countDocuments(filter);
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