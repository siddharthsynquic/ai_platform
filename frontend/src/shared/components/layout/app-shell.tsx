import type { PropsWithChildren } from "react";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
