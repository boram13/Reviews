const { expect } = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose'); 
const UserEvent = require('../../../models/userEvent');
const eventService = require('../../../service/event');

const saveEvent = eventService.saveEvent;

describe('saveEvent function', () => {
    beforeAll(async () => {
      await mongoose.connect('mongodb+srv://Boraa:BoraMenerja@cluster0.srxilpa.mongodb.net/test');
    });
  
    afterAll(async () => {
      await mongoose.connection.close();
    });

      it('should save an event', async () => {
        const userId = new mongoose.Types.ObjectId();
        const eventName = 'test_event';
        const action = 'test_action';
    
        const savedEvent = await saveEvent(userId, eventName, action);
        expect(savedEvent.userId).to.deep.equal(userId);
        expect(savedEvent.eventName).to.equal(eventName);
        expect(savedEvent.action).to.equal(action);
      });
    
      it('should throw an error if failed to save event', async () => {
        spyOn(mongoose.Model.prototype, 'save').and.throwError('Test error');
    
        await expectAsync(saveEvent('user123', 'test_event', 'test_action')).toBeRejectedWithError(
          'Failed to save event: Test error'
        );
      });
    });