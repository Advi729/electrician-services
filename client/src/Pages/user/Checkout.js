import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeSelectedService,
  removeSelectedSlot,
} from '../../slices/userSlice';
import switchImg from '../../switch.webp';
import formatDateIndianStandard from '../../utils/formatDateIndianStandard';
import formatTimeIndianStandardWithAMPM from '../../utils/formatTimeIndianStandardWithAMPM';
import generateBookingId from '../../utils/generateBookingId';
import { useNavigate } from 'react-router-dom';
import { disableSlot } from '../../slices/electricianSlice';


const Checkout = () => {
  const user = useSelector(store => store.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedServices = useSelector(
    (state) => state.user.user.selectedServices
  );
  const selectedSlots = useSelector((state) => state.user.user.selectedSlots);
  const electricianBooked = useSelector(
    (state) => state.user.user.electricianBooked
  );
  const [services, setServices] = useState([]);
  // const [electricianData, setElectricianData] = useState();
  const [slotDetails, setSlotDetails] = useState([]);

  // console.log('services: ', services);
  // console.log('e booked: ', electricianBooked);
  console.log('slot: ', slotDetails[0]);

  useEffect(() => {
    fetchServiceInfo();
    electricianInfo(electricianBooked);
    // return () => {
    //     dispatch(removeSelectedService());
    //     dispatch(removeSelectedSlot())
    // };
  }, [electricianBooked]);

  const getServiceInfo = async (serviceId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/electrician/services/${serviceId}`
      );
      const result = await response.json();
      
      return result;
    } catch (error) {
      console.error('error in getserviceinfo', error);
    }
  };

  const fetchServiceInfo = async () => {
    const details = await Promise.all(
      selectedServices?.map((serviceId) => getServiceInfo(serviceId))
    );
      console.log('fetched services checkout: ', typeof(details));
    setServices(details);
  };

  // get slots from electrician details
  const electricianInfo = async (id) => {
    try {
      console.log('id: ', id);
      const response = await fetch(
        'http://localhost:5000/electrician-profile/' + id
      );
      const result = await response.json();
      const electricianData = result?.electrician;

      console.log('e data: ', electricianData);

      const slotData = electricianData?.slot?.filter((slot) =>
        selectedSlots?.includes(slot?._id)
      );
      setSlotDetails(slotData);

      // console.log('slot data data: ', slotData);
      // console.log('elec: ', result.electrician);
      // console.log('elec3a: ', electricianDetails);
    } catch (error) {
      console.error('error in electricianInfo', error);
    }
  };

  // total price
  let totalPrice = services?.reduce((total, service) => total + service?.price, 0);

    // handle booking payment
    const handleBookingPayment = async () => {
      try {
        const data = {
          services,
          slotDetails,
          totalPrice,
          userId: user?._id,
          electricianId: electricianBooked,
        }
        const bookingId = generateBookingId();
        const response = await fetch('http://localhost:5000/booking/' + bookingId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (result?.status) {
              dispatch(removeSelectedService());
              dispatch(removeSelectedSlot());
              dispatch(disableSlot(slotDetails[0]?._id));
              navigate('/bookings-list');
            }

      } catch (error) {
          console.error('error in handleBooking: ',error);
      }
  };

  return (
    <>
      <div className="flex justify-center items-center w-4/5">
        <div className="m-2">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Checkout
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Pricing and details of services booked.
            </p>
          </div>
        </div>
      </div>

    <div className='flex justify-center'>
      <div className="m-3 w-6/12">
        <div className="px-4 sm:px-0 flex justify-center">
          <h3 className="text-base font-semibold leading-10 text-gray-900">
            Selected Services
          </h3>
        </div>
        <div className="flex justify-center">
          <ul role="list" className="divide-y divide-gray-100">
            {services?.map((service) => (
              <li
                key={service?._id}
                className="flex justify-start gap-x-6 py-5"
              >
                <div className="flex min-w-0 gap-x-4">
                  <img
                    className="h-16 w-16 flex-none rounded-full bg-gray-50"
                    src={switchImg}
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {service?.title}{' '}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {service?.description}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      ₹ {service?.price}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="m-3 w-6/12">
        <div className="px-4 sm:px-0 flex justify-start">
          <h3 className="text-base font-semibold leading-10 text-gray-900">
            Time slot 
          </h3>
        </div>

        <div className="flex min-w-0 gap-x-4">
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {formatDateIndianStandard(slotDetails[0]?.date)}{' '}
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              {/* {formatTimeIndianStandardWithAMPM(slotDetails[0]?.time)} */}
              {slotDetails[0]?.time}
            </p>
          </div>
        </div>
      </div>
    </div>
<div className='flex justify-center'>
    <div className="m-3 w-6/12">
        <div className="px-4 sm:px-0 flex justify-center">
          <h3 className="text-base font-semibold leading-10 text-gray-900">
            Total Price : {'₹ ' + totalPrice}
          </h3>

          
        </div>

      </div>
      <div className="w-6/12">
          
            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => handleBookingPayment(selectedServices, selectedSlots)}
            >
              Book now
            </button>
          
        </div>
        </div>

      
    </>
  );
};

export default Checkout;


