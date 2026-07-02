import { Loader2 } from "lucide-react";
import { cn } from "@/shared/lib/cn";

interface Props {
  label?: string;
  className?: string;
  fullscreen?: boolean;
}

/** Suspense fallback — lazy routes + async components use this. */
export function LoadingFallback({ label = "Loading…", className, fullscreen }: Props) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 text-muted-foreground",
        fullscreen ? "min-h-screen" : "py-16",
        className,
      )}
    >
      <Loader2 className="h-6 w-6 animate-spin" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
