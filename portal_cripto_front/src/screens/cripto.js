import React from 'react';
import Navbar from '../components/layout/navbarlogado';
import Banner from '../components/layout/banner';
import Dashboard from '../components/hooks/criptomoedas';
import Footer from '../components/layout/footer';

const CriptoScreen = () => {
  return (
    <div className="App">
      <Navbar />
      <Banner />
      <Dashboard />
      <Footer />
    </div>
  )
}

export default CriptoScreen;

