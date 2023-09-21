const asyncHandler = require('express-async-handler');
const Electrician = require('../models/electrician-model');
const Service = require('../models/service-model');

const subcribetheService = asyncHandler(async (data) => {
    try {
        const { electricianId, serviceId } = data;

    const electrician = await Electrician.findById(electricianId);
    if (!electrician) {
        return ({ error: 'Electrician not found' });
      }

    // Check if the electrician is already subscribed to the service
    if (electrician?.subscribedServices?.includes(serviceId)) {
        return ({ error: 'Already subscribed to this service' });
      }

    const service = await Service.findById(serviceId);
    if (!service) {
        return ({ error: 'Service not found' });
      }
    
    const electricianSubscribed = await Electrician.updateOne(
        { _id: electricianId },
        { $push: { subscribedServices: serviceId } }
      );
    // electrician?.subscribedServices?.push(serviceId);
    // const electricianSubscribed = await electrician.save();
    if (electricianSubscribed.nModified !== 0) {
        return true;
      }
      return false;
    } catch (error) {
        console.error('error in subscribe helper', error);
    }
});

// unsubscribe the service
const unsubcribetheService = asyncHandler(async (data) => {
    try {
        const { electricianId, serviceId } = data;
        
    const electrician = await Electrician.findById(electricianId);
    if (!electrician) {
        return ({ error: 'Electrician not found' });
      }

    if (!electrician?.subscribedServices?.includes(serviceId)) {
        return ({ error: 'Not subscribed to this service' });
      }

    const service = await Service.findById(serviceId);
    if (!service) {
        return ({ error: 'Service not found' });
      }

      const electricianUnsubscribed = await Electrician.updateOne(
        { _id: electricianId },
        { $pull: { subscribedServices: serviceId } }
      );
    // electrician.subscribedServices = electrician?.subscribedServices?.filter((serviceId) => {
    //     serviceId.toString() !== serviceId;
    // });
    // const electricianUnsubscribed = await electrician.save();
    if (electricianUnsubscribed.nModified !== 0) {
        return true;
      }
      return false;
    } catch (error) {
        console.error('error in unsubscribe helper', error);
    }
});

// Find service details
const findService = asyncHandler(async (id) => {
  try {
      const serviceData = await Service.findById(id);
      console.log('serviceData in helper: ', serviceData);
      if(serviceData) {
          return serviceData;
      }
  } catch (error) {
      console.error('error in findService helper: ', error);
  }
});

module.exports = { subcribetheService, unsubcribetheService, findService };