import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CompanySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CompanySelector({ value, onChange }: CompanySelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[300px]">
        <SelectValue placeholder="Select company..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="astra">PT Astra International Tbk</SelectItem>
        <SelectItem value="unair">PT Universitas Airlangga Tbk</SelectItem>
      </SelectContent>
    </Select>
  );
}
