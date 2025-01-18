import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CriptoScreen from './screens/cripto';
import HomeScreen from './screens/home';
import AlertaScreen from './screens/alerta';
import PerfilScreen from './screens/perfil';  


const RoutesInit = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/criptomoedas" element={<CriptoScreen />} />
        <Route path="/alerta" element={<AlertaScreen />} />
        <Route path="/perfil" element={<PerfilScreen />} />  
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesInit;