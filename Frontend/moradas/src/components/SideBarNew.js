import React from 'react';
import { FaHome, FaPlus, FaSignOutAlt } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Apagar o cookie de autenticação
    Cookies.remove('authToken');
    navigate('/login');
  };

  const handleAddMoradas = () => {
    navigate('/addmoradas');
    window.location.reload();
  };

  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <li>
          <button onClick={() => navigate('/moradas')}>
            <FaHome />
            <span>Página Inicial</span>
          </button>
        </li>
        <li>
          <button onClick={handleAddMoradas}>
            <FaPlus />
            <span>Adicionar uma Morada</span>
          </button>
        </li>
        <li>
          <button onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
