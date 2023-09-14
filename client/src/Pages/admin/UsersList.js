import { useEffect, useState } from "react";
// import editIcon from '../../../public/icons/edit.png';
// import deleteIcon from '../../../public/icons/delete.png';
import filterUsersList from "../../utils/filterUsersList";
import { Link } from "react-router-dom";


const UsersList = () => {
    const [searchText, setSearchText] = useState('');
    const [usersList, setUsersList] = useState([]);
    const [filteredUsersList, setFilteredUsersList] = useState([]);
    useEffect(() => {
        getAllUsers();
    }, []);
    const getAllUsers = async () => {
        try {
            const response = await fetch('http://localhost:5000/admin/users-list');
            const result = await response.json();
            console.log('result in userslist', result);
            setUsersList(result.users);
            setFilteredUsersList(result.users);
        } catch (error) {
            console.error('error in login: ',error);
        }
    }

    const deleteUser = async(id) => {
        try {
            const response = await fetch('http://localhost:5000/admin/delete-user/'+id);
            const result = await response.json();
            console.log(result);
            if(result) {
                window.location.reload();
            }
        } catch (error) {
            console.error('error in deleteuser: ', error);
        }
    };

    const blockUser = async(id) => {
        try {
            const response = await fetch('http://localhost:5000/admin/block-user/'+id);
            const result = await response.json();
            console.log(result);
            if(result) {
                window.location.reload();
            }
        } catch (error) {
            console.error('error in blockuser: ', error);
        }
    };

    const unblockUser = async(id) => {
        try {
            const response = await fetch('http://localhost:5000/admin/unblock-user/'+id);
            const result = await response.json();
            console.log(result);
            if(result) {
                window.location.reload();
            }
        } catch (error) {
            console.error('error in unblockuser: ', error);
        }
    };

  return (
<>
    
    <div className="ml-7 min-w-0 flex justify-center">
        <h3 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        Users list
        </h3>
    </div>

        <div className="flex justify-center m-2">
            <input type="text" className=" bg-slate-200  border-cyan-100" onChange={(e) => setSearchText(e.target.value)} placeholder="Search"/>
            <button className="pl-1 pr-1 ml-3 rounded bg-slate-300" onClick={() => {
                const updatedData = filterUsersList(searchText, usersList);
                setFilteredUsersList(updatedData);
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
                    <span className="sr-only">Block-status</span>
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Delete</span>
                </th>
            </tr>
        </thead>
        <tbody>
        {
                    filteredUsersList?.map((user, index) => {
                        return(
            <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">
                {index + 1}
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {user.firstname + ' ' + user.lastname}
                </th>
                <td className="px-6 py-4">
                {user.email}
                </td>
                <td className="px-6 py-4">
                {user.phone}
                </td>
                <td className="px-6 py-4">
                {user.isBlocked ? 'Blocked' : 'Not blocked'}
                </td>
                <td className="px-6 py-4 text-right">
                    {
                    user.isBlocked ?
                    <Link onClick={() => unblockUser(user._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Unblock</Link>
                    :
                    <Link onClick={() => blockUser(user._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Block</Link>                
                    }
                </td>
                <td className="px-6 py-4 text-right">
                    <Link onClick={() => deleteUser(user._id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</Link>
                    {/* <img src={deleteIcon} style={{width: '25px'}} onClick={() => deleteUser(user._id)}/> */}
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

export default UsersList;