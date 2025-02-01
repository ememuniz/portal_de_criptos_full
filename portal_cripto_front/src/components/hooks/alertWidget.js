import React, { useState, useEffect } from 'react';

const AlertWidget = ({ alert, onDelete, onUpdate }) => {
  const [currentPrice, setCurrentPrice] = useState(null);
  const [isConditionMet, setIsConditionMet] = useState(false);

  const fetchCurrentPrice = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/criptos/price', {
        method: 'GET',
        headers: {
          'x-access-token': token,
        }
      });

      const data = await response.json();
      console.log('dataAlertWidget', data);
      console.log('data.coins', data.coin);
      console.log('data.symbol', data.coins[0].symbol);
      
      
      const cryptoData = data.coins.find((coin) => (
        coin.symbol.toLowerCase() === alert.crypto.toLowerCase()));
      console.log('cryptoData', cryptoData);
      

      if (cryptoData) {
        const price = parseFloat(cryptoData.price);
        setCurrentPrice(price);
        checkCondition(price);
      } else {
        console.error('Criptomoeda não encontrada na API:', alert.crypto);
      }
    } catch (error) {
      console.error('Erro ao buscar preço da criptomoeda:', error);
      console.log('details', error.message);
      
    }
  };

  const checkCondition = (price) => {
    if (!price) return;

    switch (alert.condition){
      case 'less':
        setIsConditionMet(price < alert.referenceValue);
        break;
      case 'equal':
        setIsConditionMet(price === alert.referenceValue);
        break;
      case 'greater':
        setIsConditionMet(price > alert.referenceValue);
        break;
      default:
        setIsConditionMet(false);
    }
  };

  useEffect(() => {
    fetchCurrentPrice();
    const interval = setInterval(fetchCurrentPrice, 60000);
    return () => clearInterval(interval);
  }, [alert]);

  return (
    <div className={`alert-widget ${isConditionMet ? 'active' : ''}`}>
      <h3>{alert.crypto.toUpperCase()}</h3>
      <p>Condição: {alert.condition === 'less' ? 'Menor que' : alert.condition === 'greater' ? 'Maior que' : 'Igual a'}</p>
      <p>Preço Atual: {currentPrice? `$${currentPrice.toFixed(2)}`:'Carregando...'}</p>
      <button onClick={() => onUpdate(alert._id)}>Atualizar</button>
      <button onClick={() => onDelete(alert._id)}>Excluir</button>
    </div>
  );
}; 


export default AlertWidget;