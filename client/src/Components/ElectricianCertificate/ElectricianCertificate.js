import { useSelector } from "react-redux";

const ElectricianCertificate = () => {
    const electrician = useSelector(store => store.electrician.electrician);
  return (
    <iframe className="mb-24 mx-36 w-4/5" title="certificate" src={`http://localhost:5000/pdfs/${electrician.certificate}`} width="100%" height="1500px"></iframe>
  );
};

export default ElectricianCertificate;