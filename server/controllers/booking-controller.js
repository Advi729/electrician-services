const asyncHandler = require('express-async-handler');
const bookingHelpers = require('../helpers/booking-helper');
const electricianHelpers = require('../helpers/electrician-helper');

// book now
const bookNow = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
      const { services, slotDetails, totalPrice, userId, electricianId } = req.body;
      
      
        const created = await bookingHelpers.createBooking(
          id,
          services,
          totalPrice,
        //   grandTotalPrice,
        //   req.body,
          slotDetails,
        //   bookingAddress,
          userId,
          electricianId,
        //   coupon
        );
        
        if (created) { 
            const slotId = slotDetails[0]._id;
            const slotDisabled = await electricianHelpers.disableTheSlot(electricianId, slotId);
            if (slotDisabled) {
              res.json({ status: true });
            }
        }
        else {
        res.json({ status: false });
      }
    } catch (error) {
      console.error('error in booknow ctrller:',error);
    //   next(error);
    }
  });

  // bookings list
const bookingsList = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const bookings = await bookingHelpers.findAllBookings(id);
        console.log('bookings in findAllbookings: ', bookings);
        if(bookings) {
            res.json(bookings);
        }
    } catch (error) {
        console.error('error in bookingslist ctrlller: ', error);
    }
});

  module.exports = {
    bookNow,
    bookingsList,
};