import { FileText, LayoutDashboard, MapPin, MessageSquare } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "@/app/store/hooks";
import { cn } from "@/shared/lib/cn";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/pdf", label: "PDF Library", icon: FileText },
  { to: "/site/observations", label: "Site Observations", icon: MapPin },
  { to: "/site/chat", label: "Chatbot", icon: MessageSquare },
];

export function Sidebar() {
  const open = useAppSelector((s) => s.ui.sidebarOpen);
  if (!open) return null;

  return (
    <aside className="w-60 shrink-0 border-r bg-muted/30">
      <nav className="flex flex-col gap-1 p-4">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
