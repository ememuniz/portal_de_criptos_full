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
import ProtectedRoute from './components/utils/auth';


const RoutesInit = () => {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<HomeScreen />} />

        <Route path="/news/:id" element={<NewDetailsScreen />} />

        <Route path="/criptomoedas" 
          element={
            <ProtectedRoute>
              <CriptoScreen />
            </ProtectedRoute>
          } 
        />

        <Route path="/alerta" 
          element={
            <ProtectedRoute>
              <AlertaScreen />
            </ProtectedRoute>
          } 
        />

        <Route path="/perfil" 
          element={
            <ProtectedRoute>
              <PerfilScreen />
            </ProtectedRoute>
          } 
        />

        <Route path="/cadastro" element={<RegisterScreen />} />

        <Route path="/login" element={<LoginScreen />} />

        <Route path="/home" 
          element={
            <ProtectedRoute>
              <HomeLogadoScreen />
            </ProtectedRoute>
          } 
        />
        
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesInit;