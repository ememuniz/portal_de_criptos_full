import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CriptoScreen from './screens/cripto';
import HomeScreen from './screens/home';
import AlertaScreen from './screens/alerta';
import PerfilScreen from './screens/perfil';  
import NewDetailsScreen from './screens/newDetails';
import RegisterScreen from './screens/register';
import LoginScreen from './screens/login';
import HomeLogadoScreen from './screens/homeLogado';


const RoutesInit = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/news/:id" element={<NewDetailsScreen />} />
        <Route path="/criptomoedas" element={<CriptoScreen />} />
        <Route path="/alerta" element={<AlertaScreen />} />
        <Route path="/perfil" element={<PerfilScreen />} />  
        <Route path="/cadastro" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/home" element={<HomeLogadoScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesInit;