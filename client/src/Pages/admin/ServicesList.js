import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ServicesList = () => {
    const navigate = useNavigate();
    const [servicesList, setServicesList] = useState([]);

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
  return (
    <>
      <div class="flex justify-evenly items-center w-4/5">
        <div class="m-2">
          <div class="px-4 sm:px-0">
            <h3 class="text-base font-semibold leading-7 text-gray-900">
              Services
            </h3>
            <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              All services provided by the Electrician.
            </p>
          </div>
        </div>

        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => navigate('/admin/add-services')}
        >
          Add services
        </button>
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
