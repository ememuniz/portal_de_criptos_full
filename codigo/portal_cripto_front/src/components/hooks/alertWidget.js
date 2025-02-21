import React, { useState, useEffect, use } from 'react';

const AlertWidget = ({ alert, onDelete, onUpdate }) => {
  const [currentPrice, setCurrentPrice] = useState(null);
  const [isConditionMet, setIsConditionMet] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCrypto, setEditedCrypto] = useState(alert.crypto);
  const [editedReferenceValue, setEditedReferenceValue] = useState(alert.referenceValue);
  const [editedCondition, setEditedCondition] = useState(alert.condition);
  const [backgroundColor, setBackgroundColor] = useState('white');
  const [textColor, setTextColor] = useState('black');

  

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
      const cryptoData = data.find((coin) => (
        coin.name.toLowerCase() === alert.crypto.toLowerCase()));

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

  const handleUpdate = () => {
    const updatedAlert = {
      crypto: editedCrypto,
      referenceValue: editedReferenceValue,
      condition: editedCondition
    };
    onUpdate(alert._id, updatedAlert);
    setIsEditing(false);
  }
  

  useEffect(() => {
    fetchCurrentPrice();
    const interval = setInterval(fetchCurrentPrice, 60000);
    return () => clearInterval(interval);
  }, [alert]);

  useEffect(() => {
    if (currentPrice !== null) {
      const conditionMet = 
        (alert.condition === 'less' && currentPrice < alert.referenceValue) ||
        (alert.condition === 'equal' && currentPrice === alert.referenceValue) ||
        (alert.condition === 'greater' && currentPrice > alert.referenceValue);
      
      if (conditionMet) {
        setBackgroundColor('#4274bb');
        setTextColor('white');
      } else {
        setBackgroundColor('white');
        setTextColor('inherit'); 
      }
    }
  }, [currentPrice, alert.condition, alert.referenceValue]);

  return (
    <div className='alert-widget' >
      {isEditing ? (
        <div className='widgets-popup-overlay'>
          <div className='widgets-popup-content'>
            <h1>Editar Alerta</h1>
            <form className='register-form-alert'>
              <label>
                Criptomoeda:
                <input
                  type='text'
                  value={editedCrypto}
                  onChange={(e) => setEditedCrypto(e.target.value)} 
                />
              </label>

              <label>
                Preço de Referência:
                <input
                  type='number'
                  value={editedReferenceValue}
                  onChange={(e) => setEditedReferenceValue(e.target.value)}
                />
              </label>
              
              <label>
                Condição:
                <select
                  value={editedCondition}
                  onChange={(e) => setEditedCondition(e.target.value)}
                >
                  <option value='less'>Menor que</option>
                  <option value='equal'>Igual a</option>
                  <option value='greater'>Maior que</option>
                </select>
              </label>

              <div className='register-button-alert'>
                <button onClick={handleUpdate}>Salvar</button>
                <button onClick={() => setIsEditing(false)}>Cancelar</button>   
              </div>
            </form>
          </div>
        </div>
      ):(
        <div className='widgets-alerts-container' style={{ backgroundColor }}>
          <div className='widgets-alerts-content'>
            <h1 style={{ color: textColor }}>{alert.crypto.toUpperCase()}</h1>
            <div className='widgets-alerts-line'>
              <p style={{ color: textColor }} className='wal-title'>Condição:</p> <p style={{ color: textColor }}> {alert.condition === 'less' ? `Menor que U$ ${alert.referenceValue}` : alert.condition === 'greater' ? `Maior que U$ ${alert.referenceValue}` : `Igual a U$ ${alert.referenceValue}`}</p>
            </div>
            <div className='widgets-alerts-line'>
              <p style={{ color: textColor }} className='wal-title'>Preço Atual:</p> <p style={{ color: textColor }}> {currentPrice? `$${currentPrice.toFixed(2)}`:'Carregando...'}</p>
            </div>
            <div className='widgets-alerts-buttons'>
              <button onClick={() => setIsEditing(true)}>Atualizar</button>
              <button onClick={() => onDelete(alert._id)}>Excluir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 


export default AlertWidget;