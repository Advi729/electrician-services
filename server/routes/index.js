const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user-controller');
const verifySignUp = require('../middlewares/verify-sign-up');
const authorization = require('../middlewares/auth-jwt');
const electricianControllers = require('../controllers/electrician-controller');
const uploadProfilePhotoMiddleware = require('../middlewares/upload-profile-photo');
const bookingControllers = require('../controllers/booking-controller');


// User sign up
router.post('/signup', verifySignUp.checkDuplicateEmail, userControllers.userSignUp);

// User log in 
router.post('/login', userControllers.userLogIn);

// Electricians list user-side
router.get('/electricians-list', electricianControllers.electriciansListUser);

// Details of single electrician
router.get('/electrician-profile/:id', electricianControllers.electricianDetails);

// upload profile photo
router.post('/upload-photo/:id', uploadProfilePhotoMiddleware.uploadProfilePhoto, userControllers.userProfilePhoto);

// add address
router.post('/add-address', userControllers.addAddress);

// book now
router.post('/booking/:id', bookingControllers.bookNow);

// bookings list
router.get('/bookings-list/:id', bookingControllers.bookingsList);







// // Admin log in 
// router.post('/api/auth/admin-login', userControllers.adminLogIn);

// // delete a user
// router.get('/api/admin/delete-user/:id', userControllers.deleteUser);
// // authorization
// router.get('/api/test/user', authorization.verifyToken, (req, res) => {
//   res.json('user logged in.');
// })

// router.get('/api/test/admin', authorization.verifyToken, authorization.isAdmin, (req, res) => {
//   res.json('admin logged in.');
// })

module.exports = router;
