import logo from '../../../../assets/images/logotipo.svg';
import './style.css'
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/">
      <img className="logo" src={logo} alt="logo" />
    </Link>
  );
}

export default Logo