import { Link, useParams } from "react-router-dom";
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

    const approveElectrician = async(id) => {
        try {
            const response = await fetch('http://localhost:5000/admin/approve-electrician/'+id);
            const result = await response.json();
            console.log(result);
            if(result) {
                window.location.reload();
            }
        } catch (error) {
            console.error('error in approvelectrician: ', error);
        }
    };

    const disapproveElectrician = async(id) => {
        try {
            const response = await fetch('http://localhost:5000/admin/disapprove-electrician/'+id);
            const result = await response.json();
            console.log(result);
            if(result) {
                window.location.reload();
            }
        } catch (error) {
            console.error('error in disapprovelectrician: ', error);
        }
    };


    return (
        <>

    <div className="m-5 mb-20">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Electrician Information</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and address.</p>
      </div>

      <div className="flex justify-start">
<div className="">
<div className="w-4/12 card bg-green-50 ml-2 mr-2 shadow-xl">
  { electricianDetails?.image ?
    <img src={`http://localhost:5000/photos/${electricianDetails?.image}`} alt='electrician' />
    : <img src={manImage} alt='manImage' />
  }
    <h2 className='pl-10'>{electricianDetails?.firstname+' '+electricianDetails?.lastname}</h2>
    <h3 className='pl-2'>contact: {electricianDetails?.phone}</h3>
    <h4 className='pl-2'>rating:</h4>
    <h4 className='pl-2'>location:</h4>
  </div>
{
    electricianDetails?.isApproved ?
    <button onClick={() => disapproveElectrician(electricianDetails._id)} className="mt-2 ml-11 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Disapprove</button>
    :
    <button onClick={() => approveElectrician(electricianDetails._id)} className="mt-2 ml-11 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Approve</button>                
    }
  </div>

    <div className="m-3 w-8/12">
    <div className="px-4 sm:px-0 flex justify-center">
        <h3 className="text-base font-semibold leading-10 text-gray-900">Services subscribed</h3>
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
          
          </div>
        </li>
      ))
      }
    </ul>
    </div>

    </div>

      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{electricianDetails?.firstname + ' ' + electricianDetails?.lastname}</dd>
          </div>
        
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{electricianDetails?.email}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Phone number</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{electricianDetails?.phone}</dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Approval Status</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{electricianDetails?.isApproved ? 'Yes' : 'No'}</dd>
          </div>
    
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Certificate</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div>
              <div className="flex items-center justify-between">
                { electricianDetails?.certificate ?
                <label htmlFor="file" className="underline block text-sm font-medium leading-6 text-blue-900">
                  <Link to={`/admin/electrician-certificate/`+electricianDetails?._id}>{electricianDetails?.certificate}</Link>
                </label>
                : 'Not uploaded'
                }
              </div>
              
            </div>
            
            </dd>
          </div>
      
          
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="w-0 items-center">
                    <div className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    {/* <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                      <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                    </div> */}
                    <div className="ml-4">
                      <span className="truncate font-medium">Address 1</span>
                    </div>
                    <div className="ml-5">
                      <span className="truncate font-medium">Locality</span>
                    </div>
                    <div className="ml-5">
                      <span className="truncate font-medium">Area</span>
                    </div>
                    <div className="ml-5">
                      <span className="truncate font-medium">District</span>
                    </div>
                    <div className="ml-5">
                      <span className="truncate font-medium">State</span>
                    </div>
                    <div className="ml-5">
                      <span className="truncate font-medium">Pin number</span>
                    </div>
                  </div>
                  
                </li>
                
              </ul>
            </dd>
            
          </div>

        </dl>
      </div>


    </div>
        </>
    );
};

export default ElectricianProfile;