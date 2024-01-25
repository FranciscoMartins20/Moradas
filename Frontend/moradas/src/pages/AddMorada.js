import React, { useState } from 'react';
import Sidebar from '../components/SideBarNew';
import "../Styles.css"
import Cookies from 'js-cookie'; 
import Map from '../components/Map'

export const AddMoradas = () => {
  const [formData, setFormData] = useState({
    nome: '',
    rua: '',
    numero: '',
    freguesia: '',
    concelho: '',
    distrito: '',
    pais: '',
    codigo_postal: '',
    coordenadas: '',
  });

  const handleLocationSelect = (locationData) => {
    setFormData({
      ...formData,
      rua: locationData.rua || '',
      numero: locationData.numero || '',
      freguesia: locationData.freguesia || '',
      concelho: locationData.concelho || '',
      distrito: locationData.distrito || '',
      pais: locationData.pais || '',
      codigo_postal: locationData.codigo_postal || '',
      coordenadas: locationData.coordenadas || '',
    });
  };

  const authToken = Cookies.get('authToken');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://localhost:7077/api/moradas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Dados submetidos com sucesso!')
        console.log('Dados enviados com sucesso!');
        setFormData({
          nome: '',
          rua: '',
          numero: '',
          freguesia: '',
          concelho: '',
          distrito: '',
          pais: '',
          codigo_postal: '',
          coordenadas: '',
        });
      } else {
        alert('Erro!');
        console.error('Erro ao enviar os dados.');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClearForm = () => {
    // Define todos os campos do formulário como vazios
    setFormData({
      nome: '',
      rua: '',
      numero: '',
      freguesia: '',
      concelho: '',
      distrito: '',
      pais: '',
      codigo_postal: '',
      coordenadas: '',
    });
  };

  return (
    <div className="moradas">
      <Sidebar />
      <div className="main-content">
        <h1>Adicionar Moradas</h1>
        <div className="form-and-map-container">
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="rua">Rua:</label>
            <input type="text" id="rua" name="rua" value={formData.rua} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="numero">Número:</label>
            <input type="text" id="numero" name="numero" value={formData.numero} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="freguesia">Freguesia:</label>
            <input type="text" id="freguesia" name="freguesia" value={formData.freguesia} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="concelho">Concelho:</label>
            <input type="text" id="concelho" name="concelho" value={formData.concelho} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="distrito">Distrito:</label>
            <input type="text" id="distrito" name="distrito" value={formData.distrito} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="pais">País:</label>
            <input type="text" id="pais" name="pais" value={formData.pais} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="codigo_postal">Código Postal:</label>
            <input type="text" id="codigo_postal" name="codigo_postal" value={formData.codigo_postal} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="coordenadas">Coordenadas:</label>
            <input type="text" id="coordenadas" name="coordenadas" value={formData.coordenadas} onChange={handleInputChange} />
          </div>
          <br></br>
          <div className="button-container">
  <button type="submit">Adicionar</button>
  <button type="button" onClick={handleClearForm}>Limpar Formulário</button>
</div>
        </form>
         <div className="google-map">
            <Map      
              onLocationSelect={handleLocationSelect}
            />
            
            
          </div>
      </div>
    </div>
      </div>
  );
};
