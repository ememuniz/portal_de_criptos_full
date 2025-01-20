import React from 'react';
import { Link } from 'react-router-dom';

const MenuIntro = () => {
  return (
    <nav className="menu-intro">
      
      <Link to ="/cadastro">
        <button className='button-init'>Cadastre-se</button>  
      </Link>

      <Link to ="/login">
        <button className='button-init'>Login</button>
      </Link>
      
    </nav>
  )
}

export default MenuIntro;