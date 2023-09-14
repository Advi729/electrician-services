import './AdminHeader.css';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/adminSlice';
import Swal from "sweetalert2";

const AdminHeader = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector(store => store.admin.isLoggedIn);
    const admin = useSelector(store => store.admin.admin);
    console.log('islogheader: ', isLoggedIn);
    console.log('admin inheaderr: ', admin);
    const dispatch = useDispatch();

    const handleLogout = () => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will be logged out.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Logout',
          cancelButtonText: 'Cancel',
        //   dangerMode: true,
        }).then((result) => {
          if (result.isConfirmed) {
            // Perform logout logic here (e.g., clearing admin session, API requests, etc.)
            // Redirect to the desired logout path
            // history.push('/logout');
            dispatch(logout());
                  localStorage.removeItem("admin"); 
                 navigate('/admin/login');
            console.log('Perform logout logic and redirect here');
          }
        });
      };
    return (
        <>
        <div className="shadow-md">
        <div className='header h-14'>
        <Link to='/admin/dashboard'><h1 className="font-bold text-2xl text-lime-800">Electrify Admin</h1></Link>
        <div className='nav-items'>
            <ul>
                <li><Link to='/admin/dashboard'>Dashboard</Link></li>
                { isLoggedIn &&
                <>
                <li><Link to='/admin/users-list'>Users</Link></li> 
                <li><Link to='/admin/electricians-list'>Electricians</Link></li> 
                </>
                }
                {
                  isLoggedIn ? <li className="logout" onClick={handleLogout}><Link>Log out</Link></li> 
                  : <li><Link to='/admin/login'>Log In</Link></li>
                }
            </ul>
        </div>
        <div className="profile">
        { admin && 
        <>
        <span className="m-4">Welcome {admin?.firstname}!  </span>
        {/* <Link to='/profile' ><img
            className="img rounded-circle" src={avatar}
            width="30em" alt="Profile"/>
        </Link> */}
        </>
        }
      
        </div>
    </div>
    </div>
        </>
    );
}

export default AdminHeader;