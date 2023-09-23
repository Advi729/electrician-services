import { useEffect, useState } from "react";
// import editIcon from '../../../public/icons/edit.png';
// import deleteIcon from '../../../public/icons/delete.png';
import filterElectriciansList from "../../utils/filterElectriciansList";
import { Link } from "react-router-dom";


const ElectriciansList = () => {
    const [searchText, setSearchText] = useState('');
    const [electriciansList, setElectriciansList] = useState([]);
    const [filteredElectriciansList, setFilteredElectriciansList] = useState([]);
    useEffect(() => {
        getAllElectricians();
    }, []);
    const getAllElectricians = async () => {
        try {
            const response = await fetch('http://localhost:5000/admin/electricians-list');
            const result = await response.json();
            console.log('result in electricianslist', result);
            setElectriciansList(result.electricians);
            setFilteredElectriciansList(result.electricians);
        } catch (error) {
            console.error('error in login: ',error);
        }
    }

    const deleteElectrician = async(id) => {
        try {
            const response = await fetch('http://localhost:5000/admin/delete-electrician/'+id);
            const result = await response.json();
            console.log(result);
            if(result) {
                window.location.reload();
            }
        } catch (error) {
            console.error('error in deleteelectrician: ', error);
        }
    };

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
    
    <div className="ml-7 min-w-0 flex justify-center">
        <h3 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Electricians list
        </h3>
    </div>

        <div className="flex justify-center m-2">
            <input type="text" className=" bg-slate-200  border-cyan-100" onChange={(e) => setSearchText(e.target.value)} placeholder="Search"/>
            <button className="pl-1 pr-1 ml-3 rounded bg-slate-300" onClick={() => {
                const updatedData = filterElectriciansList(searchText, electriciansList);
                setFilteredElectriciansList(updatedData);
            }}>Search</button>
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
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Phone
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Approval</span>
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Delete</span>
                </th>
            </tr>
        </thead>
        <tbody>
        {
                    filteredElectriciansList?.map((electrician, index) => {
                        return(
            <tr key={electrician._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">
                {index + 1}
                </td>
                <Link to={'/admin/electrician-profile/' + electrician._id}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {electrician.firstname + ' ' + electrician.lastname}
                </th>
                </Link>
                <td className="px-6 py-4">
                {electrician.email}
                </td>
                <td className="px-6 py-4">
                {electrician.phone}
                </td>
                <td className="px-6 py-4">
                {electrician.isApproved ? 'Approved' : 'Disapproved'}
                </td>
                <td className="px-6 py-4 text-right">
                    {
                    electrician.isApproved ?
                    <Link onClick={() => disapproveElectrician(electrician._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Disapprove</Link>
                    :
                    <Link onClick={() => approveElectrician(electrician._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Approve</Link>                
                    }
                </td>
                <td className="px-6 py-4 text-right">
                    <Link onClick={() => deleteElectrician(electrician._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</Link>
                    {/* <img src={deleteIcon} style={{width: '25px'}} onClick={() => deleteElectrician(electrician._id)}/> */}
                </td>
            </tr>
           
        
);
})
}
        </tbody>
    </table>
</div>
</div> 
    </>
  )
}

export default ElectriciansList;