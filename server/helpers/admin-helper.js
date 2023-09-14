const asyncHandler = require('express-async-handler');
const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// admin login
const findAdmin = asyncHandler(async (data) => {
    try {
      const { email, password } = data;
      const admin = await User.findOne({ email });
  
      if (!admin || admin.role !== 'admin') {
        return false;
      }
  
      const passwordIsValid = bcrypt.compareSync(password, admin.password);
  
      if (!passwordIsValid) {
        return {
          accessToken: null,
          message: 'Invalid Password!',
        };
      }
  
      const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, {
        expiresIn: 86400,
      });
      // console.log('admin in login: ', admin);
      const adminData = admin._doc;
  
      return {
        ...adminData,
        accessToken: token,
      };
    } catch (error) {
      console.error('error in login helper: ', error);
    }
  });
  
  // Find all users
  const findAllUsers = asyncHandler(async () => {
      try {
          const allUsers = await User.find({role: 'user'});
          console.log('allusers in helper: ', allUsers);
          if(allUsers) {
              return allUsers;
          }
      } catch (error) {
          console.error('error in findallusers helper: ', error);
      }
  });
  
  // Delete the user
  const deleteTheUser = asyncHandler(async (id) => {
      try {
          const deletedUser = await User.deleteOne({_id: id});
          if(deletedUser) {
              return true;
          }
      } catch (error) {
          console.error('error in deleteuser helper', error);
      }
  });

  module.exports = { findAdmin, findAllUsers, deleteTheUser };