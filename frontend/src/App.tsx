import { AppProviders } from "@/app/providers";
import { ErrorBoundary } from "@/shared/components/error-boundary";
import { AppRouter } from "@/router";

export default function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <AppRouter />
      </AppProviders>
    </ErrorBoundary>
  );
}
