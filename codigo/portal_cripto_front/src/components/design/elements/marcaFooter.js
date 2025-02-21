import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/logotipoFundoPreto.svg';

const MarcaFooter = () => {
  return (
    <div className="marca-footer">
      <Link to="/"> 
        <img className='logo-footer' src={logo} alt="logo" />
      </Link>
      <p className='text-footer'>© 2000-2025 Serenô. Todos os direitos autorais reservados.</p>
      <p className='text-footer'> A serenô preza a qualidade da informação e atesta a apuração de todo o conteúdo produzido por sua equipe, ressaltando, no entanto, que não faz qualquer tipo de recomendação de investimento, não se responsabilizando por perdas, danos (diretos, indiretos e incidentais), custos e lucros cessantes.</p>
    </div>
  ) 
};

export default MarcaFooter;