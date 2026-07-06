import { useEffect, useState, type PropsWithChildren, type ReactNode } from "react";
import { EdIcon } from "@/shared/icons/edifice-icons";

export type EdSystem = "validation" | "site-agent";
export type EdSection = "user" | "admin";

interface EdifiHeaderProps {
  system: EdSystem;
  activeNav: string;
  section?: EdSection;
}

const USER_VAL_NAV: [string, string, string][] = [
  ["dashboard", "Dashboard", "barChart"],
  ["upload", "Upload", "upload"],
  ["validation", "Reports", "clipboardList"],
  ["stage-view", "Stage View", "layers"],
  ["references", "References", "fileText"],
];

const USER_SA_NAV: [string, string, string][] = [
  ["dashboard", "Dashboard", "barChart"],
  ["capture", "Capture", "camera"],
  ["observations", "Observations", "database"],
  ["site-queries", "Site Queries", "inbox"],
  ["reports", "Reports", "fileText"],
  ["chat", "AI Chat", "messageSquare"],
];

const ADMIN_VAL_NAV: [string, string, string][] = [
  ["dashboard", "Dashboard", "barChart"],
  ["drawings", "Drawing Database", "database"],
  ["details", "Standard Details", "folder"],
  ["parameters", "Validation Rules", "shield"],
  ["tasks", "Review Tasks", "checkSquare"],
  ["training", "Training", "zap"],
  ["users", "Users", "users"],
  ["settings", "Settings", "settings"],
];

const ADMIN_SA_NAV: [string, string, string][] = [
  ["dashboard", "Dashboard", "barChart"],
  ["projects", "Projects", "building"],
  ["observations", "All Observations", "database"],
  ["tasks", "Assign Tasks", "checkSquare"],
  ["analytics", "Analytics", "trendingUp"],
  ["reports", "Report Config", "fileText"],
  ["users", "Team", "users"],
  ["settings", "Settings", "settings"],
];

function hrefFor(key: string, system: EdSystem, section: EdSection): string {
  const isVal = system === "validation";
  const isAdmin = section === "admin";
  const base = isAdmin ? "/admin/" : "/user/";
  const file: Record<string, string> = {
    dashboard: isVal ? "val-dashboard" : "sa-dashboard",
    upload: "val-upload",
    validation: "val-reports",
    "stage-view": "val-stage-view",
    references: "val-references",
    capture: "sa-capture",
    "site-queries": "sa-site-queries",
    observations:
      isVal && isAdmin ? "val-admin-drawings" : isAdmin ? "sa-admin-observations" : "sa-observations",
    reports: isAdmin ? (isVal ? "val-admin-dashboard" : "sa-admin-reports") : isVal ? "val-reports" : "sa-reports",
    chat: "sa-chat",
    drawings: "val-admin-drawings",
    details: "val-admin-details",
    parameters: "val-admin-parameters",
    training: "val-admin-training",
    users: isVal ? "val-admin-users" : "sa-admin-users",
    settings: isVal ? "val-admin-settings" : "sa-admin-settings",
    tasks: isVal ? "val-admin-tasks" : "sa-admin-tasks",
    projects: "sa-admin-projects",
    analytics: "sa-admin-analytics",
  };
  const admin = isAdmin ? { ...file, dashboard: isVal ? "val-admin-dashboard" : "sa-admin-dashboard" } : file;
  return base + (admin[key] || "");
}

export function EdifiHeader({ system, activeNav, section = "user" }: EdifiHeaderProps) {
  const isVal = system === "validation";
  const isAdmin = section === "admin";
  const nav = isAdmin ? (isVal ? ADMIN_VAL_NAV : ADMIN_SA_NAV) : isVal ? USER_VAL_NAV : USER_SA_NAV;

  const [projectOpen, setProjectOpen] = useState(false);
  const [project, setProject] = useState("Tower A — Marina Bay");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!projectOpen) return;
    const close = () => setProjectOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [projectOpen]);

  const projects = [
    ["Tower A — Marina Bay", "var(--color-green-500)"],
    ["Mall Block C", "var(--color-amber-400)"],
    ["Residences Phase 2", "var(--color-blue-400)"],
    ["Office Tower East", "var(--color-purple-400)"],
  ];

  const switchTo = isAdmin ? "/user/" : "/admin/";
  const switchTarget = switchTo + (isVal ? "val-admin-dashboard" : "sa-admin-dashboard");

  return (
    <header className="app-header">
      <div className="header-inner wide">
        <a href="/" className="brand">
          <div className="brand-icon">
            <EdIcon name="sparkles" size={18} />
          </div>
          <div className="brand-text">
            <div className="brand-title">Edifice AI Automation</div>
            <div className="brand-sub">by Architerrax</div>
          </div>
        </a>
        <div className="flex items-center gap-4">
          <div className="system-switcher">
            <a href="/user/val-dashboard" className={`system-btn ${isVal ? "active" : ""}`}>
              Drawing Validation
            </a>
            <a href="/user/sa-dashboard" className={`system-btn ${!isVal ? "active" : ""}`}>
              Site Agent
            </a>
          </div>
          <div className="project-selector">
            <button
              className="project-selector-btn"
              onClick={(e) => {
                e.stopPropagation();
                setProjectOpen((o) => !o);
              }}
            >
              <EdIcon name="building" size={12} />
              <span>{project}</span>
              <EdIcon name="chevronDown" size={10} />
            </button>
            <div
              className={`project-dropdown ${projectOpen ? "open" : ""}`}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="text"
                className="project-dropdown-search"
                placeholder="Search projects…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div>
                {projects
                  .filter(([n]) => n.toLowerCase().includes(search.toLowerCase()))
                  .map(([name, color]) => (
                    <div
                      key={name}
                      className={`project-dropdown-item ${project === name ? "active" : ""}`}
                      onClick={() => {
                        setProject(name);
                        setProjectOpen(false);
                      }}
                    >
                      <span className="project-dot" style={{ background: color }} />
                      <span>{name}</span>
                    </div>
                  ))}
              </div>
              <div className="project-dropdown-footer">
                <a
                  href={`/admin/${isVal ? "val-admin-projects-mgmt" : "sa-admin-projects-mgmt"}`}
                  className="project-dropdown-item"
                  style={{ color: "var(--color-gray-400)", fontSize: "0.75rem" }}
                >
                  <EdIcon name="settings" size={12} />
                  <span>Manage Projects</span>
                </a>
              </div>
            </div>
          </div>
          <nav className="nav-links">
            {nav.map(([key, label, ic]) => (
              <a
                key={key}
                href={hrefFor(key, system, section)}
                className={`nav-link ${activeNav === key ? "active" : ""}`}
              >
                <EdIcon name={ic} size={15} />
                {label}
              </a>
            ))}
          </nav>
          <div style={{ borderLeft: "1px solid var(--color-gray-200)", paddingLeft: 16, marginLeft: 8 }}>
            <a
              href={switchTarget}
              className={`nav-link ${isAdmin ? "active" : ""}`}
              style={{ fontSize: "0.75rem" }}
            >
              <EdIcon name="shield" size={14} />
              {isAdmin ? "Exit Admin" : "Admin"}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export function EdifiFooter() {
  return (
    <footer className="app-footer">
      <div className="footer-inner wide">
        <div className="flex" style={{ gap: "4rem", alignItems: "flex-start", flexWrap: "wrap" }}>
          <div className="footer-brand" style={{ flex: 1, minWidth: 240 }}>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="brand-icon"
                style={{ width: 28, height: 28, fontSize: "0.7rem" }}
              >
                <EdIcon name="sparkles" size={14} />
              </div>
              <span style={{ fontWeight: 700, fontSize: "0.875rem" }}>Edifice AI Automation</span>
            </div>
            <p>
              AI-powered drawing validation and site intelligence platform built for architecture teams.
              Designed and deployed by Architerrax.
            </p>
          </div>
          <div>
            <p className="label mb-3">Connect</p>
            <div className="footer-social">
              <a href="https://www.linkedin.com/company/architerrax" target="_blank" rel="noopener noreferrer">
                <EdIcon name="linkedin" size={15} />
              </a>
              <a href="https://www.instagram.com/architerrax" target="_blank" rel="noopener noreferrer">
                <EdIcon name="instagram" size={15} />
              </a>
              <a href="https://www.architerrax.com" target="_blank" rel="noopener noreferrer">
                <EdIcon name="globe" size={15} />
              </a>
              <a href="mailto:info@architerrax.com">
                <EdIcon name="mail" size={15} />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Edifice AI Automation. All rights reserved.</p>
          <p>Powered by AI · Architerrax</p>
        </div>
      </div>
    </footer>
  );
}

interface ChatMsg {
  role: "user" | "ai";
  text: string;
}

const AI_REPLIES = [
  "I've found 3 relevant precedents from past DD submissions. Would you like me to show them?",
  "Based on the validation rules for GFC stage, this drawing requires dimensional precision checks on all structural elements.",
  "I can see 12 open observations on Floor 7. 4 are critical MEP issues that need immediate attention.",
  "The standard detail SD-STAIR-004 matches your query. It covers handrail height, fixing methods, and return details.",
  "I've analyzed the uploaded drawing. Stage detected: Design Development (DD). 3 validation flags found.",
];

export function EdifiChatWidget({ systemName = "Drawing Validation" }: { systemName?: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "ai",
      text: `Hello! I'm your AI assistant for ${systemName}. Ask me anything about your drawings, validations, or site observations.`,
    },
  ]);
  const [input, setInput] = useState("");

  function send() {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTimeout(() => {
      const reply = AI_REPLIES[Math.floor(Math.random() * AI_REPLIES.length)];
      setMessages((m) => [...m, { role: "ai", text: reply }]);
    }, 800);
  }

  return (
    <>
      {!open && (
        <button className="floating-chat-btn" onClick={() => setOpen(true)}>
          <EdIcon name="messageSquare" size={18} />
          <span>AI Assistant</span>
        </button>
      )}
      {open && (
        <div className="chat-panel">
          <div className="chat-header">
            <div className="flex items-center gap-3">
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: "var(--color-black)",
                  borderRadius: "var(--radius-xl)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                <EdIcon name="messageSquare" size={14} />
              </div>
              <div>
                <p style={{ fontSize: "0.875rem", fontWeight: 700 }}>Edifice AI</p>
                <p style={{ fontSize: "0.625rem", color: "var(--color-gray-400)" }}>
                  {systemName} Assistant
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ padding: 8, borderRadius: "var(--radius-xl)", color: "var(--color-gray-400)" }}
            >
              <EdIcon name="x" size={16} />
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble chat-bubble-${m.role}`}>
                {m.text}
              </div>
            ))}
          </div>
          <div className="chat-input-area">
            <input
              type="text"
              className="form-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask something..."
              style={{ borderRadius: "var(--radius-xl)", fontSize: "0.8125rem", padding: "10px 14px" }}
            />
            <button
              className="btn btn-primary"
              onClick={send}
              style={{ padding: 10, borderRadius: "var(--radius-xl)" }}
            >
              <EdIcon name="send" size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

interface EdifiShellProps extends PropsWithChildren {
  system: EdSystem;
  activeNav: string;
  section?: EdSection;
  wide?: boolean;
  chat?: boolean;
  header?: ReactNode;
}

export function EdifiShell({
  system,
  activeNav,
  section = "user",
  wide = true,
  chat = true,
  children,
}: EdifiShellProps) {
  const systemName = system === "validation" ? "Drawing Validation" : "Site Agent";
  return (
    <div className="app-shell">
      <EdifiHeader system={system} activeNav={activeNav} section={section} />
      <main className={`main-content ${wide ? "wide" : ""} animate-in`}>{children}</main>
      <EdifiFooter />
      {chat && <EdifiChatWidget systemName={systemName} />}
    </div>
  );
}
