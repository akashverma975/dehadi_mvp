
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Check } from "lucide-react";
import { format } from "date-fns";
import { AttendanceStatus, AttendanceType, ShiftType } from "@/types";
import { useData } from "@/context/DataContext";
import { useToast } from "@/components/ui/use-toast";

const AttendanceForm = () => {
  const { clients, employees, getEmployeesByClient, addAttendanceRecord } = useData();
  const { toast } = useToast();
  
  const [clientId, setClientId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [status, setStatus] = useState<AttendanceStatus>("Present");
  const [type, setType] = useState<AttendanceType>("Full day");
  const [shift, setShift] = useState<ShiftType>("1st Shift");
  const [todayDate] = useState(format(new Date(), "yyyy-MM-dd"));
  
  const handleSubmit = (e: React.FormEvent) => {
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
    addAttendanceRecord({
      date: todayDate,
      employeeId,
      employeeName: employee.name,
      clientId,
      clientName: client.name,
      status,
      type,
      shift
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
            <div className="space-y-2">
              <Label htmlFor="client">Client</Label>
              <Select
                value={clientId}
                onValueChange={setClientId}
              >
                <SelectTrigger id="client">
                  <SelectValue placeholder="Select client" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="employee">Employee</Label>
              <Select
                value={employeeId}
                onValueChange={setEmployeeId}
              >
                <SelectTrigger id="employee">
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem key={employee.id} value={employee.id}>
                      {employee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={todayDate}
                disabled
                className="bg-muted"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Attendance Status</Label>
              <Select
                value={status}
                onValueChange={(value: AttendanceStatus) => setStatus(value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Present">Present</SelectItem>
                  <SelectItem value="Absent">Absent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Attendance Type</Label>
              <Select
                value={type}
                onValueChange={(value: AttendanceType) => setType(value)}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full day">Full day</SelectItem>
                  <SelectItem value="Half day">Half day</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="shift">Shift</Label>
              <Select
                value={shift}
                onValueChange={(value: ShiftType) => setShift(value)}
              >
                <SelectTrigger id="shift">
                  <SelectValue placeholder="Select shift" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st Shift">1st Shift</SelectItem>
                  <SelectItem value="2nd Shift">2nd Shift</SelectItem>
                  <SelectItem value="3rd Shift">3rd Shift</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
