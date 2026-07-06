import type { PropsWithChildren } from "react";
import { Toaster } from "sonner";
import { QueryProvider } from "./query-provider";
import { ReduxProvider } from "./redux-provider";
import { ThemeProvider } from "./theme-provider";
import { SiteDataProvider } from "@/features/site-agent/data-source";

/** Root providers — order: Redux → Query → Theme → SiteData → children. */
export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ReduxProvider>
      <QueryProvider>
        <ThemeProvider>
          <SiteDataProvider>
            {children}
            <Toaster richColors position="top-right" />
          </SiteDataProvider>
        </ThemeProvider>
      </QueryProvider>
    </ReduxProvider>
  );
}
