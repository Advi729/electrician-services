const asyncHandler = require('express-async-handler');
const User = require('../models/user-model');
const Service = require('../models/service-model');
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

  // Add the service
const addTheService = asyncHandler(async (data) => {
  try {
    const service = new Service({
      title: data.title,
      description: data.description,
      price: data.price,
    });
    const serviceCreated = await service.save();
    console.log('user saved: ', service);
    if (serviceCreated) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('error in addtheservice helper',error);
  }
});

// Find all services
const findAllServices = asyncHandler(async () => {
  try {
      const allServices = await Service.find();
      console.log('allServices in helper: ', allServices);
      if(allServices) {
          return allServices;
      }
  } catch (error) {
      console.error('error in findallServices helper: ', error);
  }
});

  module.exports = { findAdmin, addTheService, findAllServices };