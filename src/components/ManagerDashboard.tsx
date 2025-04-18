import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, UserPlus, Building, ClipboardList, RefreshCw } from "lucide-react";
import AttendanceForm from "./attendance/AttendanceForm";
import AttendanceTable from "./AttendanceTable";
import { useData } from "@/context/DataContext";
import { format } from "date-fns";
import ClientForm from "./client/ClientForm";
import EmployeeForm from "./employee/EmployeeForm";
import { Button } from "./ui/button";

const ManagerDashboard = () => {
  const { attendanceRecords, fetchData, isLoading } = useData();
  const [activeTab, setActiveTab] = useState("attendance");
  const [refreshing, setRefreshing] = useState(false);
  
  // Get today's date in YYYY-MM-DD format
  const today = format(new Date(), "yyyy-MM-dd");
  
  // Function to refresh data
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchData();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };
  
  // Fetch data on initial load
  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manager Dashboard</h2>
        <Button 
          variant="outline" 
          onClick={handleRefresh}
          disabled={refreshing || isLoading}
          className="flex items-center gap-1"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing...' : 'Refresh Data'}
        </Button>
      </div>
      
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
