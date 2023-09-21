const asyncHandler = require('express-async-handler');
const adminHelpers = require('../helpers/admin-helper');

// admin login 
const adminLogIn = asyncHandler(async(req, res) => {
    try {
        const admin = await adminHelpers.findAdmin(req.body);
        if (admin) {
            res.json({status: true, admin});
        }
    } catch (error) {
        console.error('error in login controller: ', error);
    }
});


// Add services
const addService = asyncHandler(async (req, res) => {
    try {
        const addedService = await adminHelpers.addTheService(req.body);
        if (addedService) {
            res.json({status: true});
            console.log(addedService,'service added');
        }
    } catch (error) {
        console.error('error in addservice ctrller', error);
    }
})

// Services list
const servicesList = asyncHandler(async (req, res) => {
    try {
        const services = await adminHelpers.findAllServices();
        console.log('services in findAllservices: ', services);
        if(services) {
            res.json({services});
        }
    } catch (error) {
        console.error('error in serviceslist ctrlller: ', error);
    }
});

module.exports = { adminLogIn, addService, servicesList };