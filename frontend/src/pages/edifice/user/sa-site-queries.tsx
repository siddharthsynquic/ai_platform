import { useState } from "react";
import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { EdIcon } from "@/shared/icons/edifice-icons";

export function SaSiteQueriesPage() {
  const [ackLabel, setAckLabel] = useState<{ text: string; bg?: string }>({ text: "Acknowledge" });

  const handleAck = () => {
    setAckLabel({ text: "✓ Acknowledged", bg: "var(--color-green-600)" });
  };

  return (
    <>
      <style>{`
    .query-panel { display: flex; height: calc(100vh - 64px); overflow: hidden; }
    .query-list-pane { width: 380px; border-right: 1px solid var(--color-gray-100); overflow-y: auto; flex-shrink: 0; background: var(--color-gray-50); }
    .query-detail-pane { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
    .ql-header { padding: 1.25rem; border-bottom: 1px solid var(--color-gray-100); background: white; }
    .ql-item { padding: 14px 20px; border-bottom: 1px solid var(--color-gray-100); cursor: pointer; transition: background 0.15s; }
    .ql-item:hover { background: white; }
    .ql-item.active { background: white; border-left: 3px solid var(--color-black); }
    .ql-item.unread { background: var(--color-blue-50); }
    .qd-header { padding: 1.25rem 2rem; border-bottom: 1px solid var(--color-gray-100); background: white; }
    .qd-body { flex: 1; overflow-y: auto; padding: 2rem; }
    .qd-reply { padding: 1rem 2rem; border-top: 1px solid var(--color-gray-100); background: white; }
    .photo-row { display: flex; gap: 8px; }
    .photo-thumb { width: 80px; height: 80px; border-radius: var(--radius-lg); background: linear-gradient(135deg, #d0d0d0, #b0b0b0); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.6); cursor: pointer; }
    .plan-embed { background: var(--color-gray-900); border-radius: var(--radius-xl); height: 200px; position: relative; display: flex; align-items: center; justify-content: center; color: var(--color-gray-500); overflow: hidden; }
    .plan-pin { position: absolute; width: 24px; height: 24px; background: var(--color-red-500); border: 2px solid white; border-radius: 50%; box-shadow: var(--shadow-md); display: flex; align-items: center; justify-content: center; color: white; font-size: 0.5rem; font-weight: 800; transform: translate(-50%, -50%); }
    .thread-bubble { padding: 12px 16px; border-radius: var(--radius-xl); font-size: 0.875rem; line-height: 1.5; max-width: 600px; }
    .thread-site { background: var(--color-gray-50); border: 1px solid var(--color-gray-100); border-bottom-left-radius: 4px; }
    .thread-office { background: var(--color-blue-50); border: 1px solid var(--color-blue-100); border-bottom-right-radius: 4px; align-self: flex-end; margin-left: auto; }
    .reply-row { display: flex; gap: 8px; align-items: flex-end; }
    .reply-row textarea { flex: 1; padding: 12px 16px; border: 1px solid var(--color-gray-200); border-radius: var(--radius-xl); font-size: 0.875rem; font-family: inherit; outline: none; resize: none; min-height: 44px; max-height: 120px; transition: border-color 0.2s; }
    .reply-row textarea:focus { border-color: var(--color-black); }
    .action-toolbar { display: flex; gap: 8px; margin-bottom: 1rem; }
  `}</style>
      <EdifiShell system="site-agent" activeNav="site-queries" section="user">
        <div className="query-panel">
          {/* Left: Query List */}
          <div className="query-list-pane">
            <div className="ql-header">
              <div className="flex items-center justify-between mb-3">
                <span style={{ fontSize: "0.9375rem", fontWeight: 700 }}>Site Queries</span>
                <span className="badge badge-red">8 new</span>
              </div>
              <input type="text" className="form-input" placeholder="Search queries..." style={{ fontSize: "0.8125rem" }} />
              <div className="flex gap-2 mt-2">
                <select className="form-input form-select" style={{ fontSize: "0.6875rem", padding: "4px 22px 4px 8px", flex: 1 }}>
                  <option>All Status</option>
                  <option>Unreviewed</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
                <select className="form-input form-select" style={{ fontSize: "0.6875rem", padding: "4px 22px 4px 8px", flex: 1 }}>
                  <option>All Severity</option>
                  <option>Critical</option>
                  <option>Major</option>
                </select>
              </div>
            </div>

            <div className="ql-item active">
              <div className="flex items-center justify-between mb-1">
                <strong style={{ fontSize: "0.8125rem" }}>Waterproofing breach — parapet</strong>
                <span className="badge severity-critical" style={{ fontSize: "0.5rem" }}>Critical</span>
              </div>
              <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Site Team 1 · Floor 12, Zone A · 14 min</p>
              <div className="flex gap-1 mt-1">
                <span className="badge badge-gray" style={{ fontSize: "0.5rem" }}>📸 2</span>
                <span className="badge badge-gray" style={{ fontSize: "0.5rem" }}>🎤</span>
                <span className="badge badge-gray" style={{ fontSize: "0.5rem" }}>📍</span>
                <span className="badge badge-red" style={{ fontSize: "0.5rem" }}>Unreviewed</span>
              </div>
            </div>
            <div className="ql-item unread">
              <div className="flex items-center justify-between mb-1">
                <strong style={{ fontSize: "0.8125rem" }}>Rebar spacing mismatch</strong>
                <span className="badge severity-major" style={{ fontSize: "0.5rem" }}>Major</span>
              </div>
              <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Site Team 2 · Floor 7, Core B · 42 min</p>
              <div className="flex gap-1 mt-1">
                <span className="badge badge-gray" style={{ fontSize: "0.5rem" }}>📸 3</span>
                <span className="badge badge-gray" style={{ fontSize: "0.5rem" }}>📍</span>
                <span className="badge badge-amber" style={{ fontSize: "0.5rem" }}>In Progress</span>
              </div>
            </div>
            <div className="ql-item unread">
              <div className="flex items-center justify-between mb-1">
                <strong style={{ fontSize: "0.8125rem" }}>HVAC duct clearance</strong>
                <span className="badge severity-minor" style={{ fontSize: "0.5rem" }}>Minor</span>
              </div>
              <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Eng. Patel · Floor 9, Zone C · 2 hrs</p>
              <div className="flex gap-1 mt-1">
                <span className="badge badge-gray" style={{ fontSize: "0.5rem" }}>📸 4</span>
                <span className="badge badge-gray" style={{ fontSize: "0.5rem" }}>🎤</span>
                <span className="badge badge-red" style={{ fontSize: "0.5rem" }}>Unreviewed</span>
              </div>
            </div>
            <div className="ql-item">
              <div className="flex items-center justify-between mb-1">
                <strong style={{ fontSize: "0.8125rem" }}>Fire damper not installed</strong>
                <span className="badge severity-critical" style={{ fontSize: "0.5rem" }}>Critical</span>
              </div>
              <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Site Team 1 · Floor 4, Core A · 5 hrs</p>
              <div className="flex gap-1 mt-1">
                <span className="badge badge-gray" style={{ fontSize: "0.5rem" }}>📸 1</span>
                <span className="badge badge-amber" style={{ fontSize: "0.5rem" }}>In Progress</span>
              </div>
            </div>
            <div className="ql-item">
              <div className="flex items-center justify-between mb-1">
                <strong style={{ fontSize: "0.8125rem" }}>Facade panel alignment</strong>
                <span className="badge severity-minor" style={{ fontSize: "0.5rem" }}>Minor</span>
              </div>
              <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Site Team 2 · Elevation East · 1 hr</p>
              <div className="flex gap-1 mt-1">
                <span className="badge badge-gray" style={{ fontSize: "0.5rem" }}>📸 6</span>
                <span className="badge badge-green" style={{ fontSize: "0.5rem" }}>Resolved</span>
              </div>
            </div>
            <div className="ql-item">
              <div className="flex items-center justify-between mb-1">
                <strong style={{ fontSize: "0.8125rem" }}>Plumbing drainage slope</strong>
                <span className="badge severity-observation" style={{ fontSize: "0.5rem" }}>Note</span>
              </div>
              <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Site Team 1 · Floor 3, Washroom · Yesterday</p>
              <div className="flex gap-1 mt-1">
                <span className="badge badge-gray" style={{ fontSize: "0.5rem" }}>🎤</span>
                <span className="badge badge-green" style={{ fontSize: "0.5rem" }}>Resolved</span>
              </div>
            </div>
          </div>

          {/* Right: Query Detail */}
          <div className="query-detail-pane">
            <div className="qd-header">
              <div className="flex items-center justify-between">
                <div>
                  <h2 style={{ fontSize: "1.125rem", fontWeight: 700, marginBottom: "2px" }}>Waterproofing breach — parapet junction</h2>
                  <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>QRY-255 · Site Team 1 · Floor 12, Zone A — East · 14 min ago</p>
                </div>
                <div className="flex gap-2">
                  <span className="badge severity-critical" style={{ fontSize: "0.625rem" }}>Critical</span>
                  <span className="badge badge-red" style={{ fontSize: "0.625rem" }}>Unreviewed</span>
                </div>
              </div>
            </div>

            <div className="qd-body">
              {/* Action Toolbar */}
              <div className="action-toolbar">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={handleAck}
                  style={ackLabel.bg ? { background: ackLabel.bg } : undefined}
                >
                  <EdIcon name="check" size={12} /> {ackLabel.text}
                </button>
                <select className="form-input form-select" style={{ width: "auto", fontSize: "0.75rem", padding: "6px 26px 6px 10px" }}>
                  <option>Assign to...</option>
                  <option>Contractor X</option>
                  <option>Sub-contractor Y</option>
                  <option>Consultant Z</option>
                </select>
                <select className="form-input form-select" style={{ width: "auto", fontSize: "0.75rem", padding: "6px 26px 6px 10px" }}>
                  <option>Change status...</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                  <option>On Hold</option>
                </select>
                <button className="btn btn-secondary btn-sm">
                  <EdIcon name="fileText" size={12} /> Add to Report
                </button>
              </div>

              {/* Description */}
              <div className="card card-flat p-4 mb-4">
                <p style={{ fontSize: "0.875rem", color: "var(--color-gray-700)", lineHeight: 1.6 }}>Gap approximately 15cm in waterproofing membrane at parapet junction, east side. Requires immediate contractor attention before next pour.</p>
              </div>

              {/* Photos + Plan side by side */}
              <div className="grid-2 mb-4" style={{ gap: "1rem" }}>
                <div>
                  <p className="label mb-2">📸 Photos</p>
                  <div className="photo-row">
                    <div className="photo-thumb"><EdIcon name="image" size={18} /></div>
                    <div className="photo-thumb" style={{ background: "linear-gradient(135deg, #c0bfe0, #a0a0d0)" }}><EdIcon name="image" size={18} /></div>
                  </div>
                </div>
                <div>
                  <p className="label mb-2">📍 Pinned Location</p>
                  <div className="plan-embed" style={{ height: "80px" }}>
                    <p style={{ fontSize: "0.625rem" }}>Floor 12 Plan</p>
                    <div className="plan-pin" style={{ top: "35%", left: "62%" }}>●</div>
                  </div>
                  <div className="flex gap-2 mt-1" style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>
                    <span>Zone A</span><span>·</span><span>Grid C-7</span>
                  </div>
                </div>
              </div>

              {/* Voice */}
              <div className="card card-flat p-3 mb-4">
                <div className="flex items-center gap-3">
                  <button style={{ width: "28px", height: "28px", background: "var(--color-black)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", flexShrink: 0 }}>
                    <EdIcon name="play" size={12} />
                  </button>
                  <div style={{ flex: 1, height: "3px", background: "var(--color-gray-200)", borderRadius: "2px" }}>
                    <div style={{ width: "0%", height: "100%", background: "var(--color-black)", borderRadius: "2px" }}></div>
                  </div>
                  <span style={{ fontSize: "0.625rem", color: "var(--color-gray-400)" }}>0:18</span>
                </div>
                <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)", fontStyle: "italic", marginTop: "6px" }}>"There's a significant gap in the waterproofing membrane at the parapet junction on the east side..."</p>
              </div>

              {/* Metadata */}
              <div className="card card-flat p-4 mb-4">
                <div className="grid-4" style={{ gap: "1rem", fontSize: "0.75rem" }}>
                  <div><span style={{ color: "var(--color-gray-400)", display: "block" }}>Severity</span><strong>Critical</strong></div>
                  <div><span style={{ color: "var(--color-gray-400)", display: "block" }}>Trade</span><strong>Facade</strong></div>
                  <div><span style={{ color: "var(--color-gray-400)", display: "block" }}>Assigned</span><strong>Unassigned</strong></div>
                  <div><span style={{ color: "var(--color-gray-400)", display: "block" }}>SLA</span><strong style={{ color: "var(--color-red-500)" }}>2 days</strong></div>
                </div>
              </div>

              {/* Reference Lookup */}
              <div className="card card-flat p-4 mb-6" style={{ border: "1px solid var(--color-blue-100)", background: "var(--color-blue-50)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <div style={{ color: "var(--color-blue-500)" }}><EdIcon name="sparkles" size={14} /></div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-blue-600)" }}>AI Suggestion</span>
                </div>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-700)" }}>This query matches standard detail <strong>SD-WP-012</strong> — Waterproofing Membrane Parapet Junction. Consider referencing this in your reply.</p>
                <button className="btn btn-secondary btn-sm mt-2" style={{ fontSize: "0.6875rem" }}>Attach SD-WP-012 to Reply</button>
              </div>

              {/* Thread */}
              <p className="label mb-3">💬 Conversation</p>
              <div className="flex flex-col gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div style={{ width: "24px", height: "24px", background: "var(--color-green-500)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "0.5rem", fontWeight: 700 }}>T1</div>
                    <span style={{ fontSize: "0.6875rem", fontWeight: 600 }}>Site Team 1</span>
                    <span style={{ fontSize: "0.5625rem", color: "var(--color-gray-400)" }}>14 min ago</span>
                  </div>
                  <div className="thread-bubble thread-site">Logged observation with 2 photos and voice note. Waterproofing membrane gap at parapet junction. Approx 15cm. Marked as critical.</div>
                </div>
              </div>
            </div>

            {/* Reply */}
            <div className="qd-reply">
              <div className="reply-row">
                <button className="btn btn-ghost btn-sm" style={{ padding: "8px" }} title="Attach standard detail">
                  <EdIcon name="paperclip" size={16} />
                </button>
                <textarea rows={1} placeholder="Reply to site team..." />
                <button className="btn btn-primary" style={{ padding: "10px 16px" }}>
                  <EdIcon name="send" size={14} />
                </button>
              </div>
              <div className="flex gap-2 mt-2">
                <button className="btn btn-ghost btn-sm" style={{ fontSize: "0.6875rem" }}>📎 Attach Detail</button>
                <button className="btn btn-ghost btn-sm" style={{ fontSize: "0.6875rem" }}>📄 Attach Drawing</button>
                <button className="btn btn-ghost btn-sm" style={{ fontSize: "0.6875rem" }}>🏷️ Tag Trade</button>
              </div>
            </div>
          </div>
        </div>
      </EdifiShell>
    </>
  );
}
