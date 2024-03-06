// LoginPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css'; // Import CSS file

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Check if the username and password are correct (you can replace it with your own logic)
    if (username === 'admin' && password === 'vighnesh') {
      // Set loggedIn to true upon successful login
      setLoggedIn(true);
    } else {
      alert('Incorrect username or password. Please try again.');
    }
  };

  return (
    <div className="login-container"> {/* Add className for styling */}
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      {/* Redirect to dashboard page upon successful login */}
      {loggedIn && <Link to="/dashboard">Go to Dashboard</Link>}
    </div>
  );
};

export default LoginPage;