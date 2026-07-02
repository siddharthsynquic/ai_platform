import type { PropsWithChildren } from "react";
import { Toaster } from "sonner";
import { QueryProvider } from "./query-provider";
import { ReduxProvider } from "./redux-provider";
import { ThemeProvider } from "./theme-provider";

/** Root providers — order: Redux → Query → Theme → children. */
export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ReduxProvider>
      <QueryProvider>
        <ThemeProvider>
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </QueryProvider>
    </ReduxProvider>
  );
}
