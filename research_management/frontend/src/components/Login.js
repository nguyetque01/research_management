import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/Login.css'; 
import DEFAULT_BACKEND_URL from '../config.js'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${DEFAULT_BACKEND_URL}/api/login/`, {
        username: username,
        password: password
      });

      localStorage.setItem('token', response.data.token);

      // Chuyển hướng sau đăng nhập thành công
      window.location.href = '/dashboard'; // Đổi thành trang mong muốn
    } catch (error) {
      setErrorMessage('Tên đăng nhập hoặc mật khẩu không đúng.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Đăng nhập</h2>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Đăng nhập</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Login;
