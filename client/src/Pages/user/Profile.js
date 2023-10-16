import { useDispatch, useSelector } from "react-redux";
import { addAddressToSlice, uploadProfilePhoto } from "../../slices/userSlice";
import manImage from '../../man.png';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddressModal from "../../Components/AddressModal/AddressModal";


const Profile = () => {
    const user = useSelector(store => store.user.user);
    const [profilePhoto, setProfilePhoto] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleAddAddress = async(newAddress) => {
      const data = {
        userId: user._id,
        address: newAddress,
      }
      const response = await fetch('http://localhost:5000/add-address', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
const result = await response.json();
if(result.status) {
    dispatch(addAddressToSlice(newAddress));
    window.location.reload();
}
    };
    
    // profile photo upload
    const handleProfilePhotoUpload = (file, id) => {

      // Check if a file is selected
     if (!file) {
       console.error('No file selected.');
       return;
     }
     // Create a FormData object to send the file to the backend
     const formData = new FormData();
     formData.append('profilePhoto', file);
   
     // Create a request configuration object
     const requestOptions = {
       method: 'POST',
       body: formData,
     };
   
     // Send the FormData to the backend using the Fetch API
     fetch('http://localhost:5000/upload-photo/'+id, requestOptions)
       .then((response) => {
         if (!response.ok) {
           throw new Error(`File upload failed with status: ${response.status}`);
         }
         return response.json(); // Assuming the backend returns JSON
       })
       .then((data) => {
         // Handle the response from the backend
         console.log('File uploaded successfully:', data);
         dispatch(uploadProfilePhoto(data.filename));
         window.location.reload();
       })
       .catch((error) => {
         // Handle any errors that occur during the upload
         console.error('Error uploading file:', error);
       });
   };
    

    return (
        <div className="m-5">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">User Information</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and address.</p>
      </div>

      <div className="flex justify-start">
      <div className="">
      <div className="w-4/12 card bg-green-50 ml-2 mr-2 shadow-xl">
    {user?.image ? 
    <img src={`http://localhost:5000/photos/${user?.image}`} alt='profile' />
    : <img src={manImage} alt='user' />
    }
    <input
      id="profilePhoto"
      name="profilePhoto"
      type="file"
      accept=".jpg, .jpeg, .png, .webp"
      onChange={(e) => setProfilePhoto(e.target.files[0])}
      required
      className={`block w-full mt-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
        focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6`}
    />
    <button
      type="button"
      onClick={() => handleProfilePhotoUpload(profilePhoto, user._id)}
      className="mt-2 ml-11 flex w-20 justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      Upload
    </button>
  </div>

  </div>

   

    </div>

      <div className="mt-6 mb-11 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.firstname + ' ' + user.lastname}</dd>
          </div>
        
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.email}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Phone number</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.phone}</dd>
          </div>
          
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Address</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">

              {user?.address?.map((address, index) => (
                <li key={index} className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="w-0 items-center">
                    <div className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    
                    <div className="underline ml-4">
                      <span className="truncate font-medium">Address {index + 1}</span>
                    </div>
                    <div className="ml-5">
                      <span className="truncate font-medium">Locality: {address.locality}</span>
                    </div>
                    <div className="ml-5">
                      <span className="truncate font-medium">Area: {address.area}</span>
                    </div>
                    <div className="ml-5">
                      <span className="truncate font-medium">District: {address.district}</span>
                    </div>
                    <div className="ml-5">
                      <span className="truncate font-medium">State: {address.state}</span>
                    </div>
                    <div className="ml-5">
                      <span className="truncate font-medium">Pin number: {address.pincode}</span>
                    </div>
                  </div>
                  
                </li>
              ))}
                <div className="ml-6 pb-4">
                    <button onClick={() => setIsModalOpen(true)} className="font-medium text-indigo-600 hover:text-indigo-500">
                      Add Address
                    </button>
                    <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddAddress}
      />
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