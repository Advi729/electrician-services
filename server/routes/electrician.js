const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/user-controller');
const verifySignUp = require('../middlewares/verify-sign-up');
const authorization = require('../middlewares/auth-jwt');
const electricianControllers = require('../controllers/electrician-controller');


// electrician sign up
router.post('/signup', verifySignUp.checkDuplicateEmailElectrician, electricianControllers.electricianSignUp);

// electrician log in 
router.post('/login', electricianControllers.electricianLogIn);


module.exports = router;
