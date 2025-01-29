import React from 'react';
import Navbar from '../components/layout/navbarlogado';
import Banner from '../components/layout/banner';
import Dashboard from '../components/hooks/criptomoedas';

const CriptoScreen = () => {
  return (
    <div className="App">
      <Navbar />
      <Banner />
      <Dashboard />
    </div>
  )
}

export default CriptoScreen;

