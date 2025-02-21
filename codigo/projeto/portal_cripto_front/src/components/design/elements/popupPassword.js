import React, { useState } from "react";

const PopupPassword = ({ onClose, onConfirm }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  const handleConfirm = () => {
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    if (password.length < 8) {
      alert("A senha deve ter pelo menos 8 caracteres!");
      return;
    }

    onConfirm(password, confirmPassword);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Alterar Senha</h2>
        <div className="popup-inputs">
          <input
            type="password"
            placeholder="Nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirme a nova senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {errorMessage && <p className="popup-error">{errorMessage}</p>}
        <div className="popup-buttons">
          <button onClick={handleConfirm} className="popup-confirm">
            Confirmar
          </button>
          <button onClick={onClose} className="popup-cancel">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupPassword;