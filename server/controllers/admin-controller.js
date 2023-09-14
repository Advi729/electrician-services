const asyncHandler = require('express-async-handler');
const userHelpers = require('../helpers/admin-helper');

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

module.exports = { adminLogIn, usersList, deleteUser };