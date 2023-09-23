import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { uploadCertificate, uploadProfilePhoto } from "../../slices/electricianSlice";
import manImage from '../../man.png';

const Profile = () => {
    const electrician = useSelector(store => store.electrician.electrician);
    console.log('electrician profile: ', electrician);
    const [certificate, setCertificate] = useState([]);
    const [profilePhoto, setProfilePhoto] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // certificate upload
    const handleFileUpload = (file, id) => {

       // Check if a file is selected
      if (!file) {
        console.error('No file selected.');
        return;
      }
      // Create a FormData object to send the file to the backend
      const formData = new FormData();
      formData.append('pdfFile', file);
    
      // Create a request configuration object
      const requestOptions = {
        method: 'POST',
        body: formData,
      };
    
      // Send the FormData to the backend using the Fetch API
      fetch('http://localhost:5000/electrician/upload-certificate/'+id, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`File upload failed with status: ${response.status}`);
          }
          return response.json(); // Assuming the backend returns JSON
        })
        .then((data) => {
          // Handle the response from the backend
          console.log('File uploaded successfully:', data);
          dispatch(uploadCertificate(data.filename));
          navigate('/electrician/certificate');
        })
        .catch((error) => {
          // Handle any errors that occur during the upload
          console.error('Error uploading file:', error);
        });
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
     fetch('http://localhost:5000/electrician/upload-photo/'+id, requestOptions)
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
        <div className="m-5 mb-20">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Electrician Information</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and address.</p>
      </div>


      <div className="flex justify-start">
<div className="">
<div className="w-4/12 card bg-green-50 ml-2 mr-2 shadow-xl">
    {electrician?.image ? 
    <img src={`http://localhost:5000/photos/${electrician?.image}`} alt='profile' />
    : <img src={manImage} alt='electrician' />
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
      onClick={() => handleProfilePhotoUpload(profilePhoto, electrician._id)}
      className="mt-2 ml-11 flex w-20 justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      Upload
    </button>
  </div>

  </div>

   

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
            <dt className="text-sm font-medium leading-6 text-gray-900">Certificate</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <div>
              <div className="flex items-center justify-between">
                { electrician.certificate &&
                <label htmlFor="file" className="underline block text-sm font-medium leading-6 text-blue-900">
                  <Link to='/electrician/certificate'>Certificate</Link>
                </label>
                }
              </div>
              <div className="mt-2">
                <input
                  id="file"
                  name="file"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setCertificate(e.target.files[0])}
                  required
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                    focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6`}
                />
              </div>
            </div>
            <button
                type="button"
                onClick={() => handleFileUpload(certificate, electrician._id)}
                className="flex w-20 justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Upload
              </button>
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