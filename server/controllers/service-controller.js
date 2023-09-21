const asyncHandler = require('express-async-handler');
const serviceHelpers = require('../helpers/service-helper');

// subscribe the service
const subscribeService = asyncHandler(async (req, res) => {
    try {
        const subscribed = serviceHelpers.subcribetheService(req.body);
        if(subscribed) {
            res.json({status: true})
        }
    } catch (error) {
        console.error('error in subscribe ctrller', error);
    }
});

// unsubscribe the service
const unsubscribeService = asyncHandler(async (req, res) => {
    try {
        const unsubscribed = serviceHelpers.unsubcribetheService(req.body);
        if(unsubscribed) {
            res.json({status: true})
        }
    } catch (error) {
        console.error('error in unsubscribe ctrller', error);
    }
});

// Single Service details
const servicesDetails = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const service = await serviceHelpers.findService(id);
        console.log('services in findservices: ', service);
        if(service) {
            res.json({service});
        }
    } catch (error) {
        console.error('error in serviceslist ctrlller: ', error);
    }
});

module.exports = { subscribeService, unsubscribeService, servicesDetails };