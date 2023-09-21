import { useParams } from "react-router-dom";
import manImage from '../../man.png';
import { useEffect, useState } from "react";
import switchImg from '../../switch.webp';

const ElectricianProfile = () => {
    const { id } = useParams();
    const [electricianDetails, setElectricianDetails] = useState();
    const [serviceDetails, setServiceDetails] = useState([]);

    useEffect(() => {
        electricianInfo(id);
    }, [id]);

    const electricianInfo = async (id) => {
        try {
            const response = await fetch('http://localhost:5000/electrician-profile/' +id);
            const result = await response.json();
            setElectricianDetails(result.electrician);
            if(result?.electrician) {
            console.log('elec2: ', electricianDetails);

                fetchServiceInfo(result.electrician);
            }

            console.log('elec: ', result.electrician);
            console.log('elec3a: ', electricianDetails);

        } catch (error) {
            console.error('error in electricianInfo', error);
        }
    };

    const getServiceInfo = async (serviceId) => {
        try {
            const response = await fetch(`http://localhost:5000/electrician/services/${serviceId}`);
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('error in getserviceinfo', error);
        }
    };

    const fetchServiceInfo = async (electricianDetails) => {
        if (electricianDetails?.subscribedServices && electricianDetails?.subscribedServices.length > 0) {
        const details = await Promise.all(
            electricianDetails?.subscribedServices?.map((serviceId) => getServiceInfo(serviceId))
        );
        console.log('fetched services: ', details);
        setServiceDetails(details);
        }  else {
            console.log('No subscribed services found.');
            setServiceDetails([]);
        }
        console.log('serrrr', serviceDetails);
    }

    return (
        <>
<div className="flex justify-center">

<div className="w-4/12 card bg-green-50 ml-2 mr-2 shadow-xl">
    <img src={manImage} alt='electrician' />
    <h2 className='pl-10'>{electricianDetails?.firstname+' '+electricianDetails?.lastname}</h2>
    <h3 className='pl-2'>contact: {electricianDetails?.phone}</h3>
    <h4 className='pl-2'>rating:</h4>
    <h4 className='pl-2'>location:</h4>
  </div>

    <div className="m-3 w-8/12">
    <div className="px-4 sm:px-0 flex justify-center">
        <h3 className="text-base font-semibold leading-10 text-gray-900">Services</h3>
      </div>
    <ul role="list" className="divide-y divide-gray-100">
      {
      serviceDetails?.map((service) => (
        <li key={service?.service?.id} className="flex justify-evenly gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img className="h-16 w-16 flex-none rounded-full bg-gray-50" src={switchImg} alt="" />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">{service?.service?.title} </p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">{service?.service?.description}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">₹ {service?.service?.price}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        
        >
          Add to cart
        </button>
          </div>
        </li>
      ))
      }
    </ul>
    </div>

    </div>
        </>
    );
};

export default ElectricianProfile;