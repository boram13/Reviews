const User = require('../models/user');

exports.getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error('Could not fetch users');
  }
};

exports.updateUser = async (userId, newData) => {
    try {
      newData.updateDate = new Date();
      const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true });
      return updatedUser;
    } catch (error) {
      throw new Error('Could not update user');
    }
  };
  
exports.deleteUser = async (userId) => {
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      return deletedUser;
    } catch (error) {
      throw new Error('Could not delete user');
    }
  };
  
