import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { subscribe, unsubscribe } from '../../slices/electricianSlice';

const ServicesList = () => {
    const electrician = useSelector(store => store.electrician.electrician);
    const [servicesList, setServicesList] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
      getServicesList();
    }, []);

    const getServicesList = async () => {
      try {
        const response = await fetch('http://localhost:5000/admin/services-list');
        const result = await response.json();
        setServicesList(result.services);
      } catch (error) {
        console.error('error in serviceslist', error);
      }
    };

    const subscribeService = async(electricianId, serviceId) => {
        try {
            const response = await fetch('http://localhost:5000/electrician/subscribe-service', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({electricianId, serviceId}),
            });
            const result = await response.json();
            console.log(result);
            if(result.status) {
                dispatch(subscribe({serviceId}));
                window.location.reload();
            }
        } catch (error) {
            console.error('error in subscribe: ', error);
        }
    };

    const unsubscribeService = async(electricianId, serviceId) => {
        try {
            const response = await fetch('http://localhost:5000/electrician/unsubscribe-service', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({electricianId, serviceId}),
            });
            const result = await response.json();
            console.log(result);
            if(result.status) {
                dispatch(unsubscribe({serviceId}));
                window.location.reload();
            }
        } catch (error) {
            console.error('error in unsubscribe: ', error);
        }
    };

  return (
    <>
      <div className="flex justify-center items-center w-4/5">
        <div className="m-2">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Services
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              You can subscribe to your desired services.
            </p>
          </div>
        </div>

       
      </div>

      <div className="flex justify-center">
        <div className="relative w-4/5  overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Sl.no.
                </th>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>

                <th scope="col" className="px-6 py-3">
                    Subscription
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Subscription-status</span>
                </th>
               
          
              </tr>
            </thead>
            
            <tbody>
              {
                servicesList?.map((service, index) => {
                  return (
                    <tr key={service._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">
                {index + 1}
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {service.title}
                </th>
                <td className="px-6 py-4">
                {service.price}
                </td>
                <td className="px-6 py-4">
                {service.description}
                </td>
                <td className="px-6 py-4">
                {electrician?.subscribedServices?.includes(service?._id) ? 'Yes' : 'No'}
                </td>

                <td className="px-6 py-4 text-right">
                    {
                    electrician?.subscribedServices?.includes(service?._id) ?
                    <Link onClick={() => unsubscribeService(electrician?._id, service?._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Unsubscribe</Link>
                    :
                    <Link onClick={() => subscribeService(electrician?._id, service?._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Subscribe</Link>                
                    }
                </td>
                
                {/* <td className="px-6 py-4 text-right">
                    <Link onClick={() => deleteElectrician(service._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</Link>
            
                </td> */}
            </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ServicesList;
