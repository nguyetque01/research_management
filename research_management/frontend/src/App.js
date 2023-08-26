import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import UserList from './components/UserList';
import Dashboard from './components/Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        {isLoggedIn ? (
          <Route path="/dashboard" Component={Dashboard} />
        ) : (
          <Route path="/dashboard" element={<p>Vui lòng đăng nhập để truy cập trang này.</p>} />
        )}
        <Route path="/users" Component={UserList} />
      </Routes>
    </Router>
  );
}

export default App;
