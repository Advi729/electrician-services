import React, { useState } from 'react';

const AddressModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    locality: '',
    area: '',
    district: '',
    state: '',
    pincode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    setFormData({
      locality: '',
      area: '',
      district: '',
      state: '',
      pincode: '',
    });
    onClose();
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label
                htmlFor="locality"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Locality
              </label>
              <div className="mt-2 w-1/3">
                <input
                  id="locality"
                  name="locality"
                  type="text"
                  autoComplete="locality"
                  required
                  value={formData.locality}
                  onChange={handleChange}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ${
                    1 === 2
                      ? 'ring-1 ring-inset ring-red-600'
                      : 'ring-1 ring-inset ring-gray-300 placeholder:text-gray-400'
                  } focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6 
                            `}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="area"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Area
              </label>
              <div className="mt-2 w-1/3">
                <input
                  id="area"
                  name="area"
                  type="text"
                  autoComplete="area"
                  required
                  value={formData.area}
                  onChange={handleChange}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ${
                    1 === 2
                      ? 'ring-1 ring-inset ring-red-600'
                      : 'ring-1 ring-inset ring-gray-300 placeholder:text-gray-400'
                  } focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6 
                            `}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="District"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                District
              </label>
              <div className="mt-2 w-1/3">
                <input
                  id="district"
                  name="district"
                  type="text"
                  autoComplete="district"
                  required
                  value={formData.district}
                  onChange={handleChange}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ${
                    1 === 2
                      ? 'ring-1 ring-inset ring-red-600'
                      : 'ring-1 ring-inset ring-gray-300 placeholder:text-gray-400'
                  } focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6 
                            `}
                />
              </div>
            </div>
            
            <div className="form-group">
              <label
                htmlFor="state"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                State
              </label>
              <div className="mt-2 w-1/3">
                <input
                  id="state"
                  name="state"
                  type="text"
                  autoComplete="state"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ${
                    1 === 2
                      ? 'ring-1 ring-inset ring-red-600'
                      : 'ring-1 ring-inset ring-gray-300 placeholder:text-gray-400'
                  } focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6 
                            `}
                />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="pincode"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Pin number
              </label>
              <div className="mt-2 w-1/3">
                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  autoComplete="pincode"
                  required
                  value={formData.pincode}
                  onChange={handleChange}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ${
                    1 === 2
                      ? 'ring-1 ring-inset ring-red-600'
                      : 'ring-1 ring-inset ring-gray-300 placeholder:text-gray-400'
                  } focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6 
                            `}
                />
              </div>
            </div>
            
            <button
                  type="submit"
                  
                  className="w-32 mt-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit
                </button>
          </form>
          <button
                  type="submit"
                  onClick={onClose}
                  className="w-32 mt-2 rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Cancel
                </button>
        </div>
      </div>
    )
  );
};

export default AddressModal;
