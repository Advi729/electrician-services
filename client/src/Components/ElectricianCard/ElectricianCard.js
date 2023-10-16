import './ElectricianCard.css';
import manImage from '../../man.png';

const electricianCard = ({ firstname, lastname, phone, image }) => (
  // console.log(props)
  <div className="card bg-green-50 ml-2 mr-2 shadow-xl">
    { image ?
    <img src={`http://localhost:5000/photos/${image}`} alt='user' />
    : <img src={manImage} alt='electrician' />
    }
    <h2 className='pl-12'>{firstname+' '+lastname}</h2>
    <h3 className='pl-2'>contact: {phone}</h3>
    <h4 className='pl-2'>rating:</h4>
    <h4 className='pl-2'>location:</h4>
    {/* <h4>{avgRating} stars</h4> */}
  </div>
);

export default electricianCard;