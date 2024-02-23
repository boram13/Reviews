const User = require('../models/user');

describe('User Controller', () => {
  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockUsers = [{ _id: 'user1' }, { _id: 'user2' }];
      spyOn(User, 'find').and.returnValue(Promise.resolve(mockUsers));

      const result = await getAllUsers();

      expect(result).toEqual(mockUsers);
    });

    it('should throw an error if could not fetch users', async () => {
      spyOn(User, 'find').and.throwError('MongoDB connection error');

      await expectAsync(getAllUsers()).toBeRejectedWithError('Could not fetch users');
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const userId = 'user123';
      const newData = { name: 'John Doe' };
      const updatedUser = { _id: userId, ...newData, updateDate: new Date() };
      spyOn(User, 'findByIdAndUpdate').and.returnValue(Promise.resolve(updatedUser));

      const result = await updateUser(userId, newData);

      expect(result).toEqual(updatedUser);
    });

    it('should throw an error if could not update user', async () => {
      const userId = 'invalidUserId';
      const newData = { name: 'John Doe' };
      spyOn(User, 'findByIdAndUpdate').and.throwError('User update error');

      await expectAsync(updateUser(userId, newData)).toBeRejectedWithError('Could not update user');
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const userId = 'user123';
      spyOn(User, 'findByIdAndDelete').and.returnValue(Promise.resolve({ _id: userId }));

      const result = await deleteUser(userId);

      expect(result).toEqual({ _id: userId });
    });

    it('should throw an error if could not delete user', async () => {
      const userId = 'invalidUserId';
      spyOn(User, 'findByIdAndDelete').and.throwError('User delete error');

      await expectAsync(deleteUser(userId)).toBeRejectedWithError('Could not delete user');
    });
  });
});