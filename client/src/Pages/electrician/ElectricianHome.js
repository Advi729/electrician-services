// import { useSelector } from "react-redux";
import { Outlet } from 'react-router-dom';
import ElectricianHeader from '../../Components/ElectricianHeader/ElectricianHeader';
import Footer from '../../Components/Footer/Footer';

const ElectricianHome = () => {
  // const electrician = useSelector(store => store.electrician.electrician);
  return (
    <>
      <ElectricianHeader />
      <Outlet />
      <Footer />
    </>
  );
};

export default ElectricianHome;
