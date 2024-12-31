import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CompanySelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function CompanySelector({ value, onChange, className }: CompanySelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={cn(
          "w-full h-12 transition-all duration-200",
          "border-2 focus:ring-2 ring-offset-2",
          "hover:bg-muted/50 focus:border-primary",
          !value && "text-muted-foreground font-medium"
        )}>
          <SelectValue placeholder="Select a company to begin analysis..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="telkom">PT Telkom Indonesia Tbk</SelectItem>
          <SelectItem value="bri">PT Bank Rakyat Indonesia Tbk</SelectItem>
          <SelectItem value="mandiri">PT Bank Mandiri Tbk</SelectItem>
          <SelectItem value="pln">PT PLN (Persero)</SelectItem>
          <SelectItem value="pertamina">PT Pertamina (Persero)</SelectItem>
        </SelectContent>
      </Select>
    </motion.div>
  );
}