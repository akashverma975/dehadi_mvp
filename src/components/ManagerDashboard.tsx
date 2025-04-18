import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, UserPlus, Building, ClipboardList } from "lucide-react";
import AttendanceForm from "./attendance/AttendanceForm";
import AttendanceTable from "./AttendanceTable";
import { useData } from "@/context/DataContext";
import { format } from "date-fns";
import ClientForm from "./client/ClientForm";
import EmployeeForm from "./employee/EmployeeForm";

const ManagerDashboard = () => {
  const { attendanceRecords } = useData();
  const [activeTab, setActiveTab] = useState("attendance");
  
  // Get today's date in YYYY-MM-DD format
  const today = format(new Date(), "yyyy-MM-dd");
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="attendance" className="flex items-center gap-1">
            <ClipboardList className="h-4 w-4" />
            Attendance
          </TabsTrigger>
          <TabsTrigger value="employees" className="flex items-center gap-1">
            <UserPlus className="h-4 w-4" />
            Employees
          </TabsTrigger>
          <TabsTrigger value="clients" className="flex items-center gap-1">
            <Building className="h-4 w-4" />
            Clients
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Record Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <AttendanceForm />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Attendance Records</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="today" className="w-full">
                <TabsList>
                  <TabsTrigger value="today" className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    Today
                  </TabsTrigger>
                  <TabsTrigger value="all" className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    All Records
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="today" className="mt-4">
                  <AttendanceTable filterDate={today} />
                </TabsContent>
                <TabsContent value="all" className="mt-4">
                  <AttendanceTable />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="employees" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Employee</CardTitle>
            </CardHeader>
            <CardContent>
              <EmployeeForm />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="clients" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add New Client</CardTitle>
            </CardHeader>
            <CardContent>
              <ClientForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManagerDashboard;
