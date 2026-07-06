import { useState } from "react";
import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { EdIcon } from "@/shared/icons/edifice-icons";

export function ValUploadPage() {
  const [stage, setStage] = useState<"auto" | "sd" | "dd" | "gfc">("auto");
  const [dragOver, setDragOver] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [validating, setValidating] = useState(false);

  const handleFiles = () => {
    setShowDemo(true);
  };

  const startValidation = () => {
    setValidating(true);
    setTimeout(() => {
      window.location.href = "/user/val-reports";
    }, 2000);
  };

  return (
    <>
      <style>{`
    .upload-area {
      border: 2px dashed var(--color-gray-200);
      border-radius: var(--radius-3xl);
      padding: 4rem 2rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s var(--ease-out);
      background: linear-gradient(135deg, #fafafa, #f5f5ff);
      position: relative;
      overflow: hidden;
    }
    .upload-area:hover {
      border-color: var(--color-black);
      background: var(--color-gray-50);
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
    }
    .upload-area.dragover {
      border-color: #6366f1;
      background: rgba(99,102,241,0.03);
    }
    .upload-icon {
      width: 72px; height: 72px;
      margin: 0 auto 1.5rem;
      background: var(--color-gray-100);
      border-radius: var(--radius-2xl);
      display: flex; align-items: center; justify-content: center;
      color: var(--color-gray-400);
      transition: all 0.3s;
    }
    .upload-area:hover .upload-icon {
      background: var(--color-black);
      color: white;
      transform: scale(1.05);
    }
    .file-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 1.25rem;
      background: var(--color-white);
      border: 1px solid var(--color-gray-100);
      border-radius: var(--radius-2xl);
      transition: all 0.2s;
    }
    .file-card:hover {
      border-color: var(--color-gray-200);
      box-shadow: var(--shadow-sm);
    }
    .file-icon {
      width: 44px; height: 44px;
      background: var(--color-gray-50);
      border-radius: var(--radius-xl);
      display: flex; align-items: center; justify-content: center;
      color: var(--color-gray-400);
      flex-shrink: 0;
    }
    .stage-selector {
      display: flex;
      gap: 0.75rem;
    }
    .stage-option {
      flex: 1;
      padding: 1.25rem;
      border: 2px solid var(--color-gray-100);
      border-radius: var(--radius-2xl);
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
    }
    .stage-option:hover { border-color: var(--color-gray-300); }
    .stage-option.selected { border-color: var(--color-black); background: var(--color-gray-50); }
    .stage-option.auto { border-style: dashed; }
    .stage-option .stage-label {
      font-size: 0.8125rem;
      font-weight: 700;
      margin-top: 0.5rem;
    }
    .stage-option .stage-desc {
      font-size: 0.6875rem;
      color: var(--color-gray-400);
      margin-top: 0.25rem;
    }
  `}</style>
      <EdifiShell system="validation" activeNav="upload" section="user">
        <div className="page-header">
          <h1>Upload Drawing</h1>
          <p>Upload PDF drawings for AI-powered validation. Stage is auto-detected or manually selectable.</p>
        </div>

        {/* Upload Zone */}
        <div
          className={`upload-area mb-8 ${dragOver ? "dragover" : ""}`}
          id="uploadZone"
          onClick={() => document.getElementById("fileInput")?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFiles();
          }}
        >
          <div className="upload-icon" id="uploadIcon">
            <EdIcon name="upload" size={32} />
          </div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>Drop PDF drawings here</h3>
          <p style={{ color: "var(--color-gray-400)", fontSize: "0.9375rem", marginBottom: "1.5rem" }}>or click to browse your files</p>
          <div className="flex justify-center gap-2 flex-wrap">
            <span className="badge badge-gray">PDF format</span>
            <span className="badge badge-gray">Max 50MB per file</span>
            <span className="badge badge-gray">Batch upload supported</span>
          </div>
          <input type="file" id="fileInput" accept=".pdf" multiple style={{ display: "none" }} onChange={() => handleFiles()} />
        </div>

        <div className="grid-2" style={{ gap: "2rem" }}>
          {/* Left: Stage Selection */}
          <div>
            <p className="label mb-4">Stage Detection</p>
            <div className="stage-selector mb-6">
              <div
                className={`stage-option auto ${stage === "auto" ? "selected" : ""}`}
                onClick={() => setStage("auto")}
              >
                <div style={{ color: "var(--color-gray-400)" }}><EdIcon name="sparkles" size={24} /></div>
                <div className="stage-label">Auto Detect</div>
                <div className="stage-desc">AI identifies stage</div>
              </div>
              <div
                className={`stage-option ${stage === "sd" ? "selected" : ""}`}
                onClick={() => setStage("sd")}
              >
                <div style={{ color: "#6366f1" }}><EdIcon name="layers" size={24} /></div>
                <div className="stage-label">SD</div>
                <div className="stage-desc">Schematic Design</div>
              </div>
              <div
                className={`stage-option ${stage === "dd" ? "selected" : ""}`}
                onClick={() => setStage("dd")}
              >
                <div style={{ color: "#f59e0b" }}><EdIcon name="clipboardList" size={24} /></div>
                <div className="stage-label">DD</div>
                <div className="stage-desc">Design Development</div>
              </div>
              <div
                className={`stage-option ${stage === "gfc" ? "selected" : ""}`}
                onClick={() => setStage("gfc")}
              >
                <div style={{ color: "#22c55e" }}><EdIcon name="checkCircle" size={24} /></div>
                <div className="stage-label">GFC</div>
                <div className="stage-desc">Good for Construction</div>
              </div>
            </div>

            {/* Project Selection */}
            <div className="form-group">
              <label className="form-label">Project</label>
              <select className="form-input form-select">
                <option>Tower A — Edifice Commercial</option>
                <option>Tower B — Edifice Commercial</option>
                <option>Podium Block — Edifice Commercial</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Drawing Type (Optional)</label>
              <select className="form-input form-select">
                <option value="">Auto-detect from file name</option>
                <option>Floor Plan</option>
                <option>Section</option>
                <option>Elevation</option>
                <option>Detail Sheet</option>
                <option>MEP Layout</option>
                <option>Staircase Detail</option>
                <option>Reflected Ceiling Plan</option>
                <option>Schedule</option>
              </select>
            </div>
            <button
              className="btn btn-primary btn-lg w-full"
              onClick={startValidation}
              id="validateBtn"
              style={{ marginTop: "1rem", opacity: validating ? 0.7 : 1, pointerEvents: validating ? "none" : "auto" }}
            >
              {validating ? (
                <>
                  <span className="animate-spin" style={{ display: "inline-flex" }}>
                    <EdIcon name="loader" size={18} />
                  </span>
                  Validating...
                </>
              ) : (
                <>
                  <EdIcon name="zap" size={18} />
                  Start Validation
                </>
              )}
            </button>
          </div>

          {/* Right: Queued Files */}
          <div>
            <p className="label mb-4">Queued Files</p>
            <div id="fileList" style={{ display: showDemo ? "none" : "block" }}>
              <div className="empty-state" style={{ padding: "3rem" }}>
                <div><EdIcon name="fileText" size={40} /></div>
                <h3 style={{ fontSize: "1rem", marginTop: "0.5rem" }}>No files queued</h3>
                <p style={{ fontSize: "0.8125rem" }}>Upload PDF drawings to begin validation</p>
              </div>
            </div>
            {/* Demo queued files */}
            <div id="demoFiles" style={{ display: showDemo ? "block" : "none" }}>
              <div className="flex flex-col gap-3">
                <div className="file-card">
                  <div className="file-icon"><EdIcon name="fileText" size={20} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "0.8125rem", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>DWG-FP-003_FloorPlan_Level3_TowerA.pdf</p>
                    <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>2.4 MB · Stage: Auto-detecting...</p>
                  </div>
                  <span className="badge badge-blue">Queued</span>
                  <button style={{ color: "var(--color-gray-300)", padding: "4px" }}><EdIcon name="x" size={14} /></button>
                </div>
                <div className="file-card">
                  <div className="file-icon"><EdIcon name="fileText" size={20} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "0.8125rem", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>DWG-ST-012_StaircaseDetail_CoreB.pdf</p>
                    <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>1.8 MB · Stage: GFC detected</p>
                  </div>
                  <span className="badge badge-green">GFC</span>
                  <button style={{ color: "var(--color-gray-300)", padding: "4px" }}><EdIcon name="x" size={14} /></button>
                </div>
                <div className="file-card">
                  <div className="file-icon"><EdIcon name="fileText" size={20} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "0.8125rem", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>DWG-EL-N01_Elevation_NorthFacade.pdf</p>
                    <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>3.1 MB · Stage: DD detected</p>
                  </div>
                  <span className="badge badge-amber">DD</span>
                  <button style={{ color: "var(--color-gray-300)", padding: "4px" }}><EdIcon name="x" size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </EdifiShell>
    </>
  );
}
