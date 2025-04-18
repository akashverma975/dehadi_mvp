import React, { createContext, useContext, useState, ReactNode } from "react";
import { Client, Employee, AttendanceRecord } from "@/types";

interface DataContextType {
  clients: Client[];
  employees: Employee[];
  attendanceRecords: AttendanceRecord[];
  addClient: (client: Client) => void;
  addEmployee: (employee: Employee) => void;
  addAttendanceRecord: (record: AttendanceRecord) => void;
  updateAttendanceRecord: (id: string, updates: Partial<AttendanceRecord>) => void;
  deleteAttendanceRecord: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  // Sample data
  const [clients, setClients] = useState<Client[]>([
    { id: "client-1", name: "ABC Construction" },
    { id: "client-2", name: "XYZ Industries" },
  ]);

  const [employees, setEmployees] = useState<Employee[]>([
    { id: "emp-1", name: "John Doe", clientId: "client-1" },
    { id: "emp-2", name: "Jane Smith", clientId: "client-1" },
    { id: "emp-3", name: "Bob Johnson", clientId: "client-2" },
  ]);

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: "att-1",
      date: "2025-04-18",
      employeeId: "emp-1",
      employeeName: "John Doe",
      clientId: "client-1",
      clientName: "ABC Construction",
      status: "Present",
      type: "Full day",
      shift: "1st Shift",
      createdAt: "2025-04-18T08:00:00Z",
    },
    {
      id: "att-2",
      date: "2025-04-18",
      employeeId: "emp-2",
      employeeName: "Jane Smith",
      clientId: "client-1",
      clientName: "ABC Construction",
      status: "Absent",
      type: "Full day",
      shift: "1st Shift",
      createdAt: "2025-04-18T08:05:00Z",
    },
    {
      id: "att-3",
      date: "2025-04-17",
      employeeId: "emp-1",
      employeeName: "John Doe",
      clientId: "client-1",
      clientName: "ABC Construction",
      status: "Present",
      type: "Full day",
      shift: "1st Shift",
      createdAt: "2025-04-17T08:00:00Z",
    },
  ]);

  const addClient = (client: Client) => {
    setClients((prev) => [...prev, client]);
  };

  const addEmployee = (employee: Employee) => {
    setEmployees((prev) => [...prev, employee]);
  };

  const addAttendanceRecord = (record: AttendanceRecord) => {
    setAttendanceRecords((prev) => [...prev, record]);
  };

  const updateAttendanceRecord = (id: string, updates: Partial<AttendanceRecord>) => {
    setAttendanceRecords((prev) =>
      prev.map((record) => (record.id === id ? { ...record, ...updates } : record))
    );
  };

  const deleteAttendanceRecord = (id: string) => {
    setAttendanceRecords((prev) => prev.filter((record) => record.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        clients,
        employees,
        attendanceRecords,
        addClient,
        addEmployee,
        addAttendanceRecord,
        updateAttendanceRecord,
        deleteAttendanceRecord,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
