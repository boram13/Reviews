const userService = require('../../../service/user');
const { getAllUsers, updateUser, deleteUser } = require('../../../controller/user');

describe('User Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      json: jasmine.createSpy('json')
    };
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockUsers = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
      spyOn(userService, 'getAllUsers').and.returnValue(mockUsers);

      await getAllUsers(req, res);

      expect(res.json).toHaveBeenCalledWith(mockUsers);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Internal Server Error';
      spyOn(userService, 'getAllUsers').and.throwError(errorMessage);

      await getAllUsers(req, res);

      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const userId = '123';
      const updatedUser = { id: userId, name: 'Updated User' };
      req.params = { userId };
      req.body = { name: 'Updated User' };
      spyOn(userService, 'updateUser').and.returnValue(updatedUser);

      await updateUser(req, res);

      expect(res.json).toHaveBeenCalledWith(updatedUser);
    });

    it('should handle errors', async () => {
      const errorMessage = 'User not found';
      const userId = '123';
      req.params = { userId };
      req.body = { name: 'Updated User' };
      spyOn(userService, 'updateUser').and.throwError(errorMessage);

      await updateUser(req, res);

      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const userId = '123';
      const deletedUser = { id: userId, name: 'Deleted User' };
      req.params = { userId };
      spyOn(userService, 'deleteUser').and.returnValue(deletedUser);

      await deleteUser(req, res);

      expect(res.json).toHaveBeenCalledWith(deletedUser);
    });

    it('should handle errors', async () => {
      const errorMessage = 'User not found';
      const userId = '123';
      req.params = { userId };
      spyOn(userService, 'deleteUser').and.throwError(errorMessage);

      await deleteUser(req, res);

      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});