const mongoose = require('mongoose');
const User = require('./user-model');
const Electrician = require('./electrician-model');

// Declare the Order schema of the Mongo model
const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      // required: true,
      unique: true,
    },
    bookingAddress: {
      type: Object,
    //   required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    electricianId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'electrician',
      },
    services: {
      type: Object,
      required: true,
    },
    slotDetails: {
        type: Object,
        required: true,
      },
    paymentStatus: {
      type: String,
      default: 'pending',
    //   required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    grandTotalPrice: {
      type: Number,
    },
    couponPercentage: {
      type: Number,
      min: 0,
      max: 100,
    },
    bookingStatus: {
      type: String,
      default: 'booked',
      required: true,
    },
    paymentMethod: {
      type: String,
      default: 'COD',
      required: true,
    },
    cancelReason: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
