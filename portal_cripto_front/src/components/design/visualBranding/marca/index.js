import marca from '../../../../assets/images/marca.svg';
import './style.css'
import { Link } from 'react-router-dom';

const Marca = () => {
  return (
    <Link to="/">
      <img className="marca" src={marca} alt="marca" />
    </Link>
  );
}

export default Marca