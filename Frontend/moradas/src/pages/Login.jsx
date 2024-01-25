import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

        try {
            const apiUrl = 'https://localhost:7077/api/auth/login';
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {email, password}
                )
            });

            if (response.ok) {
                const responseData = await response.json();
                Cookies.set('authToken', responseData.token);
                console.log('Login bem-sucedido');
                navigate('/moradas');
            } else {
                const responseData = await response.json();
                setError(responseData.message || 'Erro ao fazer login');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setError('Erro ao fazer login');
        }
    };

    return (
  
        <div className="auth-form-container">
            <form className="login-form"
                onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email}
                    onChange={
                        (e) => setEmail(e.target.value)
                    }
                    type="email"
                    placeholder="youremail@mail.com"
                    id="email"
                    name="email"/>
                <label htmlFor="password">Password</label>
                <input value={password}
                    onChange={
                        (e) => setPassword(e.target.value)
                    }
                    type="password"
                    placeholder="password"
                    id="password"
                    name="password"/>
                <button type="submit">Login</button>

               </form>

            <button className="link-btn"
                onClick={
                    () => navigate('/register')
            }>
                Não tem conta? Registe-se aqui.
            </button>

            <div>
        {error && <div className="error-message">{error}</div>}
      </div>
        </div>
    );
};
