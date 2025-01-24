import React from 'react';
import { Link } from 'react-router-dom';

const MenuIntro = () => {
  return (
    <nav className="menu-intro-logado">
      <ul className='menu'> 
        <Link to ="/home">
          <li className='option'>Notícias</li>  
        </Link>

        <Link to ="/criptomoedas">
          <li className='option'>Criptomoedas</li>  
        </Link>

        <Link to ="/alerta">
          <li className='option'>Alertas</li>  
        </Link>

        <Link to ="/perfil">
          <li className='option'>Perfil</li>  
        </Link>
      </ul>
      
      <Link to ="/">
        <button className='button-init'>LogOut</button>
      </Link>
      
    </nav>
  )
}

export default MenuIntro;