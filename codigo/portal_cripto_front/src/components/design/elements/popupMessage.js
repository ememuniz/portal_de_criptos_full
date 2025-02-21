import React from "react";

const PopupMessage = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>{message}</p>
        <button onClick={onClose} className="popup-confirm">OK</button>
      </div>
    </div>
  )
}

export default PopupMessage;