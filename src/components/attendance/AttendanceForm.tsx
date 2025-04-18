
import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Check } from "lucide-react";
import { AttendanceStatus, AttendanceType, ShiftType } from "@/types";
import { useData } from "@/context/DataContext";
import { useToast } from "@/components/ui/use-toast";
import ClientSelect from "./ClientSelect";
import EmployeeSelect from "./EmployeeSelect";
import AttendanceDetails from "./AttendanceDetails";

const AttendanceForm = () => {
  const { clients, employees, addAttendanceRecord } = useData();
  const { toast } = useToast();
  
  const [clientId, setClientId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [status, setStatus] = useState<AttendanceStatus>("Present");
  const [type, setType] = useState<AttendanceType>("Full day");
  const [shift, setShift] = useState<ShiftType>("1st Shift");
  const [todayDate] = useState(format(new Date(), "yyyy-MM-dd"));
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!clientId || !employeeId) {
      toast({
        title: "Error",
        description: "Please select both client and employee",
        variant: "destructive",
      });
      return;
    }
    
    // Find names for IDs
    const client = clients.find(c => c.id === clientId);
    const employee = employees.find(e => e.id === employeeId);
    
    if (!client || !employee) {
      toast({
        title: "Error",
        description: "Invalid client or employee selection",
        variant: "destructive",
      });
      return;
    }
    
      // Add the record
      await addAttendanceRecord({
        id: crypto.randomUUID(),
        date: todayDate,
        employeeId,
        employeeName: employee.name,
        clientId,
        clientName: client.name,
        status,
        type,
        shift,
        createdAt: new Date().toISOString()
      });
      
      toast({
        title: "Success",
        description: "Attendance record submitted successfully",
      });
    
    // Reset form except for client and employee
    setStatus("Present");
    setType("Full day");
    setShift("1st Shift");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Mark Attendance
        </CardTitle>
        <CardDescription>
          Record attendance for today: {format(new Date(todayDate), "MMMM d, yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ClientSelect
              clients={clients}
              value={clientId}
              onChange={setClientId}
            />
            
            <EmployeeSelect
              employees={employees}
              value={employeeId}
              onChange={setEmployeeId}
            />
            
            <AttendanceDetails
              date={todayDate}
              status={status}
              type={type}
              shift={shift}
              onStatusChange={setStatus}
              onTypeChange={setType}
              onShiftChange={setShift}
            />
          </div>
        
          <Button type="submit" className="w-full mt-6">
            <Check className="mr-2 h-4 w-4" />
            Submit Attendance
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AttendanceForm;
