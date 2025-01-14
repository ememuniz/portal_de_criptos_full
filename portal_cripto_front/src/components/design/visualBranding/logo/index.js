import logo from '../../../../assets/images/logotipo.svg';
import './style.css'

function Logo() {
  return (
    <img className="logo" src={logo} alt="logo" />
  );
}

export default Logo