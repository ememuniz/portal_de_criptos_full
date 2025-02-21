import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (!token){
        setIsValid(false);
        return;
      }
      
      try {
        const response = await fetch("http://localhost:3000/users/validate", {
          method: "GET",
          headers: {
            "x-access-token":  token,
            "Content-Type": "application/json",
          },
          
        });
        console.log(response.headers.Authorization);
        setIsValid(response.ok);
      } catch (error) {
        console.error ("Erro ao validar o token:",error);
        setIsValid(false);
      }
    };

    validateToken();
  }, []);

  if (isValid === null) return <div>Carregando...</div>;
  if (!isValid) return <Navigate to="/login" />
  return children;
};

export default ProtectedRoute;