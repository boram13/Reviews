const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    eventName: {
      type: String,
      required: true
    },
    eventDate: {
      type: Date,
      required: true
    },
    action: {
      type: String,
      required: true
    }
  }, { timestamps: true });
 
  const UserEvent = mongoose.model('Event', eventSchema);
  
  module.exports = UserEvent;