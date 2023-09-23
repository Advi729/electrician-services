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
      return {
        message: 'No electrician found with this email.'
      };
    }

    const passwordIsValid = bcrypt.compareSync(password, electrician.password);

    if (!passwordIsValid) {
      return {
        accessToken: null,
        message: 'Invalid Password.',
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

// Single electrician details
const singleElectrician = asyncHandler(async (id) => {
  try {
    const electrician = await Electrician.findById(id);
    if (electrician) {
      return electrician;
    }
  } catch (error) {
    console.error('error in singleElectrician', error);
  }
});

// upload electrician certificate to the database
const uploadCertificateToDb = asyncHandler(async (file, id) => {
  try {
    const electrician = await Electrician.findById(id);
    if (!electrician) {
        return ({ error: 'Electrician not found' });
      }
    
      const certificateUploaded = await Electrician.updateOne(
        { _id: id },
        { $set: { certificate: file.filename } }
      );
    // electrician?.subscribedServices?.push(serviceId);
    // const certificateUploaded = await electrician.save();
    if (certificateUploaded.nModified !== 0) {
        return true;
      }
      return false;
  } catch (error) {
    console.error('error in uploadCertificateToDb: ', error);
  }
});

// upload electrician certificate to the database
const uploadProfilePhotoToDb = asyncHandler(async (file, id) => {
  try {
    const electrician = await Electrician.findById(id);
    if (!electrician) {
        return ({ error: 'Electrician not found' });
      }
    
      const profilePhotoUploaded = await Electrician.updateOne(
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

module.exports = { 
  addElectrician, 
  findElectrician, 
  findAllElectricians, 
  deleteTheElectrician, 
  approveTheElectrician,
  disapproveTheElectrician,
  singleElectrician, 
  uploadCertificateToDb,
  uploadProfilePhotoToDb
};