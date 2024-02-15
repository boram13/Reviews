const { expect } = require('chai');
const sinon = require('sinon');
const userService = require('../service/user');

describe('UserService', () => {
  describe('getAllUsers', () => {
    it('should return all users', async () => {
      // Stub the getAllUsers method of userService
      const getAllUsersStub = sinon.stub(userService, 'getAllUsers').resolves([
        { id: '1', name: 'User 1' },
        { id: '2', name: 'User 2' }
      ]);

      const result = await userService.getAllUsers();

      expect(result).to.have.lengthOf(2);
      expect(result[0]).to.deep.equal({ id: '1', name: 'User 1' });
      expect(result[1]).to.deep.equal({ id: '2', name: 'User 2' });
      expect(getAllUsersStub.calledOnce).to.be.true;

      getAllUsersStub.restore();
    });
  });
 
});