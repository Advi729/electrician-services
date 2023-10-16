import {
  useParams,
  useNavigate,
} from 'react-router-dom';
import manImage from '../../man.png';
import { useEffect, useState } from 'react';
import switchImg from '../../switch.webp';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedService, addSelectedSlot } from '../../slices/userSlice';
import { Button } from '@material-tailwind/react';

const ElectricianProfile = () => {
  const isLoggedIn = useSelector(store => store.user.isLoggedIn);
  const { id } = useParams();
  const [electricianDetails, setElectricianDetails] = useState();
  const [serviceDetails, setServiceDetails] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  // console.log('selected in render: ', selectedServices);
  // console.log('slotselected in render: ', selectedSlots);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    electricianInfo(id);
  }, [id]);

  const electricianInfo = async (id) => {
    try {
      const response = await fetch(
        'http://localhost:5000/electrician-profile/' + id
      );
      const result = await response.json();
      setElectricianDetails(result.electrician);
      if (result?.electrician) {

        fetchServiceInfo(result.electrician);
      }

      // console.log('elec: ', result.electrician);
      // console.log('elec3a: ', electricianDetails);
    } catch (error) {
      console.error('error in electricianInfo', error);
    }
  };

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

  const fetchServiceInfo = async (electricianDetails) => {
    if (
      electricianDetails?.subscribedServices &&
      electricianDetails?.subscribedServices.length > 0
    ) {
      const details = await Promise.all(
        electricianDetails?.subscribedServices?.map((serviceId) =>
          getServiceInfo(serviceId)
        )
      );
      console.log('fetched services: ', details);
      setServiceDetails(details);
    } else {
      console.log('No subscribed services found.');
      setServiceDetails([]);
    }
    console.log('serrrr', serviceDetails);
  };

  const handleServiceSelection = (e) => {
    const serviceId = e.target.value;

    if (selectedServices?.includes(serviceId)) {
      setSelectedServices((prevSelectedServices) =>
        prevSelectedServices.filter((id) => id !== serviceId)
      );
    } else {
      setSelectedServices((prevSelectedServices) => [
        ...prevSelectedServices,
        serviceId,
      ]);
    }
  };

  // select slots
  const handleSlotSelection = (e) => {
    const slotId = e.target.value;

    if (selectedSlots?.includes(slotId)) {
      setSelectedSlots((prevSelectedSlots) =>
        prevSelectedSlots.filter((id) => id !== slotId)
      );
    } else {
      setSelectedSlots((prevSelectedSlots) => [...prevSelectedSlots, slotId]);
    }
  };

  // handle booking
    const handleBooking = async (selectedServices, selectedSlots) => {
      try {
        const electricianId = electricianDetails._id;
        if(isLoggedIn) { 
          if (selectedServices.length !== 0 && selectedSlots.length !== 0) {
            dispatch(addSelectedService(selectedServices));
            dispatch(addSelectedSlot({selectedSlots, electricianId}));
            navigate('/checkout'); 
          }
        } else {
          navigate('/user-login');
        } 
      } catch (error) {
          console.error('error in handleBooking: ',error);
      }
  };

  // format date
  function formatDateIndianStandard(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }

  // format time
  function formatTimeIndianStandardWithAMPM(timeString) {
    let [hours, minutes] = timeString.split(':');
    let ampm = 'AM';

    // Convert hours to an integer
    const hoursInt = parseInt(hours, 10);

    // Check if it's afternoon (PM)
    if (hoursInt >= 12) {
      ampm = 'PM';

      // If it's after 12 PM, subtract 12 from hours to get 12-hour format
      if (hoursInt > 12) {
        hours = (hoursInt - 12).toString().padStart(2, '0');
      }
    }

    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return formattedTime;
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="w-8/12 card bg-green-50 ml-2 mr-2 shadow-xl">
          {electricianDetails?.image ? (
            <img
              src={`http://localhost:5000/photos/${electricianDetails?.image}`}
              alt="electrician"
            />
          ) : (
            <img src={manImage} alt="manImage" />
          )}
          <h2 className="pl-10">
            {electricianDetails?.firstname + ' ' + electricianDetails?.lastname}
          </h2>
          <h3 className="pl-2">contact: {electricianDetails?.phone}</h3>
          <h4 className="pl-2">rating:</h4>
          <h4 className="pl-2">location:</h4>
        </div>

        <div className="m-3 w-4/12">
          <div className="px-4 sm:px-0 flex justify-center">
            <h3 className="text-base font-semibold leading-10 text-gray-900">
              Services
            </h3>
          
          </div>
          <ul role="list" className="divide-y divide-gray-100">
            {serviceDetails?.map((service) => (
              <li
                key={service?._id}
                className="flex justify-start gap-x-6 py-5"
              >
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <label className="inline-flex items-center mt-1">
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-600"
                      value={service?._id}
                      onChange={(e) => handleServiceSelection(e)}
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Select Service
                    </span>
                  </label>
                </div>
                <div className="flex min-w-0 gap-x-4">
                  <img
                    className="h-16 w-16 flex-none rounded-full bg-gray-50"
                    src={switchImg}
                    alt=""
                  />
                  <div className="min-w-1 flex-auto">
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

      <div className="m-3 w-8/12">
        <div className="px-4 sm:px-0 flex justify-center">
          <h3 className="text-base font-semibold leading-10 text-gray-900">
            Time slots
          </h3>
        </div>
        <ul role="list" className="divide-y divide-gray-100">
          {electricianDetails?.slot?.map((slot) => (
            slot?.isDisabled === false &&
            <li
              key={slot?._id}
              className="flex justify-end w-8/12 gap-x-6 py-5"
            >
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <label className="inline-flex items-center mt-1">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-600"
                    value={slot?._id}
                    onChange={(e) => handleSlotSelection(e)}
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Select Slot
                  </span>
                </label>
              </div>
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {formatDateIndianStandard(slot?.date)}{' '}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {formatTimeIndianStandardWithAMPM(slot?.time)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="flex justify-end">
          
            <button
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => handleBooking(selectedServices, selectedSlots)}
            >
              Book now
            </button>
          
        </div>
      </div>
    </>
  );
};

export default ElectricianProfile;
