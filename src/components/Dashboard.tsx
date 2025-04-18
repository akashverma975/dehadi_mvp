import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, UserCheck, UserX, Building, Download } from "lucide-react";
import AttendanceTable from "./AttendanceTable";
import { useData } from "@/context/DataContext";
import { format } from "date-fns";
import { Button } from "./ui/button";

const Dashboard = () => {
  const { attendanceRecords, clients, employees } = useData();
  
  // Get today's date in YYYY-MM-DD format
  const today = format(new Date(), "yyyy-MM-dd");
  
  // Calculate statistics
  const totalEmployees = employees.length;
  const totalClients = clients.length;
  
  // Filter records for today
  const todayRecords = attendanceRecords.filter(record => record.date === today);
  
  // Count present and absent employees today
  const presentToday = todayRecords.filter(record => record.status === "Present").length;
  const absentToday = todayRecords.filter(record => record.status === "Absent").length;
  
  const statCards = [
    {
      title: "Total Employees",
      value: totalEmployees,
      icon: <UserCheck className="h-4 w-4 text-blue-600" />,
      color: "bg-blue-50 text-blue-600 border-blue-100"
    },
    {
      title: "Total Clients",
      value: totalClients,
      icon: <Building className="h-4 w-4 text-indigo-600" />,
      color: "bg-indigo-50 text-indigo-600 border-indigo-100"
    },
    {
      title: "Present Today",
      value: presentToday,
      icon: <UserCheck className="h-4 w-4 text-green-600" />,
      color: "bg-green-50 text-green-600 border-green-100"
    },
    {
      title: "Absent Today",
      value: absentToday,
      icon: <UserX className="h-4 w-4 text-red-600" />,
      color: "bg-red-50 text-red-600 border-red-100"
    },
  ];
  
  // Function to export attendance data to Excel
  const exportToExcel = (data: any[], fileName: string) => {
    // Convert data to CSV format
    const headers = ["Date", "Employee", "Client", "Status", "Type", "Shift", "Created"];
    const csvContent = [
      headers.join(","),
      ...data.map(row => [
        row.date,
        row.employeeName,
        row.clientName,
        row.status,
        row.type,
        row.shift,
        row.createdAt
      ].join(","))
    ].join("\n");
    
    // Create a blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${fileName}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportAll = () => {
    exportToExcel(attendanceRecords, `attendance_all_${format(new Date(), "yyyy-MM-dd")}`);
  };

  const handleExportToday = () => {
    exportToExcel(todayRecords, `attendance_today_${today}`);
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-2 rounded-full ${stat.color}`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-end space-x-2 mb-4">
        <Button 
          variant="outline" 
          onClick={handleExportToday}
          className="flex items-center gap-1"
        >
          <Download className="h-4 w-4" />
          Export Today's Data
        </Button>
        <Button 
          variant="outline" 
          onClick={handleExportAll}
          className="flex items-center gap-1"
        >
          <Download className="h-4 w-4" />
          Export All Data
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all" className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            All Records
          </TabsTrigger>
          <TabsTrigger value="today" className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            Today
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <AttendanceTable />
        </TabsContent>
        <TabsContent value="today" className="mt-4">
          <AttendanceTable filterDate={today} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
