const asyncHandler = require('express-async-handler');
const userHelpers = require('../helpers/user-helper');

// User sign up
const userSignUp = asyncHandler(async(req, res) => {
    try {
        const user = await userHelpers.addUser(req.body);
        if (user) {
            res.json({status: true});
            console.log(user, 'usersrrsignup');
            // res.json(user);
        }
    } catch (error) {
        console.error(error);
    }
});

// User log in 
const userLogIn = asyncHandler(async(req, res) => {
    try {
        const user = await userHelpers.findUser(req.body);
        if (user) {
            res.json({status: true, user});
        }
    } catch (error) {
        console.error('error in login controller: ', error);
    }
});

// update profile image
const updateProfileImage = asyncHandler(async(req, res) => {
    try {
        console.log('in upload controller.');
        const uploaded = await userHelpers.uploadProfile(req);
        if(uploaded) {
            res.json({status: true});
        }
    } catch (error) {
        console.error('error in upload profile controller: ', error);
    }
});

// admin login 
const adminLogIn = asyncHandler(async(req, res) => {
    try {
        const admin = await userHelpers.findAdmin(req.body);
        if (admin) {
            res.json({status: true, admin});
        }
    } catch (error) {
        console.error('error in login controller: ', error);
    }
});

// list of all users
const usersList = asyncHandler(async (req, res) => {
    try {
        const users = await userHelpers.findAllUsers();
        console.log('users in findAllusers: ', users);
        if(users) {
            res.json({users});
        }
    } catch (error) {
        console.error('error in userslist ctrlller: ', error);
    }
});

// delete a user 
const deleteUser = asyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const deletedUser = await userHelpers.deleteTheUser(id);
        if (deletedUser) {
            res.json('user deleted.');
        }
    } catch (error) {
        console.error('error in deletesuer controler: ', error);
    }
});

// Block a user
const blockUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const blockedUser = await userHelpers.blockTheUser(id);
        if(blockedUser) {
            res.json('user blocked.');
        }
    } catch (error) {
        console.error('error in blockuser controller');
    }
});

// Un-Block a user
const unblockUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const unblockedUser = await userHelpers.unblockTheUser(id);
        if(unblockedUser) {
            res.json('user blocked.');
        }
    } catch (error) {
        console.error('error in blockuser controller');
    }
});

// upload profile photo of user
const userProfilePhoto = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        // Access the uploaded file using req.file
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }

      const savedToDb = await userHelpers.uploadProfilePhotoToDb(req.file, id);
     if (savedToDb) {
      res.status(200).json({ message: 'File uploaded successfully.', filename: req.file.filename});
     }
    } catch (error) {
        console.error('error in userPhoto', error);
    }
})

// add address
const addAddress = asyncHandler(async (req, res) =>{
    try {
        const data = req.body;
        const added = await userHelpers.addTheAddress(data);
        if (added) {
            res.json({status: true})
        }
    } catch (error) {
        console.error('error in addAddress ctrl', error);
    }
});

module.exports = { 
    userSignUp,
    userLogIn, 
    updateProfileImage, 
    adminLogIn, 
    usersList, 
    deleteUser,
    blockUser,
    unblockUser,
    userProfilePhoto,
    addAddress,
};