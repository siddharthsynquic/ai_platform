import { useEffect, type PropsWithChildren } from "react";
import { useAppSelector } from "@/app/store/hooks";

export function ThemeProvider({ children }: PropsWithChildren) {
  const theme = useAppSelector((s) => s.ui.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.add(dark ? "dark" : "light");
      return;
    }
    root.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
}
