import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { EdIcon } from "@/shared/icons/edifice-icons";

export function ValAdminTrainingPage() {
  return (
    <>
      <style>{`
        .model-card { border: 1px solid var(--color-gray-100); border-radius: var(--radius-2xl); padding: 1.75rem; background: white; }
        .model-card:hover { box-shadow: var(--shadow-sm); }
        .metric-circle { width: 80px; height: 80px; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .epoch-bar { height: 6px; border-radius: 3px; background: var(--color-gray-100); overflow: hidden; }
        .epoch-fill { height: 100%; border-radius: 3px; transition: width 1s var(--ease-out); }
      `}</style>
      <EdifiShell system="validation" activeNav="training" section="admin">
        <div className="page-header">
          <h1>AI Training Pipeline</h1>
          <p>Monitor model training, accuracy metrics, and data pipeline status across all three stages.</p>
        </div>

        <div className="grid-3 mb-8" style={{ gap: "1.5rem" }}>
          {/* SD Model */}
          <div className="model-card" style={{ borderTop: "3px solid #6366f1" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="badge badge-purple">SD Model</span>
              <span className="badge badge-green">Active</span>
            </div>
            <h3 style={{ fontSize: "1.125rem", fontWeight: "700", marginBottom: "0.5rem" }}>Spatial Intelligence</h3>
            <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)", marginBottom: "1.25rem" }}>Trained on spatial layout patterns, adjacency rules, and programme compliance.</p>
            <div className="flex gap-4 mb-4">
              <div className="metric-circle" style={{ background: "var(--color-green-50)", border: "2px solid var(--color-green-400)" }}>
                <span style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--color-green-600)" }}>94%</span>
                <span style={{ fontSize: "0.5625rem", color: "var(--color-green-500)" }}>Accuracy</span>
              </div>
              <div style={{ flex: "1" }}>
                <div className="flex justify-between mb-1" style={{ fontSize: "0.6875rem" }}><span>Training Data</span><span style={{ fontWeight: "600" }}>82 drawings</span></div>
                <div className="epoch-bar mb-2"><div className="epoch-fill" style={{ width: "100%", background: "#6366f1" }}></div></div>
                <div className="flex justify-between mb-1" style={{ fontSize: "0.6875rem" }}><span>Last Trained</span><span style={{ fontWeight: "600" }}>Jun 22</span></div>
                <div className="flex justify-between" style={{ fontSize: "0.6875rem" }}><span>Epochs</span><span style={{ fontWeight: "600" }}>150/150</span></div>
              </div>
            </div>
            <button className="btn btn-secondary btn-sm w-full"><EdIcon name="refresh" size={14} /> Retrain Model</button>
          </div>

          {/* DD Model */}
          <div className="model-card" style={{ borderTop: "3px solid #f59e0b" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="badge badge-amber">DD Model</span>
              <span className="badge badge-amber">Training</span>
            </div>
            <h3 style={{ fontSize: "1.125rem", fontWeight: "700", marginBottom: "0.5rem" }}>Detail Accuracy</h3>
            <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)", marginBottom: "1.25rem" }}>Learning dimensional patterns, annotation standards, and cross-referencing logic.</p>
            <div className="flex gap-4 mb-4">
              <div className="metric-circle" style={{ background: "var(--color-amber-50)", border: "2px solid var(--color-amber-400)" }}>
                <span style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--color-amber-600)" }}>78%</span>
                <span style={{ fontSize: "0.5625rem", color: "var(--color-amber-500)" }}>Progress</span>
              </div>
              <div style={{ flex: "1" }}>
                <div className="flex justify-between mb-1" style={{ fontSize: "0.6875rem" }}><span>Training Data</span><span style={{ fontWeight: "600" }}>93 drawings</span></div>
                <div className="epoch-bar mb-2"><div className="epoch-fill" style={{ width: "78%", background: "#f59e0b" }}></div></div>
                <div className="flex justify-between mb-1" style={{ fontSize: "0.6875rem" }}><span>Started</span><span style={{ fontWeight: "600" }}>Jun 24</span></div>
                <div className="flex justify-between" style={{ fontSize: "0.6875rem" }}><span>Epochs</span><span style={{ fontWeight: "600" }}>117/150</span></div>
              </div>
            </div>
            <div className="progress-bar" style={{ height: "3px", marginBottom: "0.75rem" }}><div className="progress-fill progress-fill-amber animate-pulse" style={{ width: "78%" }}></div></div>
            <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)", textAlign: "center" }}>Estimated completion: ~4 hours</p>
          </div>

          {/* GFC Model */}
          <div className="model-card" style={{ borderTop: "3px solid var(--color-gray-200)", opacity: "0.7" }}>
            <div className="flex items-center justify-between mb-4">
              <span className="badge badge-gray">GFC Model</span>
              <span className="badge badge-gray">Pending</span>
            </div>
            <h3 style={{ fontSize: "1.125rem", fontWeight: "700", marginBottom: "0.5rem" }}>Precision & Readiness</h3>
            <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)", marginBottom: "1.25rem" }}>Will learn construction precision standards, revision control, and production readiness.</p>
            <div className="flex gap-4 mb-4">
              <div className="metric-circle" style={{ background: "var(--color-gray-50)", border: "2px solid var(--color-gray-200)" }}>
                <span style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--color-gray-400)" }}>—</span>
                <span style={{ fontSize: "0.5625rem", color: "var(--color-gray-400)" }}>Pending</span>
              </div>
              <div style={{ flex: "1" }}>
                <div className="flex justify-between mb-1" style={{ fontSize: "0.6875rem" }}><span>Training Data</span><span style={{ fontWeight: "600" }}>72 drawings</span></div>
                <div className="epoch-bar mb-2"><div className="epoch-fill" style={{ width: "0%" }}></div></div>
                <div className="flex justify-between mb-1" style={{ fontSize: "0.6875rem" }}><span>Status</span><span style={{ fontWeight: "600" }}>Awaiting DD</span></div>
                <div className="flex justify-between" style={{ fontSize: "0.6875rem" }}><span>Epochs</span><span style={{ fontWeight: "600" }}>0/150</span></div>
              </div>
            </div>
            <button className="btn btn-secondary btn-sm w-full" disabled>Start Training</button>
          </div>
        </div>

        {/* Data Pipeline */}
        <div className="card p-6 mb-6">
          <span className="section-title">Data Pipeline — Upload Cadence</span>
          <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-500)", marginTop: "0.5rem", marginBottom: "1rem" }}>Monthly upload cycle — validated drawings move from cache to live database after admin approval.</p>
          <div className="grid-4" style={{ gap: "1rem" }}>
            <div className="card card-flat p-4" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: "700" }}>67</div>
              <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>In Cache (Validated)</p>
            </div>
            <div className="card card-flat p-4" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: "700" }}>4</div>
              <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Pending Approval</p>
            </div>
            <div className="card card-flat p-4" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: "700" }}>180</div>
              <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>In Live Database</p>
            </div>
            <div className="card card-flat p-4" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: "700" }}>Jul 1</div>
              <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Next Upload Date</p>
            </div>
          </div>
        </div>
      </EdifiShell>
    </>
  );
}
