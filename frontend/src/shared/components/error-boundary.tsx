import { AlertTriangle } from "lucide-react";
import { ErrorBoundary as ReactErrorBoundary, type FallbackProps } from "react-error-boundary";
import type { PropsWithChildren, ReactNode } from "react";
import { Button } from "@/shared/components/ui/button";

/** Global fallback UI — shown when a component subtree throws during render. */
export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div
      role="alert"
      className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-lg border border-destructive/40 bg-destructive/5 p-8 text-center"
    >
      <AlertTriangle className="h-10 w-10 text-destructive" />
      <div>
        <h2 className="text-lg font-semibold">Something went wrong</h2>
        <p className="mt-1 text-sm text-muted-foreground">{error.message}</p>
      </div>
      <Button onClick={resetErrorBoundary} variant="outline">
        Try again
      </Button>
    </div>
  );
}

interface Props extends PropsWithChildren {
  fallback?: ReactNode;
  onReset?: () => void;
}

/** Drop-in boundary around any subtree. Use per-route or per-feature to isolate crashes. */
export function ErrorBoundary({ children, fallback, onReset }: Props) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      fallback={fallback as never}
      onReset={onReset}
      onError={(error, info) => {
        // TODO: pipe to Sentry / analytics once wired.
        console.error("ErrorBoundary caught:", error, info);
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}
