import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import { AppShell } from "@/shared/components/layout/app-shell";
import { ErrorBoundary } from "@/shared/components/error-boundary";
import { LoadingFallback } from "@/shared/components/loading-fallback";
import { ProtectedRoute } from "@/features/auth/components/protected-route";

// Lazy-load pages — each becomes a separate chunk.
const HomePage = lazy(() => import("@/pages/home").then((m) => ({ default: m.HomePage })));
const PdfLibraryPage = lazy(() =>
  import("@/pages/pdf-library").then((m) => ({ default: m.PdfLibraryPage })),
);
const PdfDetailPage = lazy(() =>
  import("@/pages/pdf-detail-page").then((m) => ({ default: m.PdfDetailPage })),
);
const SiteObservationsPage = lazy(() =>
  import("@/pages/site/observations").then((m) => ({ default: m.SiteObservationsPage })),
);
const SiteReportsPage = lazy(() =>
  import("@/pages/site/reports").then((m) => ({ default: m.SiteReportsPage })),
);
const ChatbotPage = lazy(() =>
  import("@/pages/site/chatbot").then((m) => ({ default: m.ChatbotPage })),
);
const LoginPage = lazy(() =>
  import("@/pages/auth/login").then((m) => ({ default: m.LoginPage })),
);
const NotFoundPage = lazy(() =>
  import("@/pages/not-found").then((m) => ({ default: m.NotFoundPage })),
);

function ShellLayout() {
  return (
    <AppShell>
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </AppShell>
  );
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Suspense fallback={<LoadingFallback fullscreen />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <ShellLayout />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/pdf", element: <PdfLibraryPage /> },
          { path: "/pdf/:fileId", element: <PdfDetailPage /> },
          { path: "/site/observations", element: <SiteObservationsPage /> },
          { path: "/site/reports", element: <SiteReportsPage /> },
          { path: "/site/chat", element: <ChatbotPage /> },
        ],
      },
    ],
  },
  {
    path: "/404",
    element: (
      <Suspense fallback={<LoadingFallback fullscreen />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
  { path: "*", element: <Navigate to="/404" replace /> },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
