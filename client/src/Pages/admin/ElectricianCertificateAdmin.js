import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ElectricianCertificateAdmin = () => {
    const { id } = useParams();
    const [electricianDetails, setElectricianDetails] = useState();
    useEffect(() => {
        electricianInfo(id);
    }, [id]);

    const electricianInfo = async (id) => {
        try {
            const response = await fetch('http://localhost:5000/electrician-profile/' +id);
            const result = await response.json();
            if(result?.electrician) {
                setElectricianDetails(result.electrician);
            }

        } catch (error) {
            console.error('error in electricianInfo', error);
        }
    };
  return (
    <iframe className="mb-24 mx-36 w-4/5" title="certificate" src={`http://localhost:5000/pdfs/${electricianDetails?.certificate}`} width="100%" height="1500px"></iframe>
  );
};

export default ElectricianCertificateAdmin;