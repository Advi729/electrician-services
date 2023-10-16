import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import formatDateIndianStandard from '../../utils/formatDateIndianStandard';

const Bookings = () => {
  const user = useSelector((store) => store.user.user);
  const [bookingsList, setBookingsList] = useState([]);
  const [electricianNames, setElectricianNames] = useState([]);
  console.log('elenamesss: ', electricianNames);

  useEffect(() => {
    getAllBookings();
    fetchElectricianNames();
      
  }, []);

  const getAllBookings = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/bookings-list/' + user?._id
      );
      const result = await response.json();
      console.log('all bookings:', result);
      setBookingsList(result);
    } catch (error) {
      console.error('error in getallbookings: ', error);
    }
  };

  // Fetch electrician names and store them in an array
  const fetchElectricianNames = async () => {
    const electricianNames = [];
    console.log('fetchename: ', bookingsList);

    for (const booking of bookingsList) {
      try {
        const response = await fetch(
          'http://localhost:5000/electrician-profile/' + booking.electricianId
        );
        console.log('booking.elecId: ', booking.electricianId);
        const result = await response.json();
        const fullname =
          result?.electrician?.firstname + ' ' + result?.electrician?.lastname;
console.log('name:', fullname);
        electricianNames.push(fullname);   
      } catch (error) {
        console.error('Error in electricianinfo: ', error);
        // electricianNames.push('Unknown'); // Handle the error gracefully
      }
    }
        setElectricianNames(electricianNames);
    // return electricianNames;
  };

  return (
    <>
      <div className="ml-7 min-w-0 flex justify-center">
        <h3 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Bookings list
        </h3>
      </div>

      <div className="flex justify-center mt-5">
        <div className="relative w-4/5  overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Sl.no.
                </th>
                <th scope="col" className="px-6 py-3">
                  Booking Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Electrician name
                </th>
                <th scope="col" className="px-6 py-3">
                  Time slot
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Payment Method
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Cancel-status</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {bookingsList?.map((booking, index) => {
                return (
                  <tr
                    key={booking?._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {booking?.bookingId}
                    </th>
                    <td className="px-6 py-4">{electricianNames[index]}</td>
                    <td className="px-6 py-4">
                      {formatDateIndianStandard(booking?.slotDetails[0]?.date)}
                    </td>
                    <td className="px-6 py-4">{booking?.bookingStatus}</td>
                    <td className="px-6 py-4">{booking?.paymentStatus}</td>
                    <td className="px-6 py-4">{booking?.paymentMethod}</td>
                    <td className="px-6 py-4">{'₹ ' + booking?.totalPrice}</td>
                    <td className="px-6 py-4 text-right">
                      {booking?.bookingStatus === 'booked' && (
                        <Link className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                          Cancel
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Bookings;
