import AdminHeader from '../../Components/AdminHeader/AdminHeader';
import Footer from '../../Components/Footer/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
// import { Provider, useSelector } from "react-redux";
// import store from "../store/store";

function Admin() {
  return (
    <>
      {/* <Provider store={store}> */}
      <AdminHeader />
      <Outlet />
      <Footer />
      {/* </Provider> */}
    </>
  );
}

export default Admin;
