const asyncHandler = require('express-async-handler');
const Booking = require('../models/booking-model');

// Create booking
const createBooking = asyncHandler(
    async (
      id,
      services,
      totalPrice,
      slotDetails,
    //   bookingAddress,
      userId,
      electricianId,
    //   coupon
    ) => {
      try {
        
       
        const newBooking = new Booking({
          bookingId: id,
          userId,
          electricianId,
        //   bookingAddress,
        //   paymentMethod: order.payment_option,
          services,
        //   orderStatus: status,
        //   paymentStatus: payStatus,
          totalPrice,
          slotDetails,
        //   grandTotalPrice,
        //   couponPercentage,
          cancelReason: null,
        });
        await newBooking.save();
  

  
        if (newBooking) {
          return true ;
        } 
        return false;
      } catch (error) {
        console.error('error in createbooking hlpr:',error);
        // throw error;
      }
    }
  );

  // Find all bookings
const findAllBookings= asyncHandler(async (id) => {
    try {
        console.log('id: ', id);
        const allBookings= await Booking.find({userId: id}).sort({ createdAt: -1 });
        console.log('allBookings in helper: ', allBookings);
        if(allBookings) {
            return allBookings;
        }
    } catch (error) {
        console.error('error in findallbookings helper: ', error);
    }
});


  module.exports = { 
    createBooking,
    findAllBookings,
 };
