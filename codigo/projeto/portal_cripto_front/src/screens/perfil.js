import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PopupDelete from '../components/design/elements/popupDelete';
import PopupPassword from '../components/design/elements/popupPassword';
import PopupMessage from '../components/design/elements/popupMessage';
import { AiOutlineEdit, AiOutlineCheck, AiOutlineDelete, AiOutlineKey} from "react-icons/ai";
import Profile from '../components/hooks/profile.js';
import Navbar from '../components/layout/navbarlogado.js'
import Banner from '../components/layout/banner.js';
import Footer from '../components/layout/footer.js';

const PerfilScreen = () => {
  return(
    <fragment>
      <Navbar />
      <Banner />
      <Profile />
      <Footer />
    </fragment>
  )
}
  /*const [userData, setUserData] = useState({});
  const [editField, setEditField] = useState(null);
  const [newValue, setNewValue] = useState("");
  const [showPopup, setShowPopup] = useState({visible: false, message: ""});
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({password: "", confirmPassword: ""});

  //!--------------------------------------------------------------
  const [showPopupDelete, setShowPopupDelete] = useState(false);
  const [showPopupPassword, setShowPopupPassword] = useState(false);
  const [showPopupMessage, setShowPopupMessage] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  //!--------------------------------------------------------------


  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/users/me", {
          headers: { "x-access-token": token },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.user);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);        
      }
    };
    fetchUserData();
  }, [navigate]);

  const handlePasswordChange = async () => {
    const { password, confirmPassword } = passwordData;

    if (password !== confirmPassword) {
      alert("As senhas não são iguais!");
      return;
    }
    
    if (password.length < 8) {
      alert("A senha deve ter pelo menos 8 caracteres!");
      return;
    }
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/users/update/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({ password, confirmPassword }), 
      });

      if (response.ok) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setShowPopup({visible: true, message: "Erro ao atualizar a senha."});
      }
    } catch (error) {
      console.error("Erro ao atualizar a senha", error);
    }
  };

  const handleEdit = (field) => {
    setEditField(field);
    setNewValue(userData[field]);
  }

  const handleUpdate = async() => {
    if (editField === '_id' || editField === '__v') {
      console.error('Não é permitido alterar este campo');
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({ field: editField, value: newValue }), 
      });

      if (response.ok) {
        const updateUser = await response.json();
        setUserData(updateUser.user);
        setEditField(null);
        setNewValue(""); 
      } else {
        console.error("Erro ao atualizar o dado.");
      }
    } catch (error) {
      console.error("Erro ao atualizar o dado", error);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/users/delete",{
        method: "DELETE",
        headers: {
          "x-access-token": token,
        },
      });

      if (response.ok) {
        localStorage.removeItem("token");
        setPopupMessage("Perfil excluído com sucesso!");
        setTimeout(() => navigate("/"), 2000);
      } else {
        console.error("Erro ao excluir o perfil.");
      }
    } catch (error) {
      console.error("Erro ao excluir o perfil:", error);
    }
  };
  
  return (
    <div className='profile-container'>
      <h1>Perfil do Usuário</h1>
      <div className='profile-data'>
        {Object.keys(userData).map((key) => 
          ["_id", "__v", "password"].includes(key) ? null : (
            <div key={key} className='profile-item'>
              <p>
                <strong>{key}: </strong>
                {editField === key ? (
                  <input
                    type='text'
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)} 
                  />
                ):(
                  userData[key]
                )}
              </p>

              {editField === key ? (
                <button onClick={handleUpdate}>Ok</button>
              ):(
                <button onClick={() => handleEdit(key)}>Editar</button>
              )}
            </div>
          )
        )}
      </div>

      <button onClick={() => setShowPasswordModal(true)} className='change-password-button'>
        Alterar Senha
      </button>
      <button onClick={() => setShowPopup({visible: true, message: "Tem certeza que deseja excluir o perfil?"})} className='delete-profile-button'>
        Apagar Perfil
      </button>

      {showPasswordModal && (
        <div className='popup-background'>
          <div className='popup-container'>
            <h3>Alterar Senha</h3>
            <input
              type='password'
              placeholder='Nova senha'
              onChange={(e) => setPasswordData({ ...passwordData, password: e.target.value })} 
            />
            <input
              type='password'
              placeholder='Confirmar nova senha'
              onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} 
            />
            <button onClick={handlePasswordChange}>Alterar</button>
            <button onClick={() => setShowPasswordModal(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {showPopup.visible && (
            <PopupDelete message={showPopup.message} onClose={() => setShowPopup({visible: false, message: ""})} onConfirm={handleDeleteProfile} />
      )}

    </div>
  );
};*/

export default PerfilScreen;