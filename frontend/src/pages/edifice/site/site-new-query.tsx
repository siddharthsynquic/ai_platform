import { EdIcon } from "@/shared/icons/edifice-icons";
import { useState, type MouseEvent } from "react";

type Pin = { top: string; left: string; existing?: boolean };

export function SiteNewQueryPage() {
  const [recording, setRecording] = useState(false);
  const [recSaved, setRecSaved] = useState(false);
  const [severity, setSeverity] = useState<"critical" | "major" | "minor" | "obs">("critical");
  const [pins, setPins] = useState<Pin[]>([{ top: "35%", left: "62%", existing: true }]);

  const toggleRec = () => {
    if (recording) {
      setRecording(false);
      setRecSaved(true);
    } else {
      setRecording(true);
      setRecSaved(false);
    }
  };

  const dropPin = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPins((prev) => [...prev, { top: `${y}%`, left: `${x}%` }]);
  };

  const recLabel = recording ? "Recording..." : recSaved ? "Voice saved ✓" : "Tap to record";
  const recLabelColor = recording
    ? "var(--color-red-500)"
    : recSaved
    ? "var(--color-green-600)"
    : undefined;

  return (
    <>
      <style>{`
        body { background: var(--color-gray-50); }
        .site-shell { max-width: 480px; margin: 0 auto; min-height: 100vh; display: flex; flex-direction: column; background: white; }
        .site-header { padding: 16px 20px; background: var(--color-black); color: white; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 50; }
        .site-content { flex: 1; padding: 20px; }
        .capture-block { background: var(--color-gray-50); border-radius: var(--radius-xl); padding: 16px; margin-bottom: 16px; }
        .capture-block-title { font-size: 0.6875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-gray-400); margin-bottom: 10px; }
        .photo-slots { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
        .photo-slot { aspect-ratio: 1; border: 2px dashed var(--color-gray-200); border-radius: var(--radius-lg); display: flex; flex-direction: column; align-items: center; justify-content: center; cursor: pointer; background: white; transition: all 0.15s; }
        .photo-slot:hover { border-color: var(--color-black); }
        .photo-slot.filled { border-style: solid; border-color: var(--color-gray-200); background: linear-gradient(135deg, #e0e0e0, #c0c0c0); }
        .voice-row { display: flex; align-items: center; gap: 12px; background: white; border: 1px solid var(--color-gray-100); border-radius: var(--radius-xl); padding: 12px; }
        .rec-btn { width: 44px; height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.2s; }
        .rec-idle { background: var(--color-gray-100); color: var(--color-gray-500); }
        .rec-idle:hover { background: var(--color-black); color: white; }
        .rec-active { background: var(--color-red-500); color: white; animation: pulse 1.5s infinite; }
        .plan-viewer { background: var(--color-gray-900); border-radius: var(--radius-xl); height: 220px; position: relative; display: flex; align-items: center; justify-content: center; color: var(--color-gray-500); overflow: hidden; cursor: crosshair; }
        .pin { position: absolute; width: 24px; height: 24px; background: var(--color-red-500); border: 2px solid white; border-radius: 50%; box-shadow: var(--shadow-md); cursor: pointer; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.5rem; font-weight: 800; transform: translate(-50%, -50%); z-index: 5; }
        .pin:hover { transform: translate(-50%, -50%) scale(1.2); }
        .severity-row { display: flex; gap: 6px; }
        .sev-chip { flex: 1; text-align: center; padding: 10px 6px; border: 2px solid var(--color-gray-100); border-radius: var(--radius-lg); font-size: 0.6875rem; font-weight: 700; cursor: pointer; transition: all 0.15s; }
        .sev-chip:hover { border-color: var(--color-gray-300); }
        .sev-chip.sel { color: white; }
        .sev-critical.sel { background: var(--color-red-500); border-color: var(--color-red-500); }
        .sev-major.sel { background: var(--color-amber-500); border-color: var(--color-amber-500); }
        .sev-minor.sel { background: var(--color-blue-400); border-color: var(--color-blue-400); }
        .sev-obs.sel { background: var(--color-gray-400); border-color: var(--color-gray-400); }
        .site-bottom-nav { position: sticky; bottom: 0; background: white; border-top: 1px solid var(--color-gray-100); display: flex; z-index: 50; }
        .site-nav-item { flex: 1; text-align: center; padding: 10px 0 8px; font-size: 0.625rem; font-weight: 600; color: var(--color-gray-400); display: flex; flex-direction: column; align-items: center; gap: 3px; cursor: pointer; text-decoration: none; }
        .site-nav-item:hover, .site-nav-item.active { color: var(--color-black); }
      `}</style>
      <div className="site-shell">
        <header className="site-header">
          <a href="/site/site-home" style={{ color: "white", display: "flex", alignItems: "center", gap: "8px" }}>
            <EdIcon name="chevronLeft" size={18} />
            <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>Log New Query</span>
          </a>
          <span style={{ fontSize: "0.625rem", color: "rgba(255,255,255,0.4)" }}>QRY-#256</span>
        </header>

        <div className="site-content">
          {/* Quick Description */}
          <div className="capture-block">
            <div className="capture-block-title">📝 What did you find?</div>
            <textarea
              className="form-input"
              style={{ borderRadius: "var(--radius-lg)", minHeight: "80px", fontSize: "0.875rem" }}
              placeholder="Describe the issue in a few words..."
              defaultValue="Waterproofing membrane gap at parapet junction, east side. Approx 15cm gap before next pour."
            />
          </div>

          {/* Photos */}
          <div className="capture-block">
            <div className="capture-block-title">📸 Photos</div>
            <div className="photo-slots">
              <div className="photo-slot filled"><EdIcon name="image" size={18} style={{ color: "rgba(255,255,255,0.7)" }} /></div>
              <div className="photo-slot filled"><EdIcon name="image" size={18} style={{ color: "rgba(255,255,255,0.7)" }} /></div>
              <div className="photo-slot">
                <EdIcon name="camera" size={16} style={{ color: "var(--color-gray-300)" }} />
                <span style={{ fontSize: "0.5rem", color: "var(--color-gray-300)", marginTop: "2px" }}>Add</span>
              </div>
              <div className="photo-slot"><EdIcon name="plus" size={16} style={{ color: "var(--color-gray-200)" }} /></div>
            </div>
          </div>

          {/* Voice */}
          <div className="capture-block">
            <div className="capture-block-title">🎤 Voice Note (optional)</div>
            <div className="voice-row">
              <button
                className={`rec-btn ${recording ? "rec-active" : "rec-idle"}`}
                onClick={toggleRec}
              >
                <EdIcon name="mic" size={18} />
              </button>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: recLabelColor }}>{recLabel}</p>
                <p style={{ fontSize: "0.625rem", color: "var(--color-gray-400)" }}>Max 60 sec</p>
              </div>
            </div>
          </div>

          {/* Pin on Plan */}
          <div className="capture-block">
            <div className="flex items-center justify-between">
              <div className="capture-block-title" style={{ marginBottom: 0 }}>📍 Pin on Plan</div>
              <select style={{ fontSize: "0.6875rem", border: "1px solid var(--color-gray-200)", borderRadius: "var(--radius-lg)", padding: "4px 8px", background: "white" }} defaultValue="Floor 12">
                <option>Floor 12</option>
                <option>Floor 11</option>
                <option>Floor 10</option>
                <option>Floor 9</option>
                <option>Floor 8</option>
                <option>Floor 7</option>
              </select>
            </div>
            <p style={{ fontSize: "0.625rem", color: "var(--color-gray-400)", margin: "6px 0 10px" }}>Tap anywhere on the plan to drop a pin</p>
            <div className="plan-viewer" onClick={dropPin}>
              <div style={{ textAlign: "center" }}>
                <EdIcon name="mapPin" size={28} style={{ margin: "0 auto 6px", display: "block" }} />
                <p style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Floor 12 Plan</p>
                <p style={{ fontSize: "0.625rem", opacity: 0.5 }}>Tap to place pin</p>
              </div>
              {pins.map((p, i) => (
                <div key={i} className="pin" style={{ top: p.top, left: p.left }} title={p.existing ? "Your pin" : "New pin"}>●</div>
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              <select className="form-input form-select" style={{ fontSize: "0.75rem", padding: "6px 26px 6px 10px", flex: 1 }} defaultValue="Zone A — East">
                <option>Zone A — East</option>
                <option>Zone B — West</option>
                <option>Zone C — North</option>
                <option>Zone D — South</option>
              </select>
            </div>
          </div>

          {/* Severity */}
          <div className="capture-block">
            <div className="capture-block-title">⚠️ Severity</div>
            <div className="severity-row">
              <div className={`sev-chip sev-critical${severity === "critical" ? " sel" : ""}`} onClick={() => setSeverity("critical")}>Critical</div>
              <div className={`sev-chip sev-major${severity === "major" ? " sel" : ""}`} onClick={() => setSeverity("major")}>Major</div>
              <div className={`sev-chip sev-minor${severity === "minor" ? " sel" : ""}`} onClick={() => setSeverity("minor")}>Minor</div>
              <div className={`sev-chip sev-obs${severity === "obs" ? " sel" : ""}`} onClick={() => setSeverity("obs")}>Note</div>
            </div>
          </div>

          {/* Trade */}
          <div className="capture-block">
            <div className="capture-block-title">🔧 Trade</div>
            <select className="form-input form-select" style={{ fontSize: "0.8125rem" }} defaultValue="Facade / Envelope">
              <option>Facade / Envelope</option>
              <option>Structural</option>
              <option>Electrical</option>
              <option>Plumbing</option>
              <option>HVAC</option>
              <option>Fire Safety</option>
              <option>Interior / Finishing</option>
              <option>Other</option>
            </select>
          </div>

          {/* Submit */}
          <button
            className="btn btn-primary btn-lg w-full"
            style={{ borderRadius: "var(--radius-xl)", marginTop: "8px" }}
            onClick={() => (window.location.href = "/site/site-home")}
          >
            <EdIcon name="send" size={18} />
            Submit Query
          </button>
          <p style={{ textAlign: "center", fontSize: "0.625rem", color: "var(--color-gray-400)", marginTop: "6px" }}>Sent to the office team for review</p>
          <div style={{ height: "70px" }}></div>
        </div>

        <nav className="site-bottom-nav">
          <a href="/site/site-home" className="site-nav-item"><EdIcon name="home" size={20} />Home</a>
          <a href="/site/site-queries" className="site-nav-item"><EdIcon name="database" size={20} />Queries</a>
          <a href="/site/site-new-query" className="site-nav-item active"><EdIcon name="plus" size={20} />Log New</a>
          <a href="/site/site-updates" className="site-nav-item"><EdIcon name="messageSquare" size={20} />Updates</a>
        </nav>
      </div>
    </>
  );
}
