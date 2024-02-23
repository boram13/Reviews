const userService = require('../../../service/user');
const User = require('../../../models/user');

describe('User Service', () => {
  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockUsers = [{ name: 'Bora' }, { name: 'Nina' }];
      spyOn(User, 'find').and.returnValue(mockUsers);

      const result = await userService.getAllUsers();

      expect(User.find).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });

    it('should throw an error if users cannot be fetched', async () => {
      spyOn(User, 'find').and.throwError('Database error');

      try {
        await userService.getAllUsers();
      } catch (error) {
        expect(error.message).toEqual('Could not fetch users');
      }
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const mockUser = { _id: 'user123', name: 'Boras' };
      const newData = { name: 'Borana' };
      spyOn(User, 'findByIdAndUpdate').and.returnValue(mockUser);

      const result = await userService.updateUser('user123', newData);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith('user123', newData, { new: true });
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if user update fails', async () => {
      const newData = { name: 'Borana' };
      spyOn(User, 'findByIdAndUpdate').and.throwError('Database error');

      try {
        await userService.updateUser('user123', newData);
      } catch (error) {
        expect(error.message).toEqual('Could not update user');
      }
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const mockUser = { _id: 'user123', name: 'Boras' };
      spyOn(User, 'findByIdAndDelete').and.returnValue(mockUser);

      const result = await userService.deleteUser('user123');

      expect(User.findByIdAndDelete).toHaveBeenCalledWith('user123');
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if user deletion fails', async () => {
      spyOn(User, 'findByIdAndDelete').and.throwError('Database error');

      try {
        await userService.deleteUser('user123');
      } catch (error) {
        expect(error.message).toEqual('Could not delete user');
      }
    });
  });
});