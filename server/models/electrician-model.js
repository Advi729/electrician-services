const mongoose = require('mongoose');
const Service = '../models/service-model';

const electricianSchema = new mongoose.Schema({
      firstname: {
        type: String,
        required: true,
      },
      lastname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phone: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        default: 'electrician',
        required: true,
      },
      isBlocked: {
        type: Boolean,
        default: false,
      },
      isApproved: {
        type: Boolean,
        default: false,
      },
      image: {
        type: String,
      },
      location: {
        type: {
          type: String,
          enum: ['Point'], // Specify the type as 'Point' for geospatial data
          default: 'Point',
        },
        coordinates: {
          type: [Number], // [longitude, latitude]
          index: '2dsphere', // Create a geospatial index for better querying
        },
      }, 
      address: {
        type: String,
      },
      subscribedServices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Service,
      },
    ]
});

electricianSchema.index({ location: '2dsphere' });
module.exports = mongoose.model('Electrician', electricianSchema);