import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Erro ao realizar logout:",error);
    }

    localStorage.removeItem("token");
    navigate("/")
  }

  return (
    <button onClick={handleLogout} className='button-init'>
      Logout
    </button>
  )
}

export default LogoutButton;