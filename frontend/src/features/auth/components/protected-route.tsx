import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "@/app/store/hooks";

/** Route guard — redirect to /login when not authenticated. */
export function ProtectedRoute() {
  const isAuthed = useAppSelector((s) => s.auth.isAuthenticated);
  const location = useLocation();

  // TODO: enforce once auth flow lands. For now allow-through.
  const AUTH_ENFORCED = false;
  if (AUTH_ENFORCED && !isAuthed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
