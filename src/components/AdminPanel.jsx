// components/AdminPanel.jsx
import React from 'react';

function AdminPanel() {
  const attendanceData = JSON.parse(localStorage.getItem('attendance') || '[]');

  const handleDownload = () => {
    const headers = ['Client', 'Name', 'Date', 'Status', 'Type', 'Shift'];
    const rows = attendanceData.map(r => [r.client, r.name, r.date, r.status, r.type, r.shift]);
    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'attendance_report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-lg font-semibold mb-4">Attendance Records</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Client</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Shift</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((entry, index) => (
            <tr key={index}>
              <td className="border p-2">{entry.client}</td>
              <td className="border p-2">{entry.name}</td>
              <td className="border p-2">{entry.date}</td>
              <td className="border p-2">{entry.status}</td>
              <td className="border p-2">{entry.type}</td>
              <td className="border p-2">{entry.shift}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleDownload}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Download Report
      </button>
    </div>
  );
}

export default AdminPanel;
