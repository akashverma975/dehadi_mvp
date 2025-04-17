// components/Login.jsx
import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('user');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username) onLogin(username, role);
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-4 border rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <select
          className="w-full p-2 border rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
}

export default Login;
