import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = Cookies.get('authToken');
    if (authToken) {
      navigate('/moradas');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      const apiUrl = 'https://localhost:7077/api/auth/register';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log('Registro bem-sucedido');
        
        
        navigate('/login');
      } else {
        const responseData = await response.json();
        setError(responseData.message || 'Erro ao registrar');
      }
    } catch (error) {
      console.error('Erro ao registrar:', error);
      setError('Erro ao registrar');
    }
  };

  return (
    <div className="auth-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@mail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          id="password"
          name="password"
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="password"
          id="confirmPassword"
          name="confirmPassword"
        />
        <button type="submit">Register</button>

      
      </form>
      <button className="link-btn" onClick={() => navigate('/login')}>
        Já tem uma conta? Faça login aqui.
      </button>
      <div>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
    
  );
};
