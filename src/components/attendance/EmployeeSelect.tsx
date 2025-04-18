
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Employee } from "@/types";

interface EmployeeSelectProps {
  employees: Employee[];
  value: string;
  onChange: (value: string) => void;
}

const EmployeeSelect = ({ employees, value, onChange }: EmployeeSelectProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="employee">Employee</Label>
      <Select
        value={value}
        onValueChange={onChange}
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
  );
};

export default EmployeeSelect;
