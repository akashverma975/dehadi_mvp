// App.jsx
import React, { useState, useEffect } from 'react';
import AttendanceForm from './components/AttendanceForm';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogin = (username, role) => {
    const userObj = { username, role };
    localStorage.setItem('user', JSON.stringify(userObj));
    setUser(userObj);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Attendance Tracker</h1>
        <button className="text-sm text-red-500" onClick={handleLogout}>Logout</button>
      </div>
      {user.role === 'admin' ? <AdminPanel /> : <AttendanceForm username={user.username} />}
    </div>
  );
}

export default App;