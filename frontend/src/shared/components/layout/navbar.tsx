import { Menu, Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setTheme, toggleSidebar } from "@/app/store/slices/ui-slice";
import { Button } from "@/shared/components/ui/button";

export function Navbar() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.ui.theme);

  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-6">
      <Button variant="ghost" size="icon" onClick={() => dispatch(toggleSidebar())} aria-label="Toggle sidebar">
        <Menu className="h-5 w-5" />
      </Button>
      <Link to="/" className="font-semibold tracking-tight">
        AI Platform
      </Link>
      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => dispatch(setTheme(nextTheme))}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  );
}
