import { EdifiShell } from "@/shared/components/layout/edifice-shell";

export function ValStageViewPage() {
  return (
    <>
      <style>{`
    .stage-timeline {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0;
      margin: 3rem 0;
      position: relative;
    }
    .stage-node {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      z-index: 2;
    }
    .stage-circle {
      width: 80px; height: 80px;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-weight: 800;
      font-size: 1.25rem;
      transition: all 0.3s var(--ease-out);
      cursor: pointer;
      box-shadow: var(--shadow-lg);
    }
    .stage-circle:hover {
      transform: scale(1.1);
      box-shadow: var(--shadow-xl);
    }
    .stage-circle-sd { background: #6366f1; color: white; }
    .stage-circle-dd { background: #f59e0b; color: white; }
    .stage-circle-gfc { background: #22c55e; color: white; }
    .stage-connector {
      width: 120px;
      height: 4px;
      background: var(--color-gray-200);
      position: relative;
      z-index: 1;
    }
    .stage-connector-active {
      background: linear-gradient(90deg, var(--color-gray-200), var(--color-gray-200));
    }
    .stage-connector-fill {
      height: 100%;
      border-radius: var(--radius-full);
      transition: width 1s var(--ease-out);
    }
    .stage-info {
      text-align: center;
      margin-top: 1rem;
    }
    .stage-info h3 {
      font-size: 0.9375rem;
      font-weight: 700;
      margin-bottom: 0.25rem;
    }
    .stage-info p {
      font-size: 0.75rem;
      color: var(--color-gray-400);
    }
    .project-card {
      border: 1px solid var(--color-gray-100);
      border-radius: var(--radius-2xl);
      padding: 1.5rem;
      background: white;
      transition: all 0.3s var(--ease-out);
      cursor: pointer;
    }
    .project-card:hover {
      border-color: var(--color-gray-300);
      box-shadow: var(--shadow-lg);
      transform: translateY(-2px);
    }
    .mini-stages {
      display: flex;
      gap: 4px;
      margin-top: 1rem;
    }
    .mini-stage {
      flex: 1;
      height: 6px;
      border-radius: var(--radius-full);
      background: var(--color-gray-100);
    }
    .mini-stage-complete { background: var(--color-green-400); }
    .mini-stage-active { background: var(--color-amber-400); }
    .mini-stage-pending { background: var(--color-gray-200); }
  `}</style>
      <EdifiShell system="validation" activeNav="stage-view" section="user">
        <div className="page-header">
          <h1>Stage Progression</h1>
          <p>Track project journeys from Schematic Design through Good for Construction with validation gates.</p>
        </div>

        {/* Stage Timeline */}
        <div className="card card-flat p-6 mb-8">
          <div className="section-header">
            <span className="section-title">Active Project — Tower A, Edifice Commercial</span>
            <span className="badge badge-amber">Current: DD Stage</span>
          </div>
          <div className="stage-timeline">
            <div className="stage-node">
              <div className="stage-circle stage-circle-sd">SD</div>
              <div className="stage-info">
                <h3>Schematic Design</h3>
                <p>82 drawings · 95% validated</p>
                <span className="badge badge-green mt-2" style={{ fontSize: "0.625rem" }}>✓ Complete</span>
              </div>
            </div>
            <div className="stage-connector">
              <div className="stage-connector-fill" style={{ width: "100%", background: "linear-gradient(90deg, #6366f1, #f59e0b)" }}></div>
            </div>
            <div className="stage-node">
              <div className="stage-circle stage-circle-dd">DD</div>
              <div className="stage-info">
                <h3>Design Development</h3>
                <p>58 drawings · 71% validated</p>
                <span className="badge badge-amber mt-2" style={{ fontSize: "0.625rem" }}>◉ In Progress</span>
              </div>
            </div>
            <div className="stage-connector">
              <div className="stage-connector-fill" style={{ width: "30%", background: "linear-gradient(90deg, #f59e0b, var(--color-gray-200))" }}></div>
            </div>
            <div className="stage-node">
              <div className="stage-circle" style={{ background: "var(--color-gray-200)", color: "var(--color-gray-400)" }}>GFC</div>
              <div className="stage-info">
                <h3>Good for Construction</h3>
                <p>Pending DD completion</p>
                <span className="badge badge-gray mt-2" style={{ fontSize: "0.625rem" }}>○ Pending</span>
              </div>
            </div>
          </div>
        </div>

        {/* Validation Gate Summary */}
        <div className="grid-3 mb-8" style={{ gap: "1.5rem" }}>
          <div className="card p-5" style={{ borderTop: "3px solid #6366f1" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="badge badge-purple">SD Gate</span>
              <span className="badge badge-green">Passed</span>
            </div>
            <div style={{ fontSize: "0.8125rem", color: "var(--color-gray-600)", lineHeight: 1.6 }}>
              <p><strong>Focus:</strong> Spatial Intelligence & Design Logic</p>
              <p className="mt-2"><strong>Checks Performed:</strong></p>
              <ul style={{ marginTop: "0.5rem", paddingLeft: "1.25rem", fontSize: "0.75rem", color: "var(--color-gray-500)" }}>
                <li>Spatial Adjacency & Relationships</li>
                <li>Circulation Logic</li>
                <li>Programme Compliance</li>
                <li>Spatial Proportions</li>
                <li>Core & Services Placement</li>
                <li>Vertical Consistency</li>
                <li>Code & Compliance Indicators</li>
              </ul>
            </div>
            <div className="progress-bar mt-4" style={{ height: "4px" }}>
              <div className="progress-fill" style={{ width: "95%", background: "#6366f1" }}></div>
            </div>
            <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)", marginTop: "6px" }}>95% pass rate · 4 spatial flags resolved</p>
          </div>

          <div className="card p-5" style={{ borderTop: "3px solid #f59e0b" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="badge badge-amber">DD Gate</span>
              <span className="badge badge-amber">In Review</span>
            </div>
            <div style={{ fontSize: "0.8125rem", color: "var(--color-gray-600)", lineHeight: 1.6 }}>
              <p><strong>Focus:</strong> Detail Accuracy & Drafting Quality</p>
              <p className="mt-2"><strong>Checks Performed:</strong></p>
              <ul style={{ marginTop: "0.5rem", paddingLeft: "1.25rem", fontSize: "0.75rem", color: "var(--color-gray-500)" }}>
                <li>SD Parameter Carry-Forward</li>
                <li>Dimensional Accuracy</li>
                <li>Detail Completeness</li>
                <li>Annotation Quality</li>
                <li>Cross-Sheet Referencing</li>
                <li>Schedule Validation</li>
                <li>Spatial Drift Advisory</li>
              </ul>
            </div>
            <div className="progress-bar mt-4" style={{ height: "4px" }}>
              <div className="progress-fill progress-fill-amber" style={{ width: "71%" }}></div>
            </div>
            <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)", marginTop: "6px" }}>71% pass rate · 24 flags pending review</p>
          </div>

          <div className="card p-5" style={{ borderTop: "3px solid var(--color-gray-200)", opacity: 0.6 }}>
            <div className="flex items-center justify-between mb-4">
              <span className="badge badge-gray">GFC Gate</span>
              <span className="badge badge-gray">Pending</span>
            </div>
            <div style={{ fontSize: "0.8125rem", color: "var(--color-gray-600)", lineHeight: 1.6 }}>
              <p><strong>Focus:</strong> Precision & Production Readiness</p>
              <p className="mt-2"><strong>Checks to Perform:</strong></p>
              <ul style={{ marginTop: "0.5rem", paddingLeft: "1.25rem", fontSize: "0.75rem", color: "var(--color-gray-500)" }}>
                <li>Dimensional Precision</li>
                <li>Drawing Completeness</li>
                <li>Cross-Set Consistency</li>
                <li>Annotation Precision</li>
                <li>Cross-Reference Integrity</li>
                <li>Revision Control</li>
                <li>Construction Readiness</li>
              </ul>
            </div>
            <div className="progress-bar mt-4" style={{ height: "4px" }}>
              <div className="progress-fill" style={{ width: "0%" }}></div>
            </div>
            <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)", marginTop: "6px" }}>Awaiting DD completion</p>
          </div>
        </div>

        {/* Project List */}
        <div className="section-header">
          <span className="section-title">All Projects</span>
        </div>
        <div className="grid-3" style={{ gap: "1rem" }}>
          <div className="project-card">
            <div className="flex items-center justify-between mb-2">
              <strong style={{ fontSize: "0.9375rem" }}>Tower A</strong>
              <span className="badge badge-amber">DD</span>
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Edifice Commercial · Office</p>
            <p style={{ fontSize: "0.8125rem", marginTop: "0.5rem" }}>82 SD · 58 DD · 0 GFC</p>
            <div className="mini-stages">
              <div className="mini-stage mini-stage-complete"></div>
              <div className="mini-stage mini-stage-active"></div>
              <div className="mini-stage mini-stage-pending"></div>
            </div>
          </div>
          <div className="project-card">
            <div className="flex items-center justify-between mb-2">
              <strong style={{ fontSize: "0.9375rem" }}>Tower B</strong>
              <span className="badge badge-green">GFC</span>
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Edifice Commercial · Office</p>
            <p style={{ fontSize: "0.8125rem", marginTop: "0.5rem" }}>75 SD · 72 DD · 64 GFC</p>
            <div className="mini-stages">
              <div className="mini-stage mini-stage-complete"></div>
              <div className="mini-stage mini-stage-complete"></div>
              <div className="mini-stage mini-stage-active"></div>
            </div>
          </div>
          <div className="project-card">
            <div className="flex items-center justify-between mb-2">
              <strong style={{ fontSize: "0.9375rem" }}>Podium Block</strong>
              <span className="badge badge-purple">SD</span>
            </div>
            <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Edifice Commercial · Mixed-Use</p>
            <p style={{ fontSize: "0.8125rem", marginTop: "0.5rem" }}>45 SD · 0 DD · 0 GFC</p>
            <div className="mini-stages">
              <div className="mini-stage mini-stage-active"></div>
              <div className="mini-stage mini-stage-pending"></div>
              <div className="mini-stage mini-stage-pending"></div>
            </div>
          </div>
        </div>
      </EdifiShell>
    </>
  );
}
