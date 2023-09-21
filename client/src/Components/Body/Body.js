import './Body.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../../hero.jpg'
import filterElectriciansList from '../../utils/filterElectriciansList';
import ElectricianCard from '../ElectricianCard/ElectricianCard';

const Body = () => {
    const [searchText, setSearchText] = useState('');
    const [electriciansList, setElectriciansList] = useState([]);
    const [filteredElectriciansList, setFilteredElectriciansList] = useState([]);
    useEffect(() => {
        getAllElectricians();
    }, []);
    const getAllElectricians = async () => {
        try {
            const response = await fetch('http://localhost:5000/electricians-list');
            const result = await response.json();
            console.log('result in electriciansslist', result);
            setElectriciansList(result.approvedElectricians);
            setFilteredElectriciansList(result.approvedElectricians);
        } catch (error) {
            console.error('error in login: ',error);
        }
    }

    if (!electriciansList) return null;

  return (
    <>
    <section
      class="bg-white dark:bg-gray-900"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
          We make your life easier.
        </h1>
        <p class="mb-8 text-lg font-normal text-teal-900 lg:text-xl sm:px-16 xl:px-48">
          Here at electrify we focus on providing the best quality services near
          you.
        </p>
        {/* <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4"> */}
        <div class="flex justify-center items-center">
          <div class="pl-3">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-full p-4 pl-10 pr-20 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Electrician"
                value={searchText}
                onChange={(e) => {setSearchText(e.target.value)}}
              />
              <button
                class="text-white absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                    const updatedData = filterElectriciansList(searchText, electriciansList);
                    setFilteredElectriciansList(updatedData);
                }}
              >
                Search
              </button>
            </div>
          </div>
          <div class="pl-3">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-full p-4 pl-10 pr-20 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Services"
                required
              />
              <button
                type="submit"
                class="text-white absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div>
      
      <h2 className='mt-3 ml-7 font-semibold text-xl'>Electricians near you</h2>
      <div className="electricians-list ml-5 pb-20 pt-3 flex justify-self-center">
        {
            
          // If no electricians found
          filteredElectriciansList?.length === 0 ? (
            <h1>No electricians found!!</h1>
          ) : (
            filteredElectriciansList?.map((electrician) => {
              return (
                <Link to={'/electrician-profile/' + electrician._id} key={electrician._id} className="link-style"><ElectricianCard {...electrician} /></Link>             
              )
            })
          )
        }
      </div>
    </div>
    </>
  );
}

export default Body;