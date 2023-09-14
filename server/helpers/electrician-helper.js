const asyncHandler = require('express-async-handler');
const Electrician = require('../models/electrician-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Add electrician to db when sign up
const addElectrician = asyncHandler(async (data) => {
  try {
    // const userCreated = await User.create(data);
    const electrician = new Electrician({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      phone: data.phone,
      password: bcrypt.hashSync(data.password, 8),
      location: {
        type: 'Point',
        coordinates: [data.longitude, data.latitude], // Replace with actual coordinates
      },
      address: data.address,
    });
    const electricianCreated = await electrician.save();
    console.log('electrician saved: ', electrician);
    if (electricianCreated) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
  }
});

// Check if electrician login
const findElectrician = asyncHandler(async (data) => {
  try {
    const { email, password } = data;
    // const userExist = await User.findOne({email});
    // if(userExist && userExist.password === password) {
    //     return true;
    // } else {
    //     return false;
    // }
    const electrician = await Electrician.findOne({ email });

    if (!electrician) {
      return false;
    }

    const passwordIsValid = bcrypt.compareSync(password, electrician.password);

    if (!passwordIsValid) {
      return {
        accessToken: null,
        message: 'Invalid Password!',
      };
    }

    const token = jwt.sign({ id: electrician.id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });
    // console.log('electrician in login: ', electrician);
    const electricianData = electrician._doc;

    return {
      ...electricianData,
      accessToken: token,
    };
  } catch (error) {
    console.error('error in login helper: ', error);
  }
});

// Find all electricians
const findAllElectricians = asyncHandler(async () => {
    try {
        const allElectricians = await Electrician.find({role: 'electrician'});
        console.log('allElectricians in helper: ', allElectricians);
        if(allElectricians) {
            return allElectricians;
        }
    } catch (error) {
        console.error('error in findallElectricians helper: ', error);
    }
});
// Delete the electrician
const deleteTheElectrician = asyncHandler(async (id) => {
  try {
      const deletedElectrician = await Electrician.deleteOne({_id: id});
      if(deletedElectrician) {
          return true;
      }
  } catch (error) {
      console.error('error in deleteElectrician helper', error);
  }
})

// Approve the electrician
const approveTheElectrician = asyncHandler(async (id) => {
  try {
    const approvedElectrician = await Electrician.updateOne({_id: id},{$set:{isApproved: true}});
    if(approvedElectrician) {
      return true;
    }
  } catch (error) {
    console.error('error in approve helper.', error);
  }
});

// Disapprove the electrician
const disapproveTheElectrician = asyncHandler(async (id) => {
  try {
    const disapprovedElectrician = await Electrician.updateOne({_id: id},{$set:{isApproved: false}});
    if(disapprovedElectrician) {
      return true;
    }
  } catch (error) {
    console.error('error in disapprove helper.', error);
  }
});

module.exports = { 
  addElectrician, 
  findElectrician, 
  findAllElectricians, 
  deleteTheElectrician, 
  approveTheElectrician,
  disapproveTheElectrician
};