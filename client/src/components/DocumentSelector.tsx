import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface DocumentSelectorProps {
  company: string;
  year: string;
  onCompanyChange: (value: string) => void;
  onYearChange: (value: string) => void;
  className?: string;
}

export default function DocumentSelector({ 
  company, 
  year, 
  onCompanyChange, 
  onYearChange, 
  className 
}: DocumentSelectorProps) {
  // Available years (you might want to adjust this based on available reports)
  const years = ["2024", "2023", "2022", "2021", "2020"];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex gap-4", className)}
    >
      <div className="flex-1">
        <Select value={company} onValueChange={onCompanyChange}>
          <SelectTrigger className={cn(
            "w-full transition-all duration-200",
            "border-2 focus:ring-2 ring-offset-2",
            "hover:bg-muted/50 focus:border-primary",
            !company && "text-muted-foreground"
          )}>
            <SelectValue placeholder="Select a company..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="telkom">PT Telkom Indonesia Tbk</SelectItem>
            <SelectItem value="bri">PT Bank Rakyat Indonesia Tbk</SelectItem>
            <SelectItem value="mandiri">PT Bank Mandiri Tbk</SelectItem>
            <SelectItem value="pln">PT PLN (Persero)</SelectItem>
            <SelectItem value="pertamina">PT Pertamina (Persero)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-32">
        <Select value={year} onValueChange={onYearChange}>
          <SelectTrigger className={cn(
            "w-full transition-all duration-200",
            "border-2 focus:ring-2 ring-offset-2",
            "hover:bg-muted/50 focus:border-primary",
            !year && "text-muted-foreground"
          )}>
            <SelectValue placeholder="Year..." />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );
}