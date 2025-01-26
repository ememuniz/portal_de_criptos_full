import React from "react";

const PopupDelete = ({ message, onClose, onConfirm }) => {
  return (
    <div className="popup-background">
      <div className="popup-container">
        <h3>Apagar Perfil</h3>
        <p>{message}</p>
        <div className="popup-buttons">
          <button onClick={onConfirm} className="popup-confirm">
            OK
          </button>
          <button onClick={onClose} className="popup-cancel">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default PopupDelete;