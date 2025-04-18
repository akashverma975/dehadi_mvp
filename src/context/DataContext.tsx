
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { AttendanceRecord, Client, Employee } from "@/types";

interface DataContextType {
  clients: Client[];
  employees: Employee[];
  attendanceRecords: AttendanceRecord[];
  addAttendanceRecord: (record: Omit<AttendanceRecord, "id" | "createdAt">) => void;
  getEmployeesByClient: (clientId: string) => Employee[];
  getClientById: (clientId: string) => Client | undefined;
  getEmployeeById: (employeeId: string) => Employee | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Sample data for demo
const SAMPLE_CLIENTS: Client[] = [
  { id: "1", name: "Acme Corp" },
  { id: "2", name: "Globex Industries" },
  { id: "3", name: "Stark Enterprises" },
];

const SAMPLE_EMPLOYEES: Employee[] = [
  { id: "1", name: "John Doe", clientId: "1" },
  { id: "2", name: "Jane Smith", clientId: "1" },
  { id: "3", name: "Alice Johnson", clientId: "2" },
  { id: "4", name: "Bob Brown", clientId: "2" },
  { id: "5", name: "Charlie Davis", clientId: "3" },
];

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [clients, setClients] = useState<Client[]>(SAMPLE_CLIENTS);
  const [employees, setEmployees] = useState<Employee[]>(SAMPLE_EMPLOYEES);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    // Load data from localStorage on initial load
    const storedRecords = localStorage.getItem("attendanceRecords");
    if (storedRecords) {
      setAttendanceRecords(JSON.parse(storedRecords));
    }
  }, []);

  const addAttendanceRecord = (record: Omit<AttendanceRecord, "id" | "createdAt">) => {
    const newRecord: AttendanceRecord = {
      ...record,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    const updatedRecords = [...attendanceRecords, newRecord];
    setAttendanceRecords(updatedRecords);
    localStorage.setItem("attendanceRecords", JSON.stringify(updatedRecords));
  };

  const getEmployeesByClient = (clientId: string) => {
    return employees.filter((employee) => employee.clientId === clientId);
  };

  const getClientById = (clientId: string) => {
    return clients.find((client) => client.id === clientId);
  };

  const getEmployeeById = (employeeId: string) => {
    return employees.find((employee) => employee.id === employeeId);
  };

  return (
    <DataContext.Provider
      value={{
        clients,
        employees,
        attendanceRecords,
        addAttendanceRecord,
        getEmployeesByClient,
        getClientById,
        getEmployeeById,
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
