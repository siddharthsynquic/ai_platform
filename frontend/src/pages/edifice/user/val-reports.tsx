import { useState } from "react";
import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { EdIcon } from "@/shared/icons/edifice-icons";

type StageFilter = "all" | "sd" | "dd" | "gfc";

export function ValReportsPage() {
  const [stage, setStage] = useState<StageFilter>("all");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <style>{`
    .report-card {
      border-radius: var(--radius-2xl);
      border: 1px solid var(--color-gray-100);
      overflow: hidden;
      transition: all 0.3s var(--ease-out);
      cursor: pointer;
      background: white;
    }
    .report-card:hover {
      border-color: var(--color-gray-300);
      box-shadow: var(--shadow-xl);
      transform: translateY(-2px);
    }
    .report-card-header {
      padding: 1.25rem 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--color-gray-50);
    }
    .report-card-body {
      padding: 1.25rem 1.5rem;
    }
    .flag-item {
      padding: 1rem 1.25rem;
      border-radius: var(--radius-xl);
      margin-bottom: 0.75rem;
      border-left: 3px solid;
      transition: background 0.2s;
    }
    .flag-item:hover { background: var(--color-gray-50); }
    .flag-error { border-left-color: var(--color-red-500); background: var(--color-red-50); }
    .flag-caution { border-left-color: var(--color-amber-400); background: var(--color-amber-50); }
    .flag-suggestion { border-left-color: var(--color-blue-400); background: var(--color-blue-50); }
    .flag-precision { border-left-color: #6366f1; background: var(--color-purple-50); }

    .detail-modal {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.4);
      backdrop-filter: blur(8px);
      z-index: 200;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    .detail-modal.open { display: flex; }
    .detail-modal-content {
      background: white;
      border-radius: var(--radius-3xl);
      max-width: 800px;
      width: 100%;
      max-height: 85vh;
      overflow-y: auto;
      padding: 2rem;
      animation: modalIn 0.3s var(--ease-out) both;
    }
    .ref-preview {
      background: var(--color-gray-900);
      border-radius: var(--radius-2xl);
      padding: 3rem 2rem;
      text-align: center;
      color: white;
      margin: 1rem 0;
    }
  `}</style>
      <EdifiShell system="validation" activeNav="validation" section="user">
        <div className="page-header">
          <div className="flex items-center justify-between">
            <div>
              <h1>Validation Reports</h1>
              <p>Stage-aware validation results — errors, cautions, suggestions, and standard detail references.</p>
            </div>
            <div className="flex gap-3">
              <div className="tab-group">
                <button className={`tab-item ${stage === "all" ? "active" : ""}`} onClick={() => setStage("all")}>All</button>
                <button className={`tab-item ${stage === "sd" ? "active" : ""}`} onClick={() => setStage("sd")}>SD</button>
                <button className={`tab-item ${stage === "dd" ? "active" : ""}`} onClick={() => setStage("dd")}>DD</button>
                <button className={`tab-item ${stage === "gfc" ? "active" : ""}`} onClick={() => setStage("gfc")}>GFC</button>
              </div>
              <button className="btn btn-secondary btn-sm">
                <EdIcon name="filter" size={14} />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Active Report Detail */}
        <div className="card mb-8 p-6" style={{ borderLeft: "4px solid #f59e0b" }}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Floor Plan — Level 3</h2>
                <span className="badge badge-amber">DD Stage</span>
                <span className="badge badge-red">3 Errors</span>
              </div>
              <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-400)" }}>DWG-FP-003 · Tower A — Edifice Commercial · Uploaded Jun 24, 2026</p>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-secondary btn-sm" onClick={() => setModalOpen(true)}>
                <EdIcon name="eye" size={14} />
                View References
              </button>
              <button className="btn btn-primary btn-sm">
                <EdIcon name="download" size={14} />
                Export PDF
              </button>
            </div>
          </div>

          {/* Validation Flags */}
          <p className="label mb-3">Validation Flags</p>
          <div className="flag-item flag-error">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="badge severity-critical" style={{ fontSize: "0.625rem" }}>ERROR</span>
                <strong style={{ fontSize: "0.875rem" }}>Handrail height not dimensioned</strong>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setModalOpen(true)} style={{ fontSize: "0.6875rem" }}>
                <EdIcon name="fileText" size={12} />
                SD-STAIR-004
              </button>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-600)" }}>Staircase detail at Core B is missing handrail height dimension. DD stage requires all safety-critical dimensions.</p>
            <div className="flex gap-2 mt-2">
              <span className="badge badge-gray" style={{ fontSize: "0.5625rem" }}>Element: Staircase</span>
              <span className="badge badge-gray" style={{ fontSize: "0.5625rem" }}>Check: Dimensional Accuracy</span>
            </div>
          </div>

          <div className="flag-item flag-error">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="badge severity-critical" style={{ fontSize: "0.625rem" }}>ERROR</span>
                <strong style={{ fontSize: "0.875rem" }}>Cross-reference mismatch: Door schedule</strong>
              </div>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-600)" }}>Door D-307 appears on floor plan but is missing from the door schedule. Schedule reference tag broken.</p>
            <div className="flex gap-2 mt-2">
              <span className="badge badge-gray" style={{ fontSize: "0.5625rem" }}>Element: Doors</span>
              <span className="badge badge-gray" style={{ fontSize: "0.5625rem" }}>Check: Cross-Sheet Referencing</span>
            </div>
          </div>

          <div className="flag-item flag-caution">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="badge severity-major" style={{ fontSize: "0.625rem" }}>CAUTION</span>
                <strong style={{ fontSize: "0.875rem" }}>Annotation font inconsistency</strong>
              </div>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-600)" }}>Room labels on Level 3 use 2.5mm text height while office standard is 3.0mm. Inconsistent with drawing set.</p>
          </div>

          <div className="flag-item flag-suggestion">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="badge badge-blue" style={{ fontSize: "0.625rem" }}>SUGGESTION</span>
                <strong style={{ fontSize: "0.875rem" }}>Precedent found: Project Alpha, DD Stage</strong>
              </div>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-600)" }}>Project Alpha, DD Stage, Staircase Sheet 4 contains a correctly detailed version of this condition — refer to Drawing DWG-ST-A04.</p>
            <button className="btn btn-ghost btn-sm mt-2" style={{ fontSize: "0.6875rem" }}>
              <EdIcon name="eye" size={12} />
              View Precedent Drawing
            </button>
          </div>

          {/* Spatial Drift Advisory */}
          <div className="flag-item flag-precision" style={{ marginTop: "1rem" }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-purple" style={{ fontSize: "0.625rem" }}>SPATIAL DRIFT</span>
              <strong style={{ fontSize: "0.875rem" }}>Reception area relocated from SD intent</strong>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-600)" }}>Reception area was adjacent to main entrance in approved SD — DD plan has relocated it to Zone B. Verify intent with design team.</p>
          </div>
        </div>

        {/* Report List */}
        <div className="section-header">
          <span className="section-title">All Validation Reports</span>
          <span style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Showing 12 of 247 reports</span>
        </div>

        <table className="data-table card">
          <thead>
            <tr>
              <th>Drawing</th>
              <th>Project</th>
              <th>Stage</th>
              <th>Errors</th>
              <th>Cautions</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ cursor: "pointer" }}>
              <td><strong style={{ fontSize: "0.8125rem" }}>Floor Plan — Level 3</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>DWG-FP-003</span></td>
              <td style={{ fontSize: "0.8125rem" }}>Tower A</td>
              <td><span className="badge badge-amber">DD</span></td>
              <td><span style={{ color: "var(--color-red-500)", fontWeight: 700 }}>3</span></td>
              <td><span style={{ color: "var(--color-amber-500)", fontWeight: 700 }}>1</span></td>
              <td><span className="badge badge-red">Flagged</span></td>
              <td style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Jun 24</td>
            </tr>
            <tr style={{ cursor: "pointer" }}>
              <td><strong style={{ fontSize: "0.8125rem" }}>Staircase Detail — Core B</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>DWG-ST-012</span></td>
              <td style={{ fontSize: "0.8125rem" }}>Tower A</td>
              <td><span className="badge badge-green">GFC</span></td>
              <td><span style={{ color: "var(--color-green-600)", fontWeight: 700 }}>0</span></td>
              <td><span style={{ color: "var(--color-green-600)", fontWeight: 700 }}>0</span></td>
              <td><span className="badge badge-green">Passed</span></td>
              <td style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Jun 24</td>
            </tr>
            <tr style={{ cursor: "pointer" }}>
              <td><strong style={{ fontSize: "0.8125rem" }}>MEP Layout — Basement 1</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>DWG-MEP-B1</span></td>
              <td style={{ fontSize: "0.8125rem" }}>Tower A</td>
              <td><span className="badge badge-purple">SD</span></td>
              <td><span style={{ color: "var(--color-green-600)", fontWeight: 700 }}>0</span></td>
              <td><span style={{ color: "var(--color-amber-500)", fontWeight: 700 }}>1</span></td>
              <td><span className="badge badge-amber">Caution</span></td>
              <td style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Jun 23</td>
            </tr>
            <tr style={{ cursor: "pointer" }}>
              <td><strong style={{ fontSize: "0.8125rem" }}>Elevation — North Facade</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>DWG-EL-N01</span></td>
              <td style={{ fontSize: "0.8125rem" }}>Tower A</td>
              <td><span className="badge badge-amber">DD</span></td>
              <td><span style={{ color: "var(--color-red-500)", fontWeight: 700 }}>5</span></td>
              <td><span style={{ color: "var(--color-amber-500)", fontWeight: 700 }}>2</span></td>
              <td><span className="badge badge-red">Flagged</span></td>
              <td style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Jun 23</td>
            </tr>
            <tr style={{ cursor: "pointer" }}>
              <td><strong style={{ fontSize: "0.8125rem" }}>Section — Through Lobby</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>DWG-SEC-L01</span></td>
              <td style={{ fontSize: "0.8125rem" }}>Tower B</td>
              <td><span className="badge badge-green">GFC</span></td>
              <td><span style={{ color: "var(--color-green-600)", fontWeight: 700 }}>0</span></td>
              <td><span style={{ color: "var(--color-green-600)", fontWeight: 700 }}>0</span></td>
              <td><span className="badge badge-green">Passed</span></td>
              <td style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Jun 22</td>
            </tr>
            <tr style={{ cursor: "pointer" }}>
              <td><strong style={{ fontSize: "0.8125rem" }}>Reflected Ceiling — Level 5</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>DWG-RCP-005</span></td>
              <td style={{ fontSize: "0.8125rem" }}>Tower A</td>
              <td><span className="badge badge-amber">DD</span></td>
              <td><span style={{ color: "var(--color-red-500)", fontWeight: 700 }}>1</span></td>
              <td><span style={{ color: "var(--color-amber-500)", fontWeight: 700 }}>3</span></td>
              <td><span className="badge badge-amber">Caution</span></td>
              <td style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Jun 22</td>
            </tr>
          </tbody>
        </table>

        {/* Standard Detail Reference Modal */}
        <div
          className={`detail-modal ${modalOpen ? "open" : ""}`}
          id="refModal"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="detail-modal-content">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Standard Detail Reference</h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-400)" }}>SD-STAIR-004: Standard Handrail Detail</p>
              </div>
              <button onClick={() => setModalOpen(false)} style={{ padding: "8px", color: "var(--color-gray-400)" }}>
                <EdIcon name="x" size={20} />
              </button>
            </div>
            <div className="ref-preview">
              <div style={{ marginBottom: "1rem" }}><EdIcon name="fileText" size={48} /></div>
              <p style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.5rem" }}>SD-STAIR-004.pdf</p>
              <p style={{ fontSize: "0.8125rem", opacity: 0.6 }}>Standard Handrail Detail — Height, Fixing, and Return</p>
              <p style={{ fontSize: "0.6875rem", opacity: 0.4, marginTop: "0.5rem" }}>PDF Preview would render here in production</p>
            </div>
            <div className="flex gap-3 mt-4">
              <button className="btn btn-primary flex-1">
                <EdIcon name="eye" size={15} />
                View Full PDF
              </button>
              <button className="btn btn-secondary flex-1">
                <EdIcon name="download" size={15} />
                Download
              </button>
              <button className="btn btn-secondary flex-1">
                <EdIcon name="layers" size={15} />
                Compare Side-by-Side
              </button>
            </div>
            <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--color-gray-100)" }}>
              <p className="label mb-2">Detail Metadata</p>
              <div className="grid-3" style={{ gap: "1rem" }}>
                <div><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Detail Type</span><br /><span style={{ fontSize: "0.8125rem", fontWeight: 600 }}>Staircase / Handrail</span></div>
                <div><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Applicable Stages</span><br /><span style={{ fontSize: "0.8125rem", fontWeight: 600 }}>DD, GFC</span></div>
                <div><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Version</span><br /><span style={{ fontSize: "0.8125rem", fontWeight: 600 }}>v2.1 — May 2026</span></div>
              </div>
            </div>
          </div>
        </div>
      </EdifiShell>
    </>
  );
}
