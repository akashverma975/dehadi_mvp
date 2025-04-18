import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useData } from "@/context/DataContext";
import { format, parseISO } from "date-fns";

interface AttendanceTableProps {
  filterDate?: string;
}

const AttendanceTable = ({ filterDate }: AttendanceTableProps) => {
  const { attendanceRecords, getClientById, getEmployeeById } = useData();

  // Filter records by date if filterDate is provided
  const filteredRecords = filterDate
    ? attendanceRecords.filter(record => record.date === filterDate)
    : attendanceRecords;

  // Sort records by date (most recent first)
  const sortedRecords = [...filteredRecords].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  if (sortedRecords.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No attendance records found.
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Employee</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Shift</TableHead>
            <TableHead>Type</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedRecords.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.date}</TableCell>
              <TableCell>{record.employeeName || "Unknown"}</TableCell>
              <TableCell>{record.clientName || "Unknown"}</TableCell>
              <TableCell>
                <Badge 
                  variant={record.status === "Present" ? "default" : "destructive"}
                  className={record.status === "Present" ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-red-100 text-red-800 hover:bg-red-100"}
                >
                  {record.status}
                </Badge>
              </TableCell>
              <TableCell className="capitalize">{record.shift}</TableCell>
              <TableCell className="capitalize">{record.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AttendanceTable;
