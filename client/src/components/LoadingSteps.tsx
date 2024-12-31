import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingStepsProps {
  currentStep: number;
}

const steps = [
  "Retrieving chat history...",
  "Finding relevant information from sustainability report...",
  "Finding relevant information from other sources...",
];

export default function LoadingSteps({ currentStep }: LoadingStepsProps) {
  return (
    <div className="space-y-4 my-4">
      {steps.map((step, index) => (
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: currentStep >= index ? 1 : 0.3, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          {currentStep === index && (
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          )}
          {currentStep > index && (
            <div className="h-4 w-4 rounded-full bg-primary" />
          )}
          {currentStep < index && (
            <div className="h-4 w-4 rounded-full border-2 border-muted" />
          )}
          <span className={cn(
            "text-sm",
            currentStep === index && "text-primary font-medium",
            currentStep > index && "text-muted-foreground",
            currentStep < index && "text-muted-foreground/50"
          )}>
            {step}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
