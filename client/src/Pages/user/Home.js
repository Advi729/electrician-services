import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import ElectricianHeader from '../../Components/ElectricianHeader/ElectricianHeader';

const Home = () => {
  const electrician = useSelector((store) => store.electrician.electrician);
  return (
    <>
      {electrician ? <ElectricianHeader /> : <Header />}
      <Outlet />
      <Footer />
    </>
  );
};

export default Home;
