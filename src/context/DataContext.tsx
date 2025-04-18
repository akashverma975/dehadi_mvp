import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Client, Employee, AttendanceRecord } from "@/types";
import { supabase } from "@/integrations/supabase/client";

interface DataContextType {
  clients: Client[];
  employees: Employee[];
  attendanceRecords: AttendanceRecord[];
  addClient: (client: Client) => Promise<void>;
  addEmployee: (employee: Employee) => Promise<void>;
  addAttendanceRecord: (record: AttendanceRecord) => Promise<void>;
  updateAttendanceRecord: (id: string, updates: Partial<AttendanceRecord>) => Promise<void>;
  deleteAttendanceRecord: (id: string) => Promise<void>;
  getClientById: (id: string) => Client | undefined;
  getEmployeeById: (id: string) => Employee | undefined;
  fetchData: () => Promise<void>;
  isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  // Fetch all data from Supabase
  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch clients
      const { data: clientsData, error: clientsError } = await supabase
        .from('clients')
        .select('*');
      
      if (clientsError) {
        console.error("Error fetching clients:", clientsError);
      } else if (clientsData) {
        const formattedClients: Client[] = clientsData.map(client => ({
          id: client.id,
          name: client.name
        }));
        setClients(formattedClients);
      }
      
      // Fetch employees
      const { data: employeesData, error: employeesError } = await supabase
        .from('employees')
        .select('*');
      
      if (employeesError) {
        console.error("Error fetching employees:", employeesError);
      } else if (employeesData) {
        const formattedEmployees: Employee[] = employeesData.map(employee => ({
          id: employee.id,
          name: employee.name,
          phoneNumber: employee.phone_number,
          clientId: employee.client_id || undefined
        }));
        setEmployees(formattedEmployees);
      }
      
      // Fetch attendance records
      const { data: attendanceData, error: attendanceError } = await supabase
        .from('attendance')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (attendanceError) {
        console.error("Error fetching attendance records:", attendanceError);
      } else if (attendanceData) {
        const formattedRecords: AttendanceRecord[] = attendanceData.map(record => ({
          id: record.id,
          date: record.date,
          employeeId: record.employee_id,
          employeeName: record.employee_name,
          clientId: record.client_id,
          clientName: record.client_name,
          status: record.status,
          type: record.type,
          shift: record.shift,
          createdAt: record.created_at
        }));
        setAttendanceRecords(formattedRecords);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addClient = async (client: Client) => {
    try {
      // Add to Supabase
      const { data, error } = await supabase
        .from('clients')
        .insert([{ name: client.name }])
        .select();

      if (error) {
        console.error("Error adding client to Supabase:", error);
        throw error;
      }

      // If successful, update local state with the returned data
      if (data && data.length > 0) {
        const newClient: Client = {
          id: data[0].id,
          name: data[0].name
        };
        
        setClients((prev) => [...prev, newClient]);
        return;
      }

      // Fallback to local state only if Supabase doesn't return data
      setClients((prev) => [...prev, client]);
    } catch (error) {
      console.error("Error in addClient:", error);
      // Still update local state even if Supabase fails
      setClients((prev) => [...prev, client]);
    }
  };

  const addEmployee = async (employee: Employee) => {
    try {
      // Add to Supabase
      const { data, error } = await supabase
        .from('employees')
        .insert([
          { 
            name: employee.name, 
            phone_number: employee.phoneNumber,
            client_id: employee.clientId || null
          }
        ])
        .select();

      if (error) {
        console.error("Error adding employee to Supabase:", error);
        throw error;
      }

      // If successful, update local state with the returned data
      if (data && data.length > 0) {
        const newEmployee: Employee = {
          id: data[0].id,
          name: data[0].name,
          phoneNumber: data[0].phone_number,
          clientId: data[0].client_id || undefined
        };
        
        setEmployees((prev) => [...prev, newEmployee]);
        return;
      }

      // Fallback to local state only if Supabase doesn't return data
      setEmployees((prev) => [...prev, employee]);
    } catch (error) {
      console.error("Error in addEmployee:", error);
      // Still update local state even if Supabase fails
      setEmployees((prev) => [...prev, employee]);
    }
  };

  const addAttendanceRecord = async (record: AttendanceRecord) => {
    try {
      // Generate ID if not provided
      const recordToAdd = {
        ...record,
        id: record.id || `att-${Date.now()}`,
        createdAt: record.createdAt || new Date().toISOString()
      };
      
      // Add to Supabase
      const { data, error } = await supabase
        .from('attendance')
        .insert([
          {
            id: recordToAdd.id,
            date: recordToAdd.date,
            employee_id: recordToAdd.employeeId,
            employee_name: recordToAdd.employeeName,
            client_id: recordToAdd.clientId,
            client_name: recordToAdd.clientName,
            status: recordToAdd.status,
            type: recordToAdd.type,
            shift: recordToAdd.shift,
            created_at: recordToAdd.createdAt
          }
        ])
        .select();

      if (error) {
        console.error("Error adding attendance record to Supabase:", error);
        throw error;
      }

      // Update local state
      setAttendanceRecords((prev) => [recordToAdd, ...prev]);
    } catch (error) {
      console.error("Error in addAttendanceRecord:", error);
      // Still update local state even if Supabase fails
      setAttendanceRecords((prev) => [{
        ...record,
        id: record.id || `att-${Date.now()}`,
        createdAt: record.createdAt || new Date().toISOString()
      }, ...prev]);
    }
  };

  const updateAttendanceRecord = async (id: string, updates: Partial<AttendanceRecord>) => {
    try {
      // Convert to snake_case for Supabase
      const supabaseUpdates: any = {};
      if (updates.date) supabaseUpdates.date = updates.date;
      if (updates.employeeId) supabaseUpdates.employee_id = updates.employeeId;
      if (updates.employeeName) supabaseUpdates.employee_name = updates.employeeName;
      if (updates.clientId) supabaseUpdates.client_id = updates.clientId;
      if (updates.clientName) supabaseUpdates.client_name = updates.clientName;
      if (updates.status) supabaseUpdates.status = updates.status;
      if (updates.type) supabaseUpdates.type = updates.type;
      if (updates.shift) supabaseUpdates.shift = updates.shift;
      
      // Update in Supabase
      const { error } = await supabase
        .from('attendance')
        .update(supabaseUpdates)
        .eq('id', id);

      if (error) {
        console.error("Error updating attendance record in Supabase:", error);
        throw error;
      }

      // Update local state
      setAttendanceRecords((prev) =>
        prev.map((record) => (record.id === id ? { ...record, ...updates } : record))
      );
    } catch (error) {
      console.error("Error in updateAttendanceRecord:", error);
      // Still update local state even if Supabase fails
      setAttendanceRecords((prev) =>
        prev.map((record) => (record.id === id ? { ...record, ...updates } : record))
      );
    }
  };

  const deleteAttendanceRecord = async (id: string) => {
    try {
      // Delete from Supabase
      const { error } = await supabase
        .from('attendance')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Error deleting attendance record from Supabase:", error);
        throw error;
      }

      // Update local state
      setAttendanceRecords((prev) => prev.filter((record) => record.id !== id));
    } catch (error) {
      console.error("Error in deleteAttendanceRecord:", error);
      // Still update local state even if Supabase fails
      setAttendanceRecords((prev) => prev.filter((record) => record.id !== id));
    }
  };

  // Helper functions to get entities by ID
  const getClientById = (id: string) => {
    return clients.find(client => client.id === id);
  };

  const getEmployeeById = (id: string) => {
    return employees.find(employee => employee.id === id);
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
        getClientById,
        getEmployeeById,
        fetchData,
        isLoading
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
