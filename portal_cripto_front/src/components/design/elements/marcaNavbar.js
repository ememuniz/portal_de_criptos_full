import React from 'react';
import { Link } from 'react-router-dom';
import marca from '../../../assets/images/marca.svg';
import logo from '../../../assets/images/logotipo.svg';

const MarcaNavbar = () => {
  return (
    <div className="marca-navbar">
      <Link to="/">
        <img className='marca' src={marca} alt="marca" />
      </Link>
      <Link to="/"> 
        <img className='logo' src={logo} alt="logo" />
      </Link>
    </div>
  ) 
};

export default MarcaNavbar;
