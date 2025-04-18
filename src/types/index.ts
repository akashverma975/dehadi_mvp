
export type UserRole = 'admin' | 'employee';

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
}

export interface Client {
  id: string;
  name: string;
}

export interface Employee {
  id: string;
  name: string;
  clientId: string;
}

export type AttendanceStatus = 'Present' | 'Absent';
export type AttendanceType = 'Full day' | 'Half day';
export type ShiftType = '1st Shift' | '2nd Shift' | '3rd Shift';

export interface AttendanceRecord {
  id: string;
  date: string;
  employeeId: string;
  employeeName: string;
  clientId: string;
  clientName: string;
  status: AttendanceStatus;
  type: AttendanceType;
  shift: ShiftType;
  createdAt: string;
}
