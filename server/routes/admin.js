const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/admin-controller');
const userControllers = require('../controllers/user-controller');
const verifySignUp = require('../middlewares/verify-sign-up');
const authorization = require('../middlewares/auth-jwt');
const electricianControllers = require('../controllers/electrician-controller');


// Admin log in 
router.post('/login', adminControllers.adminLogIn);

// Users list admin-side
router.get('/users-list', userControllers.usersList);

// Electricians list admin-side
router.get('/electricians-list', electricianControllers.electriciansList);

// delete a user
router.get('/delete-user/:id', userControllers.deleteUser);

// delete an electrician
router.get('/delete-electrician/:id', electricianControllers.deleteElectrician);

// approve electrician
router.get('/approve-electrician/:id', electricianControllers.approveElectrician);

// disapprove electrician
router.get('/disapprove-electrician/:id', electricianControllers.disapproveElectrician);

// block a user
router.get('/block-user/:id', userControllers.blockUser);

// unblock a user
router.get('/unblock-user/:id', userControllers.unblockUser);

// // authorization
// router.get('/api/test/user', authorization.verifyToken, (req, res) => {
//   res.json('user logged in.');
// })

// router.get('/api/test/admin', authorization.verifyToken, authorization.isAdmin, (req, res) => {
//   res.json('admin logged in.');
// })

module.exports = router;
