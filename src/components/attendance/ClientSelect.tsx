
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Client } from "@/types";

interface ClientSelectProps {
  clients: Client[];
  value: string;
  onChange: (value: string) => void;
}

const ClientSelect = ({ clients, value, onChange }: ClientSelectProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="client">Client</Label>
      <Select
        value={value}
        onValueChange={onChange}
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
  );
};

export default ClientSelect;
