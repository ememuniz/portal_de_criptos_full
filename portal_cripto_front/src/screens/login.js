import React, { useState } from "react";
import Input from "../components/design/elements/input";
import ButtonGeneral from "../components/design/elements/buttonGeneral";
import marca from "../assets/images/marca.svg";
import Popup from "../components/design/elements/popup";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  }



  return (
    <div className="register">
      <div className="register-container">
        <img className="register-marca" src={marca} alt="marca" />
        <h1 className="register-title">Login</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <p>Email</p>
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="register-input"
          />
          <p>Senha</p>
          <Input
            label="Senha"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={"register-input"}
          />
          <ButtonGeneral text="Entrar" />
        </form>
        {showPopup && (
          <Popup 
            message="Email ou senha incorretos" 
            onClose={() => {
              setShowPopup(false);
              navigate("/login");
              }} 
          />
        )}
      </div>
    </div>
  )
}

export default LoginScreen;