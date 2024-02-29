const UserEvent = require('../models/userEvent');

const saveEventInTheDatabase = async (req, res, next) => {
try{
    const { userId, eventName, eventDate, action } = req.body; //cfare me vjen nga requesta

    const event = new UserEvent({userId,eventName,eventDate,actionDescription});// cfare ruaj ne nje event

    const savedEvent = await event.save();

    req.savedEvent = savedEvent; //e ruaj tek requesta

    next();

}
catch{
    console.log('an error happened');

}
};
module.exports = saveEventInTheDatabase;