import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { EdIcon } from "@/shared/icons/edifice-icons";
import { useState } from "react";

type TaskData = {
  title: string;
  project: string;
  stage: string;
  badge: string;
  desc: string;
  reviewer: string;
  due: string;
  drawing: string;
};

const tasksData: Record<string, TaskData> = {
  "TSK-VAL-01": {
    title: "Review Floor Plan Level 3",
    project: "Tower A",
    stage: "DD Stage",
    badge: "Flagged · 3 Errors",
    desc: "Validate staircase details, spatial drift anomalies (reception relocation), and door schedule cross-references against SD approved intents. Verify dimensional accuracy of safety items.",
    reviewer: "Ar. Sharma",
    due: "Due Today",
    drawing: "DWG-FP-003.pdf",
  },
  "TSK-VAL-02": {
    title: "GFC Stage Core B Staircase Details",
    project: "Tower B",
    stage: "GFC Stage",
    badge: "Passed · 0 Flags",
    desc: "Verify structural handrail dimensions and final construction specs against standard SD-STAIR-004.",
    reviewer: "Ar. Khan",
    due: "Completed",
    drawing: "DWG-ST-012.pdf",
  },
  "TSK-VAL-03": {
    title: "Basement 1 MEP Sleeve Layout",
    project: "Podium Block",
    stage: "SD Stage",
    badge: "Caution · 1 Flag",
    desc: "Verify structural clearance and schematic blockout locations before detail validation.",
    reviewer: "Ar. Sharma",
    due: "Jun 29, 2026",
    drawing: "DWG-MEP-B1.pdf",
  },
};

export function ValAdminTasksPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [drawerTaskId, setDrawerTaskId] = useState<string | null>(null);

  const openDrawer = (id: string) => setDrawerTaskId(id);
  const closeDrawer = () => setDrawerTaskId(null);

  const drawerData: TaskData | null = drawerTaskId
    ? tasksData[drawerTaskId] ?? tasksData["TSK-VAL-01"]
    : null;

  const statusBadgeClass = drawerData
    ? drawerData.due === "Completed"
      ? "badge-green"
      : drawerData.badge.includes("Errors")
      ? "badge-red"
      : "badge-amber"
    : "badge-amber";

  const overrideErrors = () => {
    window.alert(
      "Validation flags manually overridden by Admin. Documenting exception reason in system audit logs."
    );
  };

  const approveTransition = () => {
    window.alert(
      "Drawing sheet transition approved! Stage transition from DD to GFC logged."
    );
    closeDrawer();
  };

  const submitCreateTask = () => {
    window.alert("Task dispatched.");
    setShowCreateModal(false);
  };

  return (
    <>
      <style>{`
    .task-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .task-card {
      background: white;
      border-radius: var(--radius-2xl);
      border: 1px solid var(--color-gray-100);
      padding: 1.5rem;
      transition: all 0.25s var(--ease-out);
      cursor: pointer;
    }
    .task-card:hover {
      border-color: var(--color-gray-300);
      box-shadow: var(--shadow-lg);
      transform: translateY(-1px);
    }
    .task-card-header {
      display: flex;
      justify-content: justify;
      align-items: flex-start;
      margin-bottom: 1rem;
    }
    .task-card-body {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 1.5rem;
      align-items: center;
      padding-top: 1rem;
      border-top: 1px solid var(--color-gray-50);
    }

    /* Modal styling */
    .modal {
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
    .modal.open { display: flex; }
    .modal-content {
      background: white;
      border-radius: var(--radius-3xl);
      max-width: 600px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      padding: 2rem;
      animation: modalIn 0.3s var(--ease-out) both;
    }

    /* Task Detail Drawer */
    .drawer {
      position: fixed;
      top: 0; right: 0; bottom: 0;
      width: 500px;
      background: white;
      box-shadow: var(--shadow-2xl);
      border-left: 1px solid var(--color-gray-100);
      z-index: 150;
      transform: translateX(100%);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
    }
    .drawer.open { transform: translateX(0); }
    .drawer-header {
      padding: 1.5rem;
      border-bottom: 1px solid var(--color-gray-100);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .drawer-body {
      flex: 1;
      overflow-y: auto;
      padding: 1.5rem;
    }
    .drawer-footer {
      padding: 1.25rem 1.5rem;
      border-top: 1px solid var(--color-gray-100);
      background: var(--color-gray-50);
      display: flex;
      gap: 0.75rem;
    }
      `}</style>
      <EdifiShell system="validation" activeNav="tasks" section="admin">
        <div className="page-header">
          <div className="flex items-center justify-between">
            <div>
              <h1>Review Tasks & Approvals</h1>
              <p>Assign drawing sets to reviewers, manage validation workflows, and override validation flags for stage transitions.</p>
            </div>
            <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
              <EdIcon name="plus" size={14} />
              Assign Review Task
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <input type="text" className="form-input" placeholder="Search review tasks..." style={{ width: "260px", fontSize: "0.8125rem" }} />
          <select className="form-input form-select" style={{ width: "auto", fontSize: "0.8125rem" }}>
            <option>All Projects</option>
            <option>Tower A</option>
            <option>Tower B</option>
            <option>Podium Block</option>
          </select>
          <select className="form-input form-select" style={{ width: "auto", fontSize: "0.8125rem" }}>
            <option>All Reviewers</option>
            <option>Ar. Sharma</option>
            <option>Ar. Khan</option>
            <option>Ar. Rao</option>
          </select>
          <select className="form-input form-select" style={{ width: "auto", fontSize: "0.8125rem" }}>
            <option>All Status</option>
            <option>Flagged (Needs Review)</option>
            <option>In Progress</option>
            <option>Approved</option>
          </select>
        </div>

        {/* Task List */}
        <div className="task-list" id="taskListContainer">
          {/* Task 1 */}
          <div className="task-card" onClick={() => openDrawer("TSK-VAL-01")}>
            <div className="task-card-header flex justify-between items-start">
              <div>
                <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--color-gray-400)" }}>TSK-VAL-01 · Tower A</span>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginTop: "2px" }}>Review Floor Plan Level 3 (DD Stage)</h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-500)", marginTop: "4px" }}>Validate staircase details, spatial drift anomalies, and door schedule cross-references.</p>
              </div>
              <span className="badge badge-red">Flagged · 3 Errors</span>
            </div>
            <div className="task-card-body">
              <div>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)", display: "block", marginBottom: "4px" }}>Approval Progress</span>
                <div className="progress-bar mb-1" style={{ height: "6px" }}><div className="progress-fill" style={{ width: "25%", background: "var(--color-red-500)" }}></div></div>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>1 of 4 checks resolved (25%)</span>
              </div>
              <div>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)", display: "block" }}>Reviewer</span>
                <strong style={{ fontSize: "0.8125rem" }}>Ar. Sharma</strong>
              </div>
              <div>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)", display: "block" }}>Deadline</span>
                <strong style={{ fontSize: "0.8125rem", color: "var(--color-red-500)" }}>Due Today</strong>
              </div>
              <div style={{ textAlign: "right" }}>
                <a href="/user/val-reports" className="btn btn-secondary btn-sm" onClick={(e) => e.stopPropagation()}><EdIcon name="eye" size={12} /> Open Report</a>
              </div>
            </div>
          </div>

          {/* Task 2 */}
          <div className="task-card" onClick={() => openDrawer("TSK-VAL-02")}>
            <div className="task-card-header flex justify-between items-start">
              <div>
                <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--color-gray-400)" }}>TSK-VAL-02 · Tower B</span>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginTop: "2px" }}>GFC Stage Core B Staircase Details</h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-500)", marginTop: "4px" }}>Verify structural handrail dimensions and final construction specs against standard SD-STAIR-004.</p>
              </div>
              <span className="badge badge-green">Passed · 0 Flags</span>
            </div>
            <div className="task-card-body">
              <div>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)", display: "block", marginBottom: "4px" }}>Approval Progress</span>
                <div className="progress-bar mb-1" style={{ height: "6px" }}><div className="progress-fill progress-fill-green" style={{ width: "100%" }}></div></div>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>All checks resolved (100%)</span>
              </div>
              <div>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)", display: "block" }}>Reviewer</span>
                <strong style={{ fontSize: "0.8125rem" }}>Ar. Khan</strong>
              </div>
              <div>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)", display: "block" }}>Deadline</span>
                <strong style={{ fontSize: "0.8125rem" }}>Completed</strong>
              </div>
              <div style={{ textAlign: "right" }}>
                <button className="btn btn-primary btn-sm" onClick={(e) => { e.stopPropagation(); window.alert("Cache-to-Live transition approved."); }}><EdIcon name="checkCircle" size={12} /> Publish GFC</button>
              </div>
            </div>
          </div>

          {/* Task 3 */}
          <div className="task-card" onClick={() => openDrawer("TSK-VAL-03")}>
            <div className="task-card-header flex justify-between items-start">
              <div>
                <span style={{ fontSize: "0.6875rem", fontWeight: 700, color: "var(--color-gray-400)" }}>TSK-VAL-03 · Podium Block</span>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginTop: "2px" }}>Basement 1 MEP Sleeve Layout (SD Stage)</h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-500)", marginTop: "4px" }}>Verify structural clearance and schematic blockout locations before detail validation.</p>
              </div>
              <span className="badge badge-amber">Caution · 1 Flag</span>
            </div>
            <div className="task-card-body">
              <div>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)", display: "block", marginBottom: "4px" }}>Approval Progress</span>
                <div className="progress-bar mb-1" style={{ height: "6px" }}><div className="progress-fill" style={{ width: "80%", background: "var(--color-amber-500)" }}></div></div>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>4 of 5 checks resolved (80%)</span>
              </div>
              <div>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)", display: "block" }}>Reviewer</span>
                <strong style={{ fontSize: "0.8125rem" }}>Ar. Sharma</strong>
              </div>
              <div>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)", display: "block" }}>Deadline</span>
                <strong style={{ fontSize: "0.8125rem" }}>Jun 29, 2026</strong>
              </div>
              <div style={{ textAlign: "right" }}>
                <a href="/user/val-reports" className="btn btn-secondary btn-sm" onClick={(e) => e.stopPropagation()}><EdIcon name="eye" size={12} /> Open Report</a>
              </div>
            </div>
          </div>
        </div>

        {/* Assign Task Modal */}
        <div
          className={`modal${showCreateModal ? " open" : ""}`}
          id="createModal"
          onClick={(e) => { if (e.target === e.currentTarget) setShowCreateModal(false); }}
        >
          <div className="modal-content">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Assign Drawing Review</h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-400)" }}>Select drawing set, assign reviewer, choose validation ruleset, and set timeline.</p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                style={{ padding: "8px", color: "var(--color-gray-400)", background: "none", border: "none", cursor: "pointer" }}
                aria-label="Close"
              >
                <EdIcon name="x" size={20} />
              </button>
            </div>

            <div>
              <div className="form-group">
                <label className="form-label">Drawing Sheet / Set Name</label>
                <input type="text" className="form-input" id="taskTitle" placeholder="e.g. DWG-EL-N01_Elevation_NorthFacade" />
              </div>
              <div className="grid-2" style={{ gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Project</label>
                  <select className="form-input form-select" id="taskProject">
                    <option>Tower A</option>
                    <option>Tower B</option>
                    <option>Podium Block</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Reviewer</label>
                  <select className="form-input form-select" id="taskReviewer">
                    <option>Ar. Sharma</option>
                    <option>Ar. Khan</option>
                    <option>Ar. Rao</option>
                  </select>
                </div>
              </div>
              <div className="grid-2" style={{ gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Stage Validation Rules</label>
                  <select className="form-input form-select" id="taskStage" defaultValue="DD Stage Rules">
                    <option>SD Stage Rules</option>
                    <option>DD Stage Rules</option>
                    <option>GFC Stage Rules</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Due Date</label>
                  <input type="date" className="form-input" id="taskDueDate" defaultValue="2026-06-30" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Special Review Instructions</label>
                <textarea className="form-input" id="taskDesc" rows={3} placeholder="Identify any parameters that need special attention (e.g., HVAC corridor clearance standards)..."></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6 pt-4 border-top" style={{ borderTop: "1px solid var(--color-gray-100)" }}>
              <button className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={submitCreateTask}><EdIcon name="zap" size={14} /> Dispatch Task</button>
            </div>
          </div>
        </div>

        {/* Task Detail Drawer */}
        <div className={`drawer${drawerTaskId ? " open" : ""}`} id="detailDrawer">
          <div className="drawer-header">
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700 }} id="drawerTitle">{drawerData?.title ?? "Review Floor Plan Level 3"}</h3>
              <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }} id="drawerTaskId">{drawerTaskId ? `${drawerTaskId} · ${drawerData?.project}` : "TSK-VAL-01 · Tower A"}</p>
            </div>
            <button
              onClick={closeDrawer}
              style={{ padding: "8px", color: "var(--color-gray-400)", background: "none", border: "none", cursor: "pointer" }}
              aria-label="Close"
            >
              <EdIcon name="x" size={18} />
            </button>
          </div>
          <div className="drawer-body">
            {/* Status Badges */}
            <div className="flex gap-2 mb-4" id="drawerBadges">
              <span className={`badge ${statusBadgeClass}`}>{drawerData?.badge ?? "Flagged · 3 Errors"}</span>
              <span className="badge badge-purple">{drawerData?.stage ?? "DD Stage"}</span>
            </div>

            {/* Description */}
            <div className="card card-flat p-4 mb-4">
              <p className="label mb-2">Instructions</p>
              <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-700)", lineHeight: 1.5 }} id="drawerDesc">
                {drawerData?.desc ?? "Validate staircase details, spatial drift anomalies (reception relocation), and door schedule cross-references against SD approved intents. Verify dimensional accuracy of safety items."}
              </p>
            </div>

            {/* Validation Summary */}
            <p className="label mb-2">Validation Rule Status</p>
            <div className="flex flex-col gap-2 mb-4" style={{ fontSize: "0.75rem" }}>
              <div className="card p-3 flex items-center justify-between" style={{ borderLeft: "3px solid var(--color-red-500)" }}>
                <div>
                  <strong>Handrail height not dimensioned</strong>
                  <p style={{ color: "var(--color-gray-400)", marginTop: "2px" }}>Staircase detail at Core B is missing safety height.</p>
                </div>
                <span className="badge severity-critical">ERROR</span>
              </div>
              <div className="card p-3 flex items-center justify-between" style={{ borderLeft: "3px solid var(--color-red-500)" }}>
                <div>
                  <strong>Cross-reference mismatch: Door schedule</strong>
                  <p style={{ color: "var(--color-gray-400)", marginTop: "2px" }}>Door D-307 tagged but missing in Door Schedule.</p>
                </div>
                <span className="badge severity-critical">ERROR</span>
              </div>
              <div className="card p-3 flex items-center justify-between" style={{ borderLeft: "3px solid var(--color-amber-400)" }}>
                <div>
                  <strong>Annotation font inconsistency</strong>
                  <p style={{ color: "var(--color-gray-400)", marginTop: "2px" }}>Text height 2.5mm instead of office standard 3.0mm.</p>
                </div>
                <span className="badge severity-major">CAUTION</span>
              </div>
            </div>

            {/* Meta Info */}
            <table className="data-table" style={{ fontSize: "0.8125rem", marginBottom: "1.5rem" }}>
              <tbody>
                <tr><td style={{ color: "var(--color-gray-400)", padding: "8px 0" }}>Assigned Reviewer</td><td style={{ fontWeight: 700, padding: "8px 0" }} id="drawerAssignee">{drawerData?.reviewer ?? "Ar. Sharma"}</td></tr>
                <tr><td style={{ color: "var(--color-gray-400)", padding: "8px 0" }}>Due Date</td><td style={{ fontWeight: 700, padding: "8px 0", color: "var(--color-red-500)" }} id="drawerDueDate">{drawerData?.due ?? "Due Today"}</td></tr>
                <tr><td style={{ color: "var(--color-gray-400)", padding: "8px 0" }}>Drawing sheet</td><td style={{ padding: "8px 0", fontFamily: "monospace", fontWeight: 600 }} id="drawerDrawing">{drawerData?.drawing ?? "DWG-FP-003.pdf"}</td></tr>
              </tbody>
            </table>

          </div>
          <div className="drawer-footer">
            <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => (window.location.href = "/user/val-reports")}><EdIcon name="eye" size={12} /> Open Report</button>
            <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={overrideErrors}><EdIcon name="shield" size={12} /> Override Flags</button>
            <button className="btn btn-primary btn-sm" style={{ flex: 2 }} onClick={approveTransition}><EdIcon name="checkCircle" size={12} /> Approve Transition</button>
          </div>
        </div>
      </EdifiShell>
    </>
  );
}
