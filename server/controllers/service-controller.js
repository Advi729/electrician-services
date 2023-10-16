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
            res.json(service);
        }
    } catch (error) {
        console.error('error in serviceslist ctrlller: ', error);
    }
});

// delete the service
const deleteService = asyncHandler(async (req, res) => {
    try {
        const {id} = req.params;
        const deleted = serviceHelpers.deleteTheService(id);
        if(deleted) {
            res.json('service deleted');
        }
    } catch (error) {
        console.error('error in deleteService ctrllr', error);
    }
});

const editService = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const editedService = await serviceHelpers.editTheService(req.body, id);
        if (editedService) {
            res.json({status: true});
            console.log(editedService,'service edited');
        }
    } catch (error) {
        console.error('error in addservice ctrller', error);
    }
})

module.exports = { 
    subscribeService, 
    unsubscribeService, 
    servicesDetails,
    deleteService,
    editService,
};