// import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Pages/user/Home';
import Error from './Components/Error/Error';
import UserLogin from './Pages/user/UserLogin';
import UserSignup from './Pages/user/UserSignup';
import ElectricianLogin from './Pages/electrician/ElectricianLogin';
import ElectricianSignup from './Pages/electrician/ElectricianSignup';
import Dashboard from './Pages/electrician/Dashboard';
import Body from './Components/Body/Body';
import ElectricianHome from './Pages/electrician/ElectricianHome';
import AdminHome from './Pages/admin/AdminHome';
import AdminLogin from './Pages/admin/AdminLogin';
import AdminDashboard from './Pages/admin/AdminDashboard';
import UsersList from './Pages/admin/UsersList';
import ElectriciansList from './Pages/admin/ElectriciansList';
import Profile from './Pages/user/Profile';
import ElectricianProfile from './Pages/electrician/Profile';
import ServicesList from './Pages/admin/ServicesList';
import AddServices from './Pages/admin/AddServices';
import ElectricianServicesList from './Pages/electrician/ServicesList';
import ElectricianProfileService from './Pages/user/ElectricianProfile';
import ElectricianCertificate from './Components/ElectricianCertificate/ElectricianCertificate';
import ElectricianProfileAdmin from './Pages/admin/ElectricianProfile';
import ElectricianCertificateAdmin from './Pages/admin/ElectricianCertificateAdmin';
import EditServices from './Pages/admin/EditServices';
import TimeSlot from './Pages/electrician/TimeSlot';
import Checkout from './Pages/user/Checkout';
import Bookings from './Pages/user/Bookings';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Body />,
      },
      {
        path: '/user-login',
        element: <UserLogin />,
      },
      {
        path: '/user-signup',
        element: <UserSignup />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/electrician-profile/:id',
        element: <ElectricianProfileService />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      {
        path: '/bookings-list',
        element: <Bookings />,
      },
    ],
  },
  {
    path: '/admin',
    element: <AdminHome />,
    errorElement: <Error />,
    children: [
      {
        path: '/admin',
        element: <AdminLogin />,
      },
      {
        path: '/admin/dashboard',
        element: <AdminDashboard />,
      },
      {
        path: '/admin/login',
        element: <AdminLogin />,
      },
      {
        path: '/admin/users-list',
        element: <UsersList />,
      },
      {
        path: '/admin/electricians-list',
        element: <ElectriciansList />,
      },
      {
        path: '/admin/services-list',
        element: <ServicesList />,
      },
      {
        path: '/admin/add-services',
        element: <AddServices />,
      },
      {
        path: '/admin/electrician-profile/:id',
        element: <ElectricianProfileAdmin />,
      },
      {
        path: '/admin/electrician-certificate/:id',
        element: <ElectricianCertificateAdmin />
      },
      {
        path: '/admin/edit-service/:id',
        element: <EditServices />,
      },
    ],
  },
  {
    path: '/electrician',
    element: <ElectricianHome />,
    errorElement: <Error />,
    children: [
      {
        path: '/electrician',
        element: <ElectricianLogin />,
      },
      {
        path: '/electrician/login',
        element: <ElectricianLogin />,
      },
      {
        path: '/electrician/signup',
        element: <ElectricianSignup />,
      },
      {
        path: '/electrician/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/electrician/profile',
        element: <ElectricianProfile />,
      },
      {
        path: '/electrician/services-list',
        element: <ElectricianServicesList />,
      },
      {
        path: '/electrician/certificate',
        element: <ElectricianCertificate />,
      },
      {
        path: '/electrician/time-slot',
        element: <TimeSlot />
      },
    ],
  },
]);

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <RouterProvider router={appRouter} />
  );
}

export default App;
