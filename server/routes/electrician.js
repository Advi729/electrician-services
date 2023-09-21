const express = require('express');
const router = express.Router();
const verifySignUp = require('../middlewares/verify-sign-up');
const authorization = require('../middlewares/auth-jwt');
const electricianControllers = require('../controllers/electrician-controller');
const serviceControllers = require('../controllers/service-controller');

// electrician sign up
router.post('/signup', verifySignUp.checkDuplicateEmailElectrician, electricianControllers.electricianSignUp);

// electrician log in 
router.post('/login', electricianControllers.electricianLogIn);

// subscribe to service
router.post('/subscribe-service', serviceControllers.subscribeService);

// unsubscribe to service
router.post('/unsubscribe-service', serviceControllers.unsubscribeService);

// get service details
router.get('/services/:id', serviceControllers.servicesDetails);

module.exports = router;
