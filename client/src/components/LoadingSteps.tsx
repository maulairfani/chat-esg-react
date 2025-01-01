import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingStepsProps {
  currentStep: number;
  steps: string[];  // Menggunakan steps dari API (tools)
}

export default function LoadingSteps({ currentStep, steps }: LoadingStepsProps) {
  return (
    <div className="space-y-4 my-4">
      {steps.map((step, index) => (
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          {currentStep === index ? (
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          ) : (
            <div className={cn(
              "h-4 w-4 rounded-full",
              currentStep > index ? "bg-primary" : "bg-muted-foreground/50"
            )} />
          )}
          <span className={cn(
            "text-sm",
            currentStep === index && "text-primary font-medium",
            currentStep < index && "text-muted-foreground/50"
          )}>
            {step}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
