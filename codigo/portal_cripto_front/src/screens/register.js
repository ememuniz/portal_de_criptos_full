import React, { useState } from "react";
import marca from "../assets/images/marca.svg";
import Input from "../components/design/elements/input";
import ButtonGeneral from "../components/design/elements/buttonGeneral";
import { useNavigate } from "react-router-dom";


const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    telephone: ""
  });

  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate("/login");
      } else {
        alert("Erro ao cadastrar usuário");
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  }

  return (
    <div className='register'>
      <div className="register-container">
        <img className="register-marca" src={marca} alt="marca" />
        <h1 className="register-title">Cadastro</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <p>Nome</p>
          <input 
            label="Nome"
            type="text" 
            value={formData.name} 
            onChange={handleChange} 
            name="name" 
            className="register-input"
          />
          <p>Email</p>
          <input
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            name="email"
            className="register-input"
          />
          <p>Senha</p>
          <input
            label="Senha"
            type="password"
            value={formData.password}
            onChange={handleChange}
            name="password"
            className="register-input"
          />
          <p>Telefone</p>
          <input
            label="Telefone"
            type="text"
            value={formData.telephone}
            onChange={handleChange}
            name="telephone"
            className="register-input"
          />
          <ButtonGeneral text="Cadastrar" />
        </form>
      </div>
    </div>
  )
}

export default RegisterScreen;
