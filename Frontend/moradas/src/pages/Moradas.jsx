import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SideBarNew';
import "../Styles.css";
import Cookies from 'js-cookie';

export const Moradas = () => {
  const [data, setData] = useState([]);
  const [editedItem, setEditedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = Cookies.get('authToken'); 
        
        const response = await fetch('https://localhost:7077/api/moradas', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
        
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Erro ao obter os dados:', error);
      }
    };

    fetchData();
  }, []);

  
  const handleDelete = async (item) => {
    const confirmDelete = window.confirm('Tem certeza de que deseja apagar esta morada?');
    
    if (confirmDelete) {
      try {
        const authToken = Cookies.get('authToken'); 
        
        await fetch(`https://localhost:7077/api/moradas/${item.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
        window.location.reload();
      } catch (error) {
        console.error('Erro ao excluir o item:', error);
      }
    }
  };

  const handleEdit = (item) => {
    setIsEditing(true);
    setEditedItem(item);
  };
  
  const handleUpdate = async (e) => {
    e.preventDefault();
  
    try {
      const authToken = Cookies.get('authToken');
  
      await fetch(`https://localhost:7077/api/moradas/${editedItem.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedItem),
      });
      window.location.reload();
    } catch (error) {
      console.error('Erro ao atualizar a morada:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedItem(null);
  };

  const handleUpdateField = (e, fieldName) => {
    const newValue = e.target.value;
    setEditedItem((prevItem) => ({
      ...prevItem,
      [fieldName]: newValue,
    }));
  };
  

  return (
<div className="moradas">
  <Sidebar />
  <div className="main-content">
    <h1>Moradas</h1>
    {isEditing && editedItem ? (
      <div>
        <h2>Editar Morada</h2>
        <form onSubmit={handleUpdate}>
  <label className="form-label">
    Nome:
    <input
      type="text"
      value={editedItem.nome}
      onChange={(e) => handleUpdateField(e, 'nome')}
    />
  </label>
  <label className="form-label">
    Rua:
    <input
      type="text"
      value={editedItem.rua}
      onChange={(e) => handleUpdateField(e, 'rua')}
    />
  </label>
  <label className="form-label">
    Número:
    <input
      type="text"
      value={editedItem.numero}
      onChange={(e) => handleUpdateField(e, 'numero')}
    />
  </label>
  <label className="form-label">
    Freguesia:
    <input
      type="text"
      value={editedItem.freguesia}
      onChange={(e) => handleUpdateField(e, 'freguesia')}
    />
  </label>
  <label className="form-label">
    Concelho:
    <input
      type="text"
      value={editedItem.concelho}
      onChange={(e) => handleUpdateField(e, 'concelho')}
    />
  </label>
  <label className="form-label">
    Distrito:
    <input
      type="text"
      value={editedItem.distrito}
      onChange={(e) => handleUpdateField(e, 'distrito')}
    />
  </label>
  <label className="form-label">
    País:
    <input
      type="text"
      value={editedItem.pais}
      onChange={(e) => handleUpdateField(e, 'pais')}
    />
  </label>
  <label className="form-label">
    Código Postal:
    <input
      type="text"
      value={editedItem.codigo_postal}
      onChange={(e) => handleUpdateField(e, 'codigo_postal')}
    />
  </label>
  <label className="form-label">
    Coordenadas:
    <input
      type="text"
      value={editedItem.coordenadas}
      onChange={(e) => handleUpdateField(e, 'coordenadas')}
    />
  </label>
  <button type="submit" style={{ marginRight: '5px' }}>Guardar</button>
  <button onClick={handleCancelEdit}>Cancelar</button>
</form>

      </div>
    ) : (
      <>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Rua</th>
              <th>Número</th>
              <th>Freguesia</th>
              <th>Concelho</th>
              <th>Distrito</th>
              <th>País</th>
              <th>Código Postal</th>
              <th>Coordenadas</th>
              
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.nome}</td>
                <td>{item.rua}</td>
                <td>{item.numero}</td>
                <td>{item.freguesia}</td>
                <td>{item.concelho}</td>
                <td>{item.distrito}</td>
                <td>{item.pais}</td>
                <td>{item.codigo_postal}</td>
                <td>{item.coordenadas}</td>
               
                <button onClick={() => handleEdit(item)} className="custom-edit-button">Editar</button>
                <button onClick={() => handleDelete(item)} className="custom-delete-button">Excluir</button>

                
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )}
  </div>
</div>

    
  );
};
