const asyncHandler = require('express-async-handler');
const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Add user to db when sign up
const addUser = asyncHandler(async (data) => {
  try {
    // const userCreated = await User.create(data);
    const user = new User({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      phone: data.phone,
      password: bcrypt.hashSync(data.password, 8),
    });
    const userCreated = await user.save();
    console.log('user saved: ', user);
    if (userCreated) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
  }
});

// Check if user login
const findUser = asyncHandler(async (data) => {
  try {
    const { email, password } = data;
    // const userExist = await User.findOne({email});
    // if(userExist && userExist.password === password) {
    //     return true;
    // } else {
    //     return false;
    // }
    const user = await User.findOne({ email });

    if (!user) {
      return {
        message: 'No user found with this email.'
      };
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return {
        accessToken: null,
        message: 'Invalid Password.',
      };
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });
    // console.log('user in login: ', user);
    const userData = user._doc;

    return {
      ...userData,
      accessToken: token,
    };
  } catch (error) {
    console.error('error in login helper: ', error);
  }
});

// upload profile
const uploadProfile = asyncHandler(async (data) => {
  try {
    console.log('in upload helper.new::', data.formData);
    const { fileToUpload } = data;
    const { userId } = data;
    console.log('userid and file: ', fileToUpload, userId);
    // const user = await User.findByIdAndUpdate(
    //   id,
    //   { image },
    //   { new: true } // Return the updated user object
    // );
    // if (user) {
    //     return true;
    // }
  } catch (error) {
    console.error('error in upload image helper: ', error);
  }
});

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
})

// Block a user
const blockTheUser = asyncHandler(async (id) => {
  try {
    const blockedUser = await User.updateOne({_id: id},{$set:{isBlocked: true}});
    if(blockedUser) {
      return true;
    }
  } catch (error) {
    console.error('error in blocktheuser helper.', error);
  }
});

// Un-Block a user
const unblockTheUser = asyncHandler(async (id) => {
  try {
    const unblockedUser = await User.updateOne({_id: id},{$set:{isBlocked: false}});
    if(unblockedUser) {
      return true;
    }
  } catch (error) {
    console.error('error in unblocktheuser helper.', error);
  }
});

// upload user profile photo to the database
const uploadProfilePhotoToDb = asyncHandler(async (file, id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
        return ({ error: 'User not found' });
      }
    
      const profilePhotoUploaded = await User.updateOne(
        { _id: id },
        { $set: { image: file.filename } }
      );
   
    if (profilePhotoUploaded.nModified !== 0) {
        return true;
      }
      return false;
  } catch (error) {
    console.error('error in uploadProfileToDb: ', error);
  }
});


// Add address
const addTheAddress = asyncHandler(async (data) => {
  try {
    const { userId, address } = data;
    console.log('address: ', address);
    const addressAdded = await User.updateOne({_id: userId},
      {$push: {address}});
    if (addressAdded.nModified !== 0) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('error in addtheaddress helper.', error);
  }
});

module.exports = { 
  addUser, 
  findUser, 
  uploadProfile, 
  findAdmin, 
  findAllUsers, 
  deleteTheUser,
  blockTheUser, 
  unblockTheUser,
  uploadProfilePhotoToDb,
  addTheAddress,
};
