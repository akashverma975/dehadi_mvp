export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Client {
  id: string;
  name: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  client_id: string;
}

export interface AttendanceRecord {
  id: string;
  employee_id: string;
  client_id: string;
  date: string;
  status: 'present' | 'absent';
  type: 'full_day' | 'half_day';
  shift: '1st' | '2nd' | '3rd';
  created_at: string;
}