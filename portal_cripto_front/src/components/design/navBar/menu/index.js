import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <ul className="navbar-menu">
      <Link to="/perfil">
        <li>
          <p>Perfil</p>
        </li>
      </Link>

      <Link to="/alerta">
        <li>
          <p>Alerta</p>
        </li>
      </Link>

      <Link to="/criptomoedas">
        <li>
          <p>Criptomoedas</p>
        </li>
      </Link>

      <Link to="/">
        <li>
          <p>Notícias</p>
        </li>
      </Link>
    </ul>
  );
}

export default Menu;
