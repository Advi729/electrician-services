import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSlotToSlice, deleteSlotFromSlice } from '../../slices/electricianSlice';
import { Link } from 'react-router-dom';

function TimeSlot() {
  const electrician = useSelector(store => store.electrician.electrician);
  const [newSlot, setNewSlot] = useState({ date: '', time: '' });
  const dispatch = useDispatch();

  // add slot
  const addSlot = async () => {
    try {
    const response = await fetch('http://localhost:5000/electrician/add-slot/'+electrician._id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSlot),
    });
    const result = await response.json();
    console.log(result.status);
    if(result.status) {
      dispatch(addSlotToSlice(newSlot))
        window.location.reload();
    }
    } catch (error) {
      console.error('Error adding slot:', error);
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

  // delete slot
  const deleteSlot = async(id) => {
    try {
        const data = {
          electricianId: electrician._id,
          slotId: id,
        }
        const response = await fetch('http://localhost:5000/electrician/delete-slot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
        const result = await response.json();
        if(result.status) {
            dispatch(deleteSlotFromSlice(id));
            window.location.reload();
        }
    } catch (error) {
        console.error('error in deleteuser: ', error);
    }
};

  return (
    <>
      <div className="flex justify-center items-center w-4/5">
        <div className="m-2">
          <div className="px-4 sm:px-0">
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              Slots
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
              Time slots you are available to provide service.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-4/12">

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Date
                </label>
                <div className="mt-2">
                  <input
                    id="date"
                    name="date"
                    type="date"
                    autoComplete="date"
                    required
                    value={newSlot.date}
                    onChange={(e) =>
                      setNewSlot({ ...newSlot, date: e.target.value })
                    }
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ${
                      1 === 2
                        ? 'ring-1 ring-inset ring-red-600'
                        : 'ring-1 ring-inset ring-gray-300 placeholder:text-gray-400'
                    } focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6 
                            `}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="time"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Time
                </label>
                <div className="mt-2">
                  <input
                    id="time"
                    name="time"
                    type="time"
                    autoComplete="time"
                    required
                    value={newSlot.time}
                    onChange={(e) =>
                      setNewSlot({ ...newSlot, time: e.target.value })
                    }
                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ${
                      1 === 2
                        ? 'ring-1 ring-inset ring-red-600'
                        : 'ring-1 ring-inset ring-gray-300 placeholder:text-gray-400'
                    } focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-sm sm:leading-6 
                            `}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  onClick={() => addSlot()}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add slot
                </button>
                <div className="mt-2">
                  <p id="login-error" className="text-red-600"></p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="m-3 w-8/12">
          <div className="flex justify-center">
            <div className="relative w-4/5  overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Sl.no.
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Booked Status
                    </th>
                            
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {electrician?.slot?.map((slot, index) => {
                    return (
                      <tr
                        key={slot?._id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="px-6 py-4">{index + 1}</td>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {formatDateIndianStandard(slot?.date)}
                        </th>
                        <td className="px-6 py-4">{slot?.time}</td>
                        <td className="px-6 py-4">{slot?.isDisabled ? 'Booked' : 'Not booked'}</td> 
                        <td className="px-6 py-4 text-right">
                    <Link onClick={() => deleteSlot(slot._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</Link>
            
                </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TimeSlot;
