import { useSelector } from "react-redux";

const Profile = () => {
    const electrician = useSelector(store => store.electrician.electrician);

    return (
        <div className="m-5">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Electrician Information</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and address.</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{electrician.firstname + ' ' + electrician.lastname}</dd>
          </div>
        
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{electrician.email}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Phone number</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{electrician.phone}</dd>
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
                <div className="ml-8 pb-4">
                    <a href="" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Add Address
                    </a>
                  </div>
              </ul>
            </dd>
            
          </div>

        </dl>
      </div>
    </div>
    );
};

export default Profile;