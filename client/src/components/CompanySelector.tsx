import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

interface CompanySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CompanySelector({ value, onChange }: CompanySelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[300px] transition-all duration-200 hover:bg-muted/50">
          <SelectValue placeholder="Select company..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="astra">PT Astra International Tbk</SelectItem>
          <SelectItem value="unair">PT Universitas Airlangga Tbk</SelectItem>
        </SelectContent>
      </Select>
    </motion.div>
  );
}