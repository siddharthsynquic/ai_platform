import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "@/shared/components/error-boundary";
import { LoadingFallback } from "@/shared/components/loading-fallback";
import { SpaLinkInterceptor } from "@/shared/components/spa-link-interceptor";

// ── Landing ────────────────────────────────────────────────────────────
const EdifiLandingPage = lazy(() =>
  import("@/pages/edifice/landing").then((m) => ({ default: m.EdifiLandingPage })),
);

// ── User: Validation ───────────────────────────────────────────────────
const ValDashboardPage = lazy(() =>
  import("@/pages/edifice/user/val-dashboard").then((m) => ({ default: m.ValDashboardPage })),
);
const ValUploadPage = lazy(() =>
  import("@/pages/edifice/user/val-upload").then((m) => ({ default: m.ValUploadPage })),
);
const ValProjectsPage = lazy(() =>
  import("@/pages/edifice/user/val-projects").then((m) => ({ default: m.ValProjectsPage })),
);
const ValReferencesPage = lazy(() =>
  import("@/pages/edifice/user/val-references").then((m) => ({ default: m.ValReferencesPage })),
);
const ValReportsPage = lazy(() =>
  import("@/pages/edifice/user/val-reports").then((m) => ({ default: m.ValReportsPage })),
);
const ValStageViewPage = lazy(() =>
  import("@/pages/edifice/user/val-stage-view").then((m) => ({ default: m.ValStageViewPage })),
);

// ── User: Site Agent ───────────────────────────────────────────────────
const SaDashboardPage = lazy(() =>
  import("@/pages/edifice/user/sa-dashboard").then((m) => ({ default: m.SaDashboardPage })),
);
const SaProjectsPage = lazy(() =>
  import("@/pages/edifice/user/sa-projects").then((m) => ({ default: m.SaProjectsPage })),
);
const SaCapturePage = lazy(() =>
  import("@/pages/edifice/user/sa-capture").then((m) => ({ default: m.SaCapturePage })),
);
const SaObservationsPage = lazy(() =>
  import("@/pages/edifice/user/sa-observations").then((m) => ({ default: m.SaObservationsPage })),
);
const SaSiteQueriesPage = lazy(() =>
  import("@/pages/edifice/user/sa-site-queries").then((m) => ({ default: m.SaSiteQueriesPage })),
);
const SaReportsPage = lazy(() =>
  import("@/pages/edifice/user/sa-reports").then((m) => ({ default: m.SaReportsPage })),
);
const SaChatPage = lazy(() =>
  import("@/pages/edifice/user/sa-chat").then((m) => ({ default: m.SaChatPage })),
);
const SaObservationDetailPage = lazy(() =>
  import("@/pages/edifice/user/sa-observation-detail").then((m) => ({
    default: m.SaObservationDetailPage,
  })),
);
const SaGenerateReportPage = lazy(() =>
  import("@/pages/edifice/user/sa-generate-report").then((m) => ({
    default: m.SaGenerateReportPage,
  })),
);

// ── Admin: Validation ──────────────────────────────────────────────────
const ValAdminDashboardPage = lazy(() =>
  import("@/pages/edifice/admin/val-admin-dashboard").then((m) => ({
    default: m.ValAdminDashboardPage,
  })),
);
const ValAdminDetailsPage = lazy(() =>
  import("@/pages/edifice/admin/val-admin-details").then((m) => ({
    default: m.ValAdminDetailsPage,
  })),
);
const ValAdminDrawingsPage = lazy(() =>
  import("@/pages/edifice/admin/val-admin-drawings").then((m) => ({
    default: m.ValAdminDrawingsPage,
  })),
);
const ValAdminParametersPage = lazy(() =>
  import("@/pages/edifice/admin/val-admin-parameters").then((m) => ({
    default: m.ValAdminParametersPage,
  })),
);
const ValAdminProjectsMgmtPage = lazy(() =>
  import("@/pages/edifice/admin/val-admin-projects-mgmt").then((m) => ({
    default: m.ValAdminProjectsMgmtPage,
  })),
);
const ValAdminSettingsPage = lazy(() =>
  import("@/pages/edifice/admin/val-admin-settings").then((m) => ({
    default: m.ValAdminSettingsPage,
  })),
);
const ValAdminTasksPage = lazy(() =>
  import("@/pages/edifice/admin/val-admin-tasks").then((m) => ({ default: m.ValAdminTasksPage })),
);
const ValAdminTrainingPage = lazy(() =>
  import("@/pages/edifice/admin/val-admin-training").then((m) => ({
    default: m.ValAdminTrainingPage,
  })),
);
const ValAdminUsersPage = lazy(() =>
  import("@/pages/edifice/admin/val-admin-users").then((m) => ({ default: m.ValAdminUsersPage })),
);

// ── Admin: Site Agent ──────────────────────────────────────────────────
const SaAdminDashboardPage = lazy(() =>
  import("@/pages/edifice/admin/sa-admin-dashboard").then((m) => ({
    default: m.SaAdminDashboardPage,
  })),
);
const SaAdminAnalyticsPage = lazy(() =>
  import("@/pages/edifice/admin/sa-admin-analytics").then((m) => ({
    default: m.SaAdminAnalyticsPage,
  })),
);
const SaAdminObservationsPage = lazy(() =>
  import("@/pages/edifice/admin/sa-admin-observations").then((m) => ({
    default: m.SaAdminObservationsPage,
  })),
);
const SaAdminProjectsPage = lazy(() =>
  import("@/pages/edifice/admin/sa-admin-projects").then((m) => ({
    default: m.SaAdminProjectsPage,
  })),
);
const SaAdminProjectsMgmtPage = lazy(() =>
  import("@/pages/edifice/admin/sa-admin-projects-mgmt").then((m) => ({
    default: m.SaAdminProjectsMgmtPage,
  })),
);
const SaAdminReportsPage = lazy(() =>
  import("@/pages/edifice/admin/sa-admin-reports").then((m) => ({
    default: m.SaAdminReportsPage,
  })),
);
const SaAdminSettingsPage = lazy(() =>
  import("@/pages/edifice/admin/sa-admin-settings").then((m) => ({
    default: m.SaAdminSettingsPage,
  })),
);
const SaAdminTasksPage = lazy(() =>
  import("@/pages/edifice/admin/sa-admin-tasks").then((m) => ({ default: m.SaAdminTasksPage })),
);
const SaAdminUsersPage = lazy(() =>
  import("@/pages/edifice/admin/sa-admin-users").then((m) => ({ default: m.SaAdminUsersPage })),
);

// ── Site Team ──────────────────────────────────────────────────────────
const SiteHomePage = lazy(() =>
  import("@/pages/edifice/site/site-home").then((m) => ({ default: m.SiteHomePage })),
);
const SiteQueriesPage = lazy(() =>
  import("@/pages/edifice/site/site-queries").then((m) => ({ default: m.SiteQueriesPage })),
);
const SiteNewQueryPage = lazy(() =>
  import("@/pages/edifice/site/site-new-query").then((m) => ({ default: m.SiteNewQueryPage })),
);
const SiteQueryDetailPage = lazy(() =>
  import("@/pages/edifice/site/site-query-detail").then((m) => ({
    default: m.SiteQueryDetailPage,
  })),
);
const SiteUpdatesPage = lazy(() =>
  import("@/pages/edifice/site/site-updates").then((m) => ({ default: m.SiteUpdatesPage })),
);

// ── Fallback ───────────────────────────────────────────────────────────
const NotFoundPage = lazy(() =>
  import("@/pages/not-found").then((m) => ({ default: m.NotFoundPage })),
);

function withSuspense(el: React.ReactNode) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback fullscreen />}>{el}</Suspense>
    </ErrorBoundary>
  );
}

function RootLayout() {
  return (
    <>
      <SpaLinkInterceptor />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
  { path: "/", element: withSuspense(<EdifiLandingPage />) },

  // User – Validation
  { path: "/user/val-dashboard", element: withSuspense(<ValDashboardPage />) },
  { path: "/user/val-upload", element: withSuspense(<ValUploadPage />) },
  { path: "/user/val-projects", element: withSuspense(<ValProjectsPage />) },
  { path: "/user/val-references", element: withSuspense(<ValReferencesPage />) },
  { path: "/user/val-reports", element: withSuspense(<ValReportsPage />) },
  { path: "/user/val-stage-view", element: withSuspense(<ValStageViewPage />) },

  // User – Site Agent
  { path: "/user/sa-dashboard", element: withSuspense(<SaDashboardPage />) },
  { path: "/user/sa-projects", element: withSuspense(<SaProjectsPage />) },
  { path: "/user/sa-capture", element: withSuspense(<SaCapturePage />) },
  { path: "/user/sa-observations", element: withSuspense(<SaObservationsPage />) },
  { path: "/user/sa-site-queries", element: withSuspense(<SaSiteQueriesPage />) },
  { path: "/user/sa-reports", element: withSuspense(<SaReportsPage />) },
  { path: "/user/sa-chat", element: withSuspense(<SaChatPage />) },
  { path: "/user/sa-observation-detail", element: withSuspense(<SaObservationDetailPage />) },
  { path: "/user/sa-generate-report", element: withSuspense(<SaGenerateReportPage />) },

  // Admin – Validation
  { path: "/admin/val-admin-dashboard", element: withSuspense(<ValAdminDashboardPage />) },
  { path: "/admin/val-admin-details", element: withSuspense(<ValAdminDetailsPage />) },
  { path: "/admin/val-admin-drawings", element: withSuspense(<ValAdminDrawingsPage />) },
  { path: "/admin/val-admin-parameters", element: withSuspense(<ValAdminParametersPage />) },
  {
    path: "/admin/val-admin-projects-mgmt",
    element: withSuspense(<ValAdminProjectsMgmtPage />),
  },
  { path: "/admin/val-admin-settings", element: withSuspense(<ValAdminSettingsPage />) },
  { path: "/admin/val-admin-tasks", element: withSuspense(<ValAdminTasksPage />) },
  { path: "/admin/val-admin-training", element: withSuspense(<ValAdminTrainingPage />) },
  { path: "/admin/val-admin-users", element: withSuspense(<ValAdminUsersPage />) },

  // Admin – Site Agent
  { path: "/admin/sa-admin-dashboard", element: withSuspense(<SaAdminDashboardPage />) },
  { path: "/admin/sa-admin-analytics", element: withSuspense(<SaAdminAnalyticsPage />) },
  { path: "/admin/sa-admin-observations", element: withSuspense(<SaAdminObservationsPage />) },
  { path: "/admin/sa-admin-projects", element: withSuspense(<SaAdminProjectsPage />) },
  {
    path: "/admin/sa-admin-projects-mgmt",
    element: withSuspense(<SaAdminProjectsMgmtPage />),
  },
  { path: "/admin/sa-admin-reports", element: withSuspense(<SaAdminReportsPage />) },
  { path: "/admin/sa-admin-settings", element: withSuspense(<SaAdminSettingsPage />) },
  { path: "/admin/sa-admin-tasks", element: withSuspense(<SaAdminTasksPage />) },
  { path: "/admin/sa-admin-users", element: withSuspense(<SaAdminUsersPage />) },

  // Site Team
  { path: "/site/site-home", element: withSuspense(<SiteHomePage />) },
  { path: "/site/site-queries", element: withSuspense(<SiteQueriesPage />) },
  { path: "/site/site-new-query", element: withSuspense(<SiteNewQueryPage />) },
  { path: "/site/site-query-detail", element: withSuspense(<SiteQueryDetailPage />) },
  { path: "/site/site-updates", element: withSuspense(<SiteUpdatesPage />) },

  { path: "/404", element: withSuspense(<NotFoundPage />) },
  { path: "*", element: <Navigate to="/404" replace /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
