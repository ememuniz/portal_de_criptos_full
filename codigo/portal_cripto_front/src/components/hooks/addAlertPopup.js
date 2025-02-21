import React, { use, useEffect, useState } from 'react';

const AddAlertPopup = ({ onClose, onAdd }) => {
  const [crypto, setCrypto] = useState('');
  const [referenceValue, setReferenceValue] = useState('');
  const [condition, setCondition] = useState('less');
  const [cryptoList, setCryptoList] = useState([]);


  useEffect(() => {
    const fetchCryptoList = async () => {
      try {
        const response = await fetch('http://localhost:3000/criptos/options');
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();

        const options = data.map((crypto) => ({
          value: crypto.name,
          label: crypto.name,
        }))
  
        console.log('data', data);
        console.log('options', options);
        console.log('data.value', options.value);
        
        
        setCryptoList(options);
        console.log('cryptoList', cryptoList);
        
      } catch (error) {
        console.error('Erro ao buscar lista de criptomoedas:', error);
      }; 
    };
    fetchCryptoList();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ crypto, referenceValue, condition });
    onClose();
  };

  return (   
    <div className="widgets-popup-overlay">
      <div className="widgets-popup-content">
        <h1>Adicionar Alerta</h1>
        <form className='register-form-alert' onSubmit={handleSubmit}>
          <label>
            Criptomoeda:
            <select 
              value={crypto}
              onChange={(e) => setCrypto(e.target.value)}
              required
            >
              <option value="">Selecione uma criptomoeda</option>
              {cryptoList.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))} 
            </select>
              
          </label>
          <label>
            Valor de Referência:
            <input
              type="number"
              value={referenceValue}
              onChange={(e) => setReferenceValue(e.target.value)}
              required
            />
          </label>
          <label>
            Condição:
            <select 
              value={condition} 
              onChange={(e) => setCondition(e.target.value)}
              required
            >
              <option value="less">Menor que</option>
              <option value="equal">Igual a</option>
              <option value="greater">Maior que</option>
            </select>
          </label>
          <div className='register-button-alert'>
            <button type="submit">Adicionar</button>
            <button onClick={onClose}>Fechar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAlertPopup;