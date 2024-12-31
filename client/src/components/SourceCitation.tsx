import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link2, ChevronDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface Source {
  url: string;
  pages?: string[];
  snippet?: string;
}

interface SourceCitationProps {
  sources: Source[];
}

export default function SourceCitation({ sources }: SourceCitationProps) {
  const [expandedSource, setExpandedSource] = useState<number | null>(null);

  if (!sources.length) return null;

  return (
    <div className="space-y-2 mt-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link2 className="h-4 w-4" />
        <span>{sources.length} sources</span>
      </div>
      <div className="space-y-2">
        {sources.map((source, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-between px-4 py-2 h-auto text-left font-normal hover:bg-muted/50",
                expandedSource === index && "bg-muted/30"
              )}
              onClick={() => setExpandedSource(expandedSource === index ? null : index)}
            >
              <div className="flex items-center gap-2 truncate">
                <Globe className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="truncate">{source.url}</span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                  expandedSource === index && "rotate-180"
                )}
              />
            </Button>
            <AnimatePresence>
              {expandedSource === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 py-2 bg-muted/20 rounded-lg mt-1">
                    <ScrollArea className="h-[100px]">
                      {source.pages?.length && (
                        <div className="mb-2 text-sm text-muted-foreground">
                          Pages: {source.pages.join(", ")}
                        </div>
                      )}
                      {source.snippet && (
                        <p className="text-sm whitespace-pre-wrap">{source.snippet}</p>
                      )}
                    </ScrollArea>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
