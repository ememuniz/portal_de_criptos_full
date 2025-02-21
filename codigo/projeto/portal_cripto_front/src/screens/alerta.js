import React, { useState, useEffect } from 'react';
import AlertWidget from '../components/hooks/alertWidget';
import AddAlertPopup from '../components/hooks/addAlertPopup';
import Navbar from '../components/layout/navbarlogado.js';
import Banner from '../components/layout/banner.js'; 
import Footer from '../components/layout/footer.js';

const AlertaScreen = () => {
  const [alerts, setAlerts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const getToken = () => {
    return localStorage.getItem('token');
  }

  useEffect(() => {
    fetchAlerts();
  }, []);

  // Função para buscar alertas
  const fetchAlerts = async () => {
    try {
      const token = getToken();
      const response = await fetch('http://localhost:3000/alerts/list', {
        headers: { 'x-access-token': token },
      });
      if (!response.ok) {
        throw new Error('Erro ao buscar alertas');
      }
      const data = await response.json();
      setAlerts(data);
    } catch (error) {
      console.error('Erro ao buscar alertas:', error);
    }
  };

  // Função para adicionar um alerta
  const handleAddAlert = async (newAlert) => {
    try {
      console.log('newAlert', newAlert);
      const UserId = localStorage.getItem('userId');
      
      const token = getToken();
      const response = await fetch('http://localhost:3000/alerts/add', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-access-token': token},
        body: JSON.stringify({
          crypto: newAlert.crypto,
          referenceValue: newAlert.referenceValue,
          condition: newAlert.condition
        }),
      });
      if (!response.ok) {
        throw new Error('Erro ao adicionar alerta');
      }
      const data = await response.json();
      setAlerts([...alerts, data]);
      console.log('lista de alertas:', alerts);
      
    } catch (error) {
      console.error('Erro ao add alerta:', error);
    }
  };

  // Função para excluir um alerta
  const handleDeleteAlert = async (id) => {
    try {
      const token = getToken();
      const response = await fetch(`http://localhost:3000/alerts/delete/${id}`, {
        method: 'DELETE',
        headers: { 'x-access-token': token },
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir alerta');
      }
      setAlerts(alerts.filter((alert) => alert._id !== id));
    } catch (error) {
      console.error('Erro ao excluir alerta:', error);
    }
  };

  // Função para atualizar um alerta
  const handleUpdateAlert = async (id, updatedAlert) => {
    try {
      const token = getToken();
      const response = await fetch(`http://localhost:3000/alerts/update/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'x-access-token': token},
        body: JSON.stringify(updatedAlert),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar alerta');
      }
      const data = await response.json();
      setAlerts(alerts.map((alert) => (alert._id === id ? data : alert)));
    } catch (error) {
      console.error('Erro ao atualizar alerta:', error);
    }
  };

  return (  
    <div className="alerts-screen">
      <Navbar />
      <Banner />
      <div className='alerts-container'>
        <div className="alerts-header">
          <h1>Alertas</h1>
          <button onClick={() => setShowPopup(true)}>Adicionar Alerta</button>
        </div>
        <div className='alerts-card'>
          {showPopup && <AddAlertPopup onClose={() => setShowPopup(false)} onAdd={handleAddAlert} />}
          <div className="alerts-list">
            {alerts.map((alert) => (
              <AlertWidget
                key={alert._id}
                alert={alert}
                onDelete={handleDeleteAlert}
                onUpdate={handleUpdateAlert}
              />
            ))}
          </div> 
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AlertaScreen;