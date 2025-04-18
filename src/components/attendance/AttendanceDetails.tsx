
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AttendanceStatus, AttendanceType, ShiftType } from "@/types";

interface AttendanceDetailsProps {
  date: string;
  status: AttendanceStatus;
  type: AttendanceType;
  shift: ShiftType;
  onStatusChange: (value: AttendanceStatus) => void;
  onTypeChange: (value: AttendanceType) => void;
  onShiftChange: (value: ShiftType) => void;
}

const AttendanceDetails = ({
  date,
  status,
  type,
  shift,
  onStatusChange,
  onTypeChange,
  onShiftChange,
}: AttendanceDetailsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={date}
          disabled
          className="bg-muted"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Attendance Status</Label>
        <Select
          value={status}
          onValueChange={onStatusChange}
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
          onValueChange={onTypeChange}
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
          onValueChange={onShiftChange}
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
    </>
  );
};

export default AttendanceDetails;
