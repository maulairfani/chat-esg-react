import { motion } from "framer-motion";
import { Loader2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface LoadingStepsProps {
  currentStep: number;
  isCompleted?: boolean;
}

const steps = [
  "Retrieving chat history...",
  "Finding relevant information from sustainability report...",
  "Finding relevant information from other sources...",
];

export default function LoadingSteps({ currentStep, isCompleted = false }: LoadingStepsProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-muted/20 rounded-lg p-4 mb-4">
      <Button
        variant="ghost"
        size="sm"
        className="w-full flex justify-between items-center mb-2"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className="text-sm font-medium">Analysis Steps</span>
        <ChevronDown className={cn(
          "h-4 w-4 transition-transform",
          isExpanded ? "transform rotate-180" : ""
        )} />
      </Button>

      {isExpanded && (
        <div className="space-y-4">
          {steps.map((step, index) => (
            index <= currentStep && (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3"
              >
                {currentStep === index && !isCompleted ? (
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                ) : (
                  <div className="h-4 w-4 rounded-full bg-primary" />
                )}
                <span className={cn(
                  "text-sm",
                  currentStep === index && !isCompleted && "text-primary font-medium",
                  currentStep < index && "text-muted-foreground/50"
                )}>
                  {step}
                </span>
              </motion.div>
            )
          ))}
        </div>
      )}
    </div>
  );
}