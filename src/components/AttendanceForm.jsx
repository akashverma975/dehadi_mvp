// components/AttendanceForm.jsx
import React, { useState } from 'react';

const clients = ['Client A', 'Client B', 'Client C'];
const employees = ['Alice', 'Bob', 'Charlie'];

function AttendanceForm({ username }) {
  const [client, setClient] = useState('');
  const [name, setName] = useState(username);
  const [status, setStatus] = useState('Present');
  const [type, setType] = useState('Full Day');
  const [shift, setShift] = useState('1st Shift');

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    const record = { client, name, date: today, status, type, shift };
    const existing = JSON.parse(localStorage.getItem('attendance') || '[]');
    localStorage.setItem('attendance', JSON.stringify([...existing, record]));
    alert('Attendance submitted!');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <select className="w-full p-2 border rounded" value={client} onChange={(e) => setClient(e.target.value)} required>
        <option value="">Select Client</option>
        {clients.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>

      <select className="w-full p-2 border rounded" value={name} disabled>
        <option value={name}>{name}</option>
      </select>

      <input type="text" className="w-full p-2 border rounded bg-gray-100" value={today} disabled />

      <select className="w-full p-2 border rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>

      <select className="w-full p-2 border rounded" value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Full Day">Full Day</option>
        <option value="Half Day">Half Day</option>
      </select>

      <select className="w-full p-2 border rounded" value={shift} onChange={(e) => setShift(e.target.value)}>
        <option value="1st Shift">1st Shift</option>
        <option value="2nd Shift">2nd Shift</option>
        <option value="3rd Shift">3rd Shift</option>
      </select>

      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Submit Attendance</button>
    </form>
  );
}

export default AttendanceForm;
