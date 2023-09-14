import './ElectricianHeader.css';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/electricianSlice';
import Swal from "sweetalert2";

const ElectricianHeader = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector(store => store.electrician.isLoggedIn);
    const electrician = useSelector(store => store.electrician.electrician);
    console.log('islogheader: ', isLoggedIn);
    console.log('electrician inheaderr: ', electrician);
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
            // Perform logout logic here (e.g., clearing electrician session, API requests, etc.)
            // Redirect to the desired logout path
            // history.push('/logout');
            dispatch(logout());
                  localStorage.removeItem("electrician"); 
                 navigate('/electrician/login');
            console.log('Perform logout logic and redirect here');
          }
        });
      };
    return (
        <>
        <div className="shadow-md">
        <div className='header h-14'>
        <Link to='/electrician/dashboard'><h1 className="font-bold text-2xl text-lime-800">Electrify</h1></Link>
        <div className='nav-items'>
            <ul>
                <li><Link to='/electrician/dashboard'>Dashboard</Link></li>
                <li><Link to=''>Orders</Link></li> 
                {
                  isLoggedIn ? <li className="logout" onClick={handleLogout}><Link>Log out</Link></li> 
                  : <li><Link to='/electrician/login'>Log In</Link></li>
                }
            </ul>
        </div>
        <div className="profile">
        { electrician && 
        <>
        <span className="m-4">Welcome {electrician?.firstname}!  </span>
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

export default ElectricianHeader;