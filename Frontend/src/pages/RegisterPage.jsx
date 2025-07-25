import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AuthPage.css';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post('https://notesdoo-backend.onrender.com/api/auth/signup', {
        email,
        username,
        password
      });

      setMessage('✅ Registration successful!');
      navigate('/login');
    } catch (err) {
      setMessage('❌ Registration failed');
    }
  };

  return (
    <div className="auth-page">
      <h2>📝 Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" value={username}
          onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
        {message && <p className="auth-message">{message}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
