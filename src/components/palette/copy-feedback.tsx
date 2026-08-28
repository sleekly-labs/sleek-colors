import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

type CopyFeedbackProps = {
  copied: boolean;
  className?: string;
};

function CopyFeedback({ copied, className }: CopyFeedbackProps) {
  return (
    <span
      className={cn(
        "text-muted-foreground inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium transition-colors",
        copied && "bg-secondary text-secondary-foreground",
        className
      )}
      aria-hidden="true"
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      <span>{copied ? "Copied" : "Copy"}</span>
    </span>
  );
}

export { CopyFeedback };
