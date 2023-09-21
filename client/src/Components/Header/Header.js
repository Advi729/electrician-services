import './Header.css';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../slices/userSlice';
import Swal from "sweetalert2";
import avatar from '../../icons/man.png';

const Header = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector(store => store.user.isLoggedIn);
    const user = useSelector(store => store.user.user);
    console.log('islogheader: ', isLoggedIn);
    console.log('user inheaderr: ', user);
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
            // Perform logout logic here (e.g., clearing user session, API requests, etc.)
            // Redirect to the desired logout path
            // history.push('/logout');
            dispatch(logout());
                  localStorage.removeItem("user"); 
                 navigate('/user-login');
            console.log('Perform logout logic and redirect here');
          }
        });
      };
    return (
        <>
        <div className="shadow-md">
        <div className='header h-14'>
        <Link to='/'><h1 className="font-bold text-2xl text-lime-800">Electrify</h1></Link>
        <div className='nav-items'>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to=''>Cart</Link></li> 
               
                {
                  isLoggedIn ? <li className="logout" onClick={handleLogout}><Link>Log out</Link></li> 
                  : <li><Link to='/user-login'>Log In</Link></li>
                }
            </ul>
        </div>
        <div className="profile">
        { user && 
        <>
        <span className="m-4"><Link to='/profile'>{user?.firstname}'s profile</Link></span>
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

export default Header;