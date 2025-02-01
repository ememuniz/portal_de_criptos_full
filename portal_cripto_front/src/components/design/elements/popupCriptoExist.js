import React from 'react';

const PopupCriptoExist = ({ message, onClose }) => {
  return (
    <div className="alert-popup">
      <h2>Alerta!</h2>
      <p>{message}</p>
      <button onClick={onClose}>OK</button>
    </div>
  )
}

export default PopupCriptoExist