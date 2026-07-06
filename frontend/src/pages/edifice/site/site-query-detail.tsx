import { EdIcon } from "@/shared/icons/edifice-icons";

export function SiteQueryDetailPage() {
  return (
    <>
      <style>{`
        body { background: var(--color-gray-50); }
        .site-shell { max-width: 480px; margin: 0 auto; min-height: 100vh; display: flex; flex-direction: column; background: white; }
        .site-header { padding: 16px 20px; background: var(--color-black); color: white; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50; }
        .site-content { flex: 1; padding: 0; }
        .detail-section { padding: 16px 20px; border-bottom: 1px solid var(--color-gray-100); }
        .detail-label { font-size: 0.5625rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-gray-400); margin-bottom: 6px; }
        .photo-strip { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; }
        .photo-thumb { width: 80px; height: 80px; border-radius: var(--radius-lg); background: linear-gradient(135deg, #d0d0d0, #b0b0b0); flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.6); cursor: pointer; }
        .plan-mini { background: var(--color-gray-900); border-radius: var(--radius-xl); height: 180px; position: relative; display: flex; align-items: center; justify-content: center; color: var(--color-gray-500); overflow: hidden; }
        .pin { position: absolute; width: 24px; height: 24px; background: var(--color-red-500); border: 2px solid white; border-radius: 50%; box-shadow: var(--shadow-md); display: flex; align-items: center; justify-content: center; color: white; font-size: 0.5rem; font-weight: 800; transform: translate(-50%, -50%); }
        .meta-row { display: flex; gap: 16px; flex-wrap: wrap; }
        .meta-item { font-size: 0.75rem; }
        .meta-item span { font-weight: 700; display: block; margin-top: 1px; }
        .thread-msg { padding: 14px 20px; border-bottom: 1px solid var(--color-gray-50); }
        .thread-msg-office { background: var(--color-blue-50); }
        .thread-avatar { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.5rem; font-weight: 700; color: white; flex-shrink: 0; }
        .reply-bar { position: sticky; bottom: 0; padding: 12px 20px; background: white; border-top: 1px solid var(--color-gray-100); z-index: 50; display: flex; gap: 8px; align-items: center; }
        .reply-bar input { flex: 1; padding: 10px 14px; border: 1px solid var(--color-gray-200); border-radius: var(--radius-xl); font-size: 0.8125rem; font-family: inherit; outline: none; }
        .reply-bar input:focus { border-color: var(--color-black); }
      `}</style>
      <div className="site-shell">
        <header className="site-header">
          <a href="/site/site-queries" style={{ color: "white", display: "flex", alignItems: "center", gap: "8px" }}>
            <EdIcon name="chevronLeft" size={18} />
            <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>QRY-255</span>
          </a>
          <span className="badge severity-critical" style={{ fontSize: "0.625rem" }}>Critical</span>
        </header>

        <div className="site-content">
          {/* Title + Status */}
          <div className="detail-section">
            <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "4px" }}>Waterproofing breach — parapet junction</h2>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-500)", marginBottom: "10px" }}>Gap approximately 15cm in waterproofing membrane at parapet junction, east side. Requires immediate contractor attention before next pour.</p>
            <div className="flex gap-2">
              <span className="badge badge-red" style={{ fontSize: "0.625rem" }}>Open</span>
              <span className="badge badge-gray" style={{ fontSize: "0.625rem" }}>Facade / Envelope</span>
              <span className="badge badge-gray" style={{ fontSize: "0.625rem" }}>14 min ago</span>
            </div>
          </div>

          {/* Photos */}
          <div className="detail-section">
            <div className="detail-label">📸 Photos (2)</div>
            <div className="photo-strip">
              <div className="photo-thumb"><EdIcon name="image" size={20} /></div>
              <div className="photo-thumb" style={{ background: "linear-gradient(135deg, #c0bfe0, #a0a0d0)" }}><EdIcon name="image" size={20} /></div>
              <div className="photo-thumb" style={{ background: "var(--color-gray-100)", color: "var(--color-gray-300)", border: "2px dashed var(--color-gray-200)" }}><EdIcon name="plus" size={16} /></div>
            </div>
          </div>

          {/* Plan Pin */}
          <div className="detail-section">
            <div className="detail-label">📍 Location on Plan</div>
            <div className="plan-mini">
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: "0.75rem", fontWeight: 600 }}>Floor 12 Plan</p>
                <p style={{ fontSize: "0.5625rem", opacity: 0.5 }}>PDF plan view</p>
              </div>
              <div className="pin" style={{ top: "35%", left: "62%" }}>●</div>
            </div>
            <div className="flex gap-3 mt-2" style={{ fontSize: "0.75rem", color: "var(--color-gray-500)" }}>
              <span><strong>Floor:</strong> 12</span>
              <span><strong>Zone:</strong> A — East</span>
              <span><strong>Grid:</strong> C-7</span>
            </div>
          </div>

          {/* Meta */}
          <div className="detail-section">
            <div className="detail-label">Details</div>
            <div className="meta-row">
              <div className="meta-item" style={{ color: "var(--color-gray-500)" }}>Logged by<span style={{ color: "var(--color-black)" }}>Site Team 1</span></div>
              <div className="meta-item" style={{ color: "var(--color-gray-500)" }}>Trade<span style={{ color: "var(--color-black)" }}>Facade</span></div>
              <div className="meta-item" style={{ color: "var(--color-gray-500)" }}>Assigned to<span style={{ color: "var(--color-black)" }}>Contractor X</span></div>
              <div className="meta-item" style={{ color: "var(--color-gray-500)" }}>SLA<span style={{ color: "var(--color-red-500)" }}>Due in 2 days</span></div>
            </div>
          </div>

          {/* Voice Note */}
          <div className="detail-section">
            <div className="detail-label">🎤 Voice Note</div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "var(--color-gray-50)", padding: "10px 14px", borderRadius: "var(--radius-xl)" }}>
              <button style={{ width: "32px", height: "32px", background: "var(--color-black)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", flexShrink: 0 }}>
                <EdIcon name="play" size={14} />
              </button>
              <div style={{ flex: 1, height: "4px", background: "var(--color-gray-200)", borderRadius: "2px", position: "relative" }}>
                <div style={{ width: "45%", height: "100%", background: "var(--color-black)", borderRadius: "2px" }}></div>
              </div>
              <span style={{ fontSize: "0.625rem", color: "var(--color-gray-400)", flexShrink: 0 }}>0:18</span>
            </div>
            <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)", fontStyle: "italic", marginTop: "6px" }}>"There's a significant gap in the waterproofing membrane at the parapet junction on the east side..."</p>
          </div>

          {/* Conversation Thread */}
          <div style={{ padding: "12px 20px" }}>
            <div className="detail-label">💬 Updates (3)</div>
          </div>

          <div className="thread-msg">
            <div className="flex items-center gap-2 mb-2">
              <div className="thread-avatar" style={{ background: "var(--color-green-500)" }}>T1</div>
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>Site Team 1</span>
                <span style={{ fontSize: "0.5625rem", color: "var(--color-gray-400)", marginLeft: "6px" }}>14 min ago</span>
              </div>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-700)" }}>Logged observation with 2 photos and voice note. Waterproofing membrane gap at parapet junction. Approx 15cm. Marked as critical.</p>
          </div>

          <div className="thread-msg thread-msg-office">
            <div className="flex items-center gap-2 mb-2">
              <div className="thread-avatar" style={{ background: "var(--color-blue-500)" }}>RS</div>
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>Ar. Sharma <span style={{ fontSize: "0.5625rem", fontWeight: 400, color: "var(--color-blue-500)" }}>Office</span></span>
                <span style={{ fontSize: "0.5625rem", color: "var(--color-gray-400)", marginLeft: "6px" }}>10 min ago</span>
              </div>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-700)" }}>Stop work on parapet area immediately. Contractor X has been notified. Please take additional photos from the east corner for the remediation spec.</p>
            <div style={{ background: "white", border: "1px solid var(--color-blue-100)", borderRadius: "var(--radius-lg)", padding: "8px 12px", marginTop: "8px", fontSize: "0.6875rem" }}>
              📎 Referenced: <strong>SD-WP-012</strong> — Waterproofing Membrane Standard Detail
            </div>
          </div>

          <div className="thread-msg">
            <div className="flex items-center gap-2 mb-2">
              <div className="thread-avatar" style={{ background: "var(--color-green-500)" }}>T1</div>
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>Site Team 1</span>
                <span style={{ fontSize: "0.5625rem", color: "var(--color-gray-400)", marginLeft: "6px" }}>5 min ago</span>
              </div>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-700)" }}>Work stopped. Additional photos coming in 10 minutes. Contractor X crew on standby.</p>
          </div>

          <div style={{ height: "60px" }}></div>
        </div>

        {/* Reply Bar */}
        <div className="reply-bar">
          <button style={{ width: "36px", height: "36px", background: "var(--color-gray-100)", borderRadius: "var(--radius-lg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <EdIcon name="camera" size={16} />
          </button>
          <input type="text" placeholder="Add update..." />
          <button style={{ width: "36px", height: "36px", background: "var(--color-black)", borderRadius: "var(--radius-lg)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", flexShrink: 0 }}>
            <EdIcon name="send" size={14} />
          </button>
        </div>
      </div>
    </>
  );
}
