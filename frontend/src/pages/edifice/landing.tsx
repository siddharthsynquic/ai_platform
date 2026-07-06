import { EdIcon } from "@/shared/icons/edifice-icons";

export function EdifiLandingPage() {
  return (
    <>
      <style>{`
        .hero {
          min-height: 80vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 4rem 2rem;
          position: relative;
          overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(ellipse at 30% 20%, rgba(99,102,241,0.04) 0%, transparent 50%),
                      radial-gradient(ellipse at 70% 80%, rgba(249,115,22,0.03) 0%, transparent 50%);
          animation: heroFloat 20s ease-in-out infinite alternate;
          pointer-events: none;
        }
        @keyframes heroFloat {
          from { transform: translate(-2%, -1%) rotate(0deg); }
          to { transform: translate(2%, 1%) rotate(3deg); }
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px 6px 8px;
          background: var(--color-gray-100);
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-gray-600);
          margin-bottom: 2rem;
          animation: fadeIn 0.6s ease both;
        }
        .hero-badge .dot {
          width: 8px; height: 8px;
          background: var(--color-green-500);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }
        .hero h1 {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.05;
          margin-bottom: 1.5rem;
          max-width: 700px;
          animation: slideUp 0.7s var(--ease-out) 0.1s both;
        }
        .hero h1 span {
          background: linear-gradient(135deg, #6366f1, #ec4899, #f59e0b);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero .hero-sub {
          font-size: 1.125rem;
          color: var(--color-gray-400);
          max-width: 480px;
          margin-bottom: 2.5rem;
          line-height: 1.6;
          animation: slideUp 0.7s var(--ease-out) 0.2s both;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          animation: slideUp 0.7s var(--ease-out) 0.3s both;
        }
        .hero-actions .btn {
          padding: 16px 32px;
          font-size: 0.9375rem;
          border-radius: var(--radius-full);
          box-shadow: var(--shadow-lg);
        }
        .hero-actions .btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-xl);
        }
        .systems-section {
          padding: 5rem 2rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .system-card {
          position: relative;
          border-radius: var(--radius-3xl);
          padding: 3rem;
          overflow: hidden;
          transition: all 0.4s var(--ease-out);
          cursor: pointer;
          border: 1px solid var(--color-gray-100);
        }
        .system-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-2xl);
        }
        .system-card::after {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 200px; height: 200px;
          border-radius: 50%;
          opacity: 0.05;
          pointer-events: none;
        }
        .system-card-validation {
          background: linear-gradient(135deg, #fafafa, #f0f0ff);
        }
        .system-card-validation::after { background: #6366f1; }
        .system-card-siteagent {
          background: linear-gradient(135deg, #fafafa, #fff7ed);
        }
        .system-card-siteagent::after { background: #f59e0b; }
        .system-card-site {
          background: linear-gradient(135deg, #fafafa, #ecfdf5);
        }
        .system-card-site::after { background: #22c55e; }
        .system-card-site .system-icon { background: #22c55e; color: white; }
        .system-card .system-icon {
          width: 56px; height: 56px;
          border-radius: var(--radius-2xl);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.5rem;
          box-shadow: var(--shadow-md);
        }
        .system-card-validation .system-icon { background: #6366f1; color: white; }
        .system-card-siteagent .system-icon { background: #f59e0b; color: white; }
        .system-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
        }
        .system-card p {
          color: var(--color-gray-500);
          font-size: 0.9375rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          max-width: 400px;
        }
        .system-features {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 2rem;
        }
        .system-features .badge {
          background: rgba(255,255,255,0.8);
          border: 1px solid rgba(0,0,0,0.06);
          color: var(--color-gray-600);
          font-size: 0.6875rem;
        }
        .enter-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          font-size: 0.875rem;
          color: var(--color-black);
          transition: gap 0.2s;
        }
        .system-card:hover .enter-link { gap: 12px; }
        .landing-header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid var(--color-gray-100);
          padding: 0 2rem;
        }
        .landing-header-inner {
          max-width: 1100px;
          margin: 0 auto;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      `}</style>
      <div className="app-shell">
        <header className="landing-header">
          <div className="landing-header-inner">
            <div className="brand">
              <div className="brand-icon">
                <EdIcon name="sparkles" size={18} />
              </div>
              <div className="brand-text">
                <div className="brand-title">Edifice AI Automation</div>
                <div className="brand-sub">by Architerrax</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span
                className="flex items-center gap-2"
                style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-green-500)" }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--color-green-500)",
                  }}
                />
                Prototype v1.0
              </span>
              <a href="/user/val-projects" className="btn btn-primary btn-sm">
                Launch App
              </a>
            </div>
          </div>
        </header>

        <section className="hero">
          <div className="hero-badge">
            <span className="dot" />
            AI-Powered Platform · Phase 1
          </div>
          <h1>
            Intelligent Drawing
            <br />
            Validation & <span>Site Intelligence</span>
          </h1>
          <p className="hero-sub">
            A stage-aware AI validation engine and real-time site intelligence platform — designed
            for architecture teams that demand precision.
          </p>
          <div className="hero-actions">
            <a href="/user/val-projects" className="btn btn-primary">
              <EdIcon name="layers" size={18} />
              Drawing Validation
            </a>
            <a href="/user/sa-projects" className="btn btn-secondary">
              <EdIcon name="camera" size={18} />
              Site Agent — Office
            </a>
            <a
              href="/site/site-home"
              className="btn btn-secondary"
              style={{ background: "#22c55e", color: "white", borderColor: "#22c55e" }}
            >
              <EdIcon name="mapPin" size={18} />
              Site Team
            </a>
          </div>
        </section>

        <section className="systems-section">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p className="label mb-3" style={{ color: "var(--color-gray-400)" }}>
              Three Interconnected Interfaces
            </p>
            <h2 className="text-3xl" style={{ marginBottom: "0.5rem" }}>
              One Unified Intelligence Platform
            </h2>
            <p
              style={{
                color: "var(--color-gray-400)",
                fontSize: "1rem",
                maxWidth: 560,
                margin: "0 auto",
              }}
            >
              Office team runs validation and reviews site queries. Site team logs observations on
              the ground. Admin controls users, projects, and tasks.
            </p>
          </div>

          <div className="grid-3" style={{ gap: "1.5rem" }}>
            <a
              href="/user/val-projects"
              className="system-card system-card-validation animate-slide-up stagger-1"
            >
              <div className="system-icon">
                <EdIcon name="layers" size={24} />
              </div>
              <h3>System 01 — Drawing Validation</h3>
              <p>
                Three-stage PDF drawing validation (SD → DD → GFC) with stage-specific AI training
                — spatial intelligence, detail validation & cross-referencing.
              </p>
              <div className="system-features">
                <span className="badge">SD Stage</span>
                <span className="badge">DD Stage</span>
                <span className="badge">GFC Stage</span>
                <span className="badge">Standard Details</span>
                <span className="badge">Precedent Search</span>
                <span className="badge">Stage Progression</span>
              </div>
              <div className="enter-link">
                Enter Validation Dashboard
                <EdIcon name="arrowRight" size={16} />
              </div>
            </a>

            <a
              href="/user/sa-projects"
              className="system-card system-card-siteagent animate-slide-up stagger-2"
            >
              <div className="system-icon">
                <EdIcon name="camera" size={24} />
              </div>
              <h3>System 02 — Site Agent</h3>
              <p>
                Real-time site documentation via images, voice notes & geo-tagged observations —
                indexed dashboard with reporting, chatbot & query resolution.
              </p>
              <div className="system-features">
                <span className="badge">Photo Capture</span>
                <span className="badge">Voice Notes</span>
                <span className="badge">Spatial Tagging</span>
                <span className="badge">AI Chatbot</span>
                <span className="badge">Reports</span>
                <span className="badge">Issue Mgmt</span>
              </div>
              <div className="enter-link">
                Enter Site Agent Dashboard
                <EdIcon name="arrowRight" size={16} />
              </div>
            </a>

            <a
              href="/site/site-home"
              className="system-card system-card-site animate-slide-up stagger-3"
            >
              <div className="system-icon">
                <EdIcon name="mapPin" size={24} />
              </div>
              <h3>Site Team Interface</h3>
              <p>
                Simple, mobile-first interface for field teams — log queries, attach photos, pin on
                PDF plans, and get office replies.
              </p>
              <div className="system-features">
                <span className="badge">Quick Logging</span>
                <span className="badge">Photo Capture</span>
                <span className="badge">Pin on Plan</span>
                <span className="badge">Voice Notes</span>
                <span className="badge">Office Updates</span>
                <span className="badge">Mobile-First</span>
              </div>
              <div className="enter-link">
                Open Site Team App
                <EdIcon name="arrowRight" size={16} />
              </div>
            </a>
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <p
              style={{
                color: "var(--color-gray-400)",
                fontSize: "0.875rem",
                marginBottom: "1rem",
              }}
            >
              Administration
            </p>
            <div className="flex justify-center gap-3">
              <a href="/admin/val-admin-dashboard" className="btn btn-secondary btn-sm">
                <EdIcon name="shield" size={14} />
                Validation Admin
              </a>
              <a href="/admin/sa-admin-dashboard" className="btn btn-secondary btn-sm">
                <EdIcon name="shield" size={14} />
                Site Agent Admin
              </a>
            </div>
          </div>
        </section>

        <footer className="app-footer">
          <div className="footer-inner" style={{ maxWidth: 1100 }}>
            <div
              className="flex"
              style={{ gap: "4rem", alignItems: "flex-start", flexWrap: "wrap" }}
            >
              <div className="footer-brand" style={{ flex: 1, minWidth: 240 }}>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="brand-icon"
                    style={{ width: 28, height: 28, fontSize: "0.7rem" }}
                  >
                    <EdIcon name="sparkles" size={14} />
                  </div>
                  <span style={{ fontWeight: 700, fontSize: "0.875rem" }}>
                    Edifice AI Automation
                  </span>
                </div>
                <p>
                  AI-powered drawing validation and site intelligence platform built for
                  architecture teams. Designed and deployed by Architerrax.
                </p>
              </div>
              <div>
                <p className="label mb-3">Connect</p>
                <div className="footer-social">
                  <a
                    href="https://www.linkedin.com/company/architerrax"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <EdIcon name="linkedin" size={15} />
                  </a>
                  <a
                    href="https://www.instagram.com/architerrax"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <EdIcon name="instagram" size={15} />
                  </a>
                  <a
                    href="https://www.architerrax.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <EdIcon name="globe" size={15} />
                  </a>
                  <a href="mailto:info@architerrax.com">
                    <EdIcon name="mail" size={15} />
                  </a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2026 Edifice AI Automation. All rights reserved.</p>
              <p>Powered by AI · Architerrax</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
