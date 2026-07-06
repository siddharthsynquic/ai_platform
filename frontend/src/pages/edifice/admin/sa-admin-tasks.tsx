import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { EdIcon } from "@/shared/icons/edifice-icons";
import { useState, useRef, type MouseEvent as ReactMouseEvent } from "react";

type TaskData = {
  title: string;
  project: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  status: "Backlog" | "Assigned" | "In Progress" | "Completed";
  desc: string;
  assignee: string;
  due: string;
  related: string;
  plan: string;
};

const tasksData: Record<string, TaskData> = {
  "TSK-101": {
    title: "Resolve waterproofing membrane gap",
    project: "Tower A",
    priority: "Critical",
    status: "In Progress",
    desc: "Oversee remediation of 15cm parapet waterproofing breach. Confirm contractor overlays membrane per SD-WP-012 standard detail before the concrete pour. Take verification photos.",
    assignee: "Site Team 1",
    due: "Jun 26, 2026 (Overdue)",
    related: "QRY-255",
    plan: "Tower A — Floor 12 Plan",
  },
  "TSK-102": {
    title: "Document facade glass installation",
    project: "Tower A",
    priority: "High",
    status: "Assigned",
    desc: "Capture high-resolution photos of glass panel bracket attachments on level 10 west elevation for design verification.",
    assignee: "Eng. Patel",
    due: "Jun 28, 2026",
    related: "None",
    plan: "Tower A — Floor 10 Plan",
  },
  "TSK-103": {
    title: "Core B MEP sleeve verification",
    project: "Tower B",
    priority: "Medium",
    status: "Assigned",
    desc: "Verify and log alignment of all electrical and plumbing sleeves passing through Core B slab before concrete placement.",
    assignee: "Site Team 2",
    due: "Jun 27, 2026",
    related: "None",
    plan: "Tower B — Floor 7 Plan",
  },
  "TSK-104": {
    title: "Inspect Floor 6 partition frames",
    project: "Tower B",
    priority: "Medium",
    status: "Backlog",
    desc: "Perform visual inspection of drywall stud partition frames on Level 6, Core A/B zone. Confirm dimensions against layout DWG-IN-F06.",
    assignee: "Unassigned",
    due: "Jun 30, 2026",
    related: "None",
    plan: "Tower B — Floor 6 Plan",
  },
  "TSK-105": {
    title: "Verify exit signage positions",
    project: "Podium Block",
    priority: "Low",
    status: "Backlog",
    desc: "Verify visual height and alignment of glow-in-dark escape route signs in basement and block C levels.",
    assignee: "Unassigned",
    due: "Jul 05, 2026",
    related: "None",
    plan: "Podium Block — Basement Plan",
  },
};

const pageStyles = `
    .task-board {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.25rem;
      align-items: start;
    }
    .board-column {
      background: var(--color-gray-50);
      border-radius: var(--radius-2xl);
      padding: 1.25rem;
      border: 1px solid var(--color-gray-100);
      min-height: 500px;
    }
    .column-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .column-title {
      font-size: 0.8125rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-gray-500);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .task-card {
      background: white;
      border-radius: var(--radius-xl);
      padding: 1rem;
      border: 1px solid var(--color-gray-100);
      box-shadow: var(--shadow-sm);
      margin-bottom: 0.75rem;
      cursor: pointer;
      transition: all 0.2s var(--ease-out);
      position: relative;
    }
    .task-card:hover {
      border-color: var(--color-gray-300);
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
    }
    .task-card.priority-critical { border-left: 3px solid var(--color-red-500); }
    .task-card.priority-high { border-left: 3px solid var(--color-amber-500); }
    .task-card.priority-medium { border-left: 3px solid var(--color-blue-400); }
    .task-card.priority-low { border-left: 3px solid var(--color-gray-300); }

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
      max-width: 850px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      padding: 2rem;
      animation: modalIn 0.3s var(--ease-out) both;
    }

    /* Plan Pinning in Modal */
    .plan-selector-container {
      background: var(--color-gray-900);
      border-radius: var(--radius-2xl);
      height: 250px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-gray-500);
      overflow: hidden;
      cursor: crosshair;
      margin-top: 8px;
    }
    .plan-pin {
      position: absolute;
      width: 24px;
      height: 24px;
      background: var(--color-red-500);
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: var(--shadow-md);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 0.5rem;
      font-weight: 800;
      transform: translate(-50%, -50%);
    }

    /* Task Detail Drawer */
    .drawer {
      position: fixed;
      top: 0; right: 0; bottom: 0;
      width: 480px;
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
`;

export function SaAdminTasksPage() {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerTaskId, setDrawerTaskId] = useState<string>("TSK-101");

  const [taskProject, setTaskProject] = useState("Tower A");
  const [taskFloor, setTaskFloor] = useState("Floor 12");
  const [taskGridRef, setTaskGridRef] = useState("Zone A");
  const [pin, setPin] = useState<{ x: number; y: number } | null>(null);
  const planRef = useRef<HTMLDivElement | null>(null);

  const openCreateModal = () => {
    setCreateModalOpen(true);
    setPin(null);
  };
  const closeCreateModal = () => setCreateModalOpen(false);

  const openDrawer = (id: string) => {
    setDrawerTaskId(id);
    setDrawerOpen(true);
  };
  const closeDrawer = () => setDrawerOpen(false);

  const placeTaskPin = (e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPin({ x, y });
    const zones = ["Zone A", "Zone B", "Zone C", "Zone D"];
    const pickedZone = zones[Math.floor(x / 26)] || "Zone A";
    const grids = ["C-7", "D-9", "F-12", "A-3"];
    const pickedGrid = grids[Math.floor(y / 26)] || "C-7";
    setTaskGridRef(`${pickedZone}, Grid ${pickedGrid}`);
  };

  const updatePlanView = () => {
    setPin(null);
  };

  const submitCreateTask = () => {
    window.alert("Task created and dispatched (demo).");
    closeCreateModal();
  };

  const escalateTask = () => {
    window.alert("Task escalated to project directors and contractor management.");
  };

  const approveCompletion = () => {
    window.alert("Task completion approved. Observation resolved and closed in database.");
    closeDrawer();
  };

  const drawerData = tasksData[drawerTaskId] ?? tasksData["TSK-101"];
  const priorityBadgeClass =
    drawerData.priority === "Critical"
      ? "severity-critical"
      : drawerData.priority === "High"
      ? "severity-major"
      : "badge-gray";
  const statusBadgeClass =
    drawerData.status === "Completed"
      ? "badge-green"
      : drawerData.status === "In Progress"
      ? "badge-amber"
      : "badge-blue";

  return (
    <>
      <style>{pageStyles}</style>
      <EdifiShell system="site-agent" activeNav="tasks" section="admin">
        <div className="page-header">
          <div className="flex items-center justify-between">
            <div>
              <h1>Task Assignments</h1>
              <p>Create, assign, and track field inspections, query resolutions, and observations for site teams.</p>
            </div>
            <button className="btn btn-primary" onClick={openCreateModal}>
              <EdIcon name="plus" size={14} />
              Create Task
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <input type="text" className="form-input" placeholder="Search tasks..." style={{ width: "260px", fontSize: "0.8125rem" }} />
          <select className="form-input form-select" style={{ width: "auto", fontSize: "0.8125rem" }} defaultValue="All Projects" onChange={() => {}}>
            <option>All Projects</option>
            <option>Tower A</option>
            <option>Tower B</option>
            <option>Podium Block</option>
          </select>
          <select className="form-input form-select" style={{ width: "auto", fontSize: "0.8125rem" }} defaultValue="All Assignees" onChange={() => {}}>
            <option>All Assignees</option>
            <option>Site Team 1</option>
            <option>Site Team 2</option>
            <option>Eng. Patel</option>
            <option>Ar. Sharma</option>
          </select>
          <select className="form-input form-select" style={{ width: "auto", fontSize: "0.8125rem" }} defaultValue="All Priorities" onChange={() => {}}>
            <option>All Priorities</option>
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        {/* Kanban Board */}
        <div className="task-board">
          {/* Column 1: Backlog */}
          <div className="board-column">
            <div className="column-header">
              <span className="column-title">
                <span className="status-dot" style={{ background: "var(--color-gray-400)" }}></span> Backlog (2)
              </span>
              <span className="badge badge-gray" style={{ fontSize: "0.625rem" }}>2</span>
            </div>
            <div id="col-backlog" className="column-cards">
              <div className="task-card priority-medium" onClick={() => openDrawer("TSK-104")}>
                <div className="flex justify-between items-center mb-1">
                  <span style={{ fontSize: "0.625rem", fontWeight: 700, color: "var(--color-gray-400)" }}>TSK-104 · Tower B</span>
                  <span className="badge badge-gray" style={{ fontSize: "0.5rem" }}>Medium</span>
                </div>
                <strong style={{ fontSize: "0.8125rem", display: "block", marginBottom: "4px" }}>Inspect Floor 6 partition frames</strong>
                <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)", lineHeight: 1.4, marginBottom: "10px" }}>Check studs alignment against drawing DWG-IN-F06.</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1" style={{ fontSize: "0.625rem", color: "var(--color-gray-400)" }}>
                    <EdIcon name="calendar" size={10} /> Due Jun 30
                  </span>
                  <div style={{ width: "20px", height: "20px", background: "var(--color-gray-100)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5rem", fontWeight: 700, color: "var(--color-gray-400)" }}>—</div>
                </div>
              </div>
              <div className="task-card priority-low" onClick={() => openDrawer("TSK-105")}>
                <div className="flex justify-between items-center mb-1">
                  <span style={{ fontSize: "0.625rem", fontWeight: 700, color: "var(--color-gray-400)" }}>TSK-105 · Podium</span>
                  <span className="badge badge-gray" style={{ fontSize: "0.5rem" }}>Low</span>
                </div>
                <strong style={{ fontSize: "0.8125rem", display: "block", marginBottom: "4px" }}>Verify exit signage positions</strong>
                <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)", lineHeight: 1.4, marginBottom: "10px" }}>Ensure visual height alignment on Ground Level Block C.</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1" style={{ fontSize: "0.625rem", color: "var(--color-gray-400)" }}>
                    <EdIcon name="calendar" size={10} /> Due Jul 05
                  </span>
                  <div style={{ width: "20px", height: "20px", background: "var(--color-gray-100)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5rem", fontWeight: 700, color: "var(--color-gray-400)" }}>—</div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Assigned */}
          <div className="board-column">
            <div className="column-header">
              <span className="column-title">
                <span className="status-dot" style={{ background: "var(--color-blue-400)" }}></span> Assigned (2)
              </span>
              <span className="badge badge-gray" style={{ fontSize: "0.625rem" }}>2</span>
            </div>
            <div id="col-assigned" className="column-cards">
              <div className="task-card priority-high" onClick={() => openDrawer("TSK-102")}>
                <div className="flex justify-between items-center mb-1">
                  <span style={{ fontSize: "0.625rem", fontWeight: 700, color: "var(--color-gray-400)" }}>TSK-102 · Tower A</span>
                  <span className="badge severity-major" style={{ fontSize: "0.5rem" }}>High</span>
                </div>
                <strong style={{ fontSize: "0.8125rem", display: "block", marginBottom: "4px" }}>Document facade glass installation</strong>
                <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)", lineHeight: 1.4, marginBottom: "10px" }}>Capture high-res photos of bracket attachments on level 10 west elevation.</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1" style={{ fontSize: "0.625rem", color: "var(--color-gray-400)" }}>
                    <EdIcon name="calendar" size={10} /> Due Jun 28
                  </span>
                  <div style={{ width: "20px", height: "20px", background: "#f59e0b", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5rem", fontWeight: 700, color: "white" }} title="Eng. Patel">VP</div>
                </div>
              </div>
              <div className="task-card priority-medium" onClick={() => openDrawer("TSK-103")}>
                <div className="flex justify-between items-center mb-1">
                  <span style={{ fontSize: "0.625rem", fontWeight: 700, color: "var(--color-gray-400)" }}>TSK-103 · Tower B</span>
                  <span className="badge badge-gray" style={{ fontSize: "0.5rem" }}>Medium</span>
                </div>
                <strong style={{ fontSize: "0.8125rem", display: "block", marginBottom: "4px" }}>Core B MEP sleeve verification</strong>
                <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)", lineHeight: 1.4, marginBottom: "10px" }}>Check blockout sleeves before next concrete floor slab pour.</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1" style={{ fontSize: "0.625rem", color: "var(--color-gray-400)" }}>
                    <EdIcon name="calendar" size={10} /> Due Jun 27
                  </span>
                  <div style={{ width: "20px", height: "20px", background: "var(--color-gray-400)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5rem", fontWeight: 700, color: "white" }} title="Site Team 2">T2</div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: In Progress */}
          <div className="board-column">
            <div className="column-header">
              <span className="column-title">
                <span className="status-dot" style={{ background: "var(--color-amber-400)" }}></span> In Progress (1)
              </span>
              <span className="badge badge-gray" style={{ fontSize: "0.625rem" }}>1</span>
            </div>
            <div id="col-inprogress" className="column-cards">
              <div className="task-card priority-critical" onClick={() => openDrawer("TSK-101")}>
                <div className="flex justify-between items-center mb-1">
                  <span style={{ fontSize: "0.625rem", fontWeight: 700, color: "var(--color-gray-400)" }}>TSK-101 · Tower A</span>
                  <span className="badge severity-critical" style={{ fontSize: "0.5rem" }}>Critical</span>
                </div>
                <strong style={{ fontSize: "0.8125rem", display: "block", marginBottom: "4px" }}>Resolve waterproofing membrane gap</strong>
                <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)", lineHeight: 1.4, marginBottom: "10px" }}>Oversee remediation of 15cm parapet waterproofing breach (Ref: QRY-255).</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1" style={{ fontSize: "0.625rem", color: "var(--color-red-500)", fontWeight: 600 }}>
                    <EdIcon name="clock" size={10} /> Overdue 1d
                  </span>
                  <div style={{ width: "20px", height: "20px", background: "#22c55e", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5rem", fontWeight: 700, color: "white" }} title="Site Team 1">T1</div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Completed */}
          <div className="board-column">
            <div className="column-header">
              <span className="column-title">
                <span className="status-dot" style={{ background: "var(--color-green-500)" }}></span> Completed (3)
              </span>
              <span className="badge badge-gray" style={{ fontSize: "0.625rem" }}>3</span>
            </div>
            <div id="col-completed" className="column-cards">
              <div className="task-card priority-medium" style={{ opacity: 0.75 }} onClick={() => openDrawer("TSK-098")}>
                <div className="flex justify-between items-center mb-1">
                  <span style={{ fontSize: "0.625rem", fontWeight: 700, color: "var(--color-gray-400)" }}>TSK-098 · Tower A</span>
                  <span className="badge badge-green" style={{ fontSize: "0.5rem" }}>✓ Resolved</span>
                </div>
                <strong style={{ fontSize: "0.8125rem", display: "block", marginBottom: "4px", textDecoration: "line-through" }}>Facade panel alignment check</strong>
                <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)", lineHeight: 1.4, marginBottom: "10px" }}>Verify structural tolerance limits on Level 8 East facade panels.</p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1" style={{ fontSize: "0.625rem", color: "var(--color-green-600)", fontWeight: 600 }}>
                    <EdIcon name="checkCircle" size={10} /> Completed
                  </span>
                  <div style={{ width: "20px", height: "20px", background: "#22c55e", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5rem", fontWeight: 700, color: "white" }}>T1</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </EdifiShell>

      {/* Create Task Modal */}
      <div
        className={`modal${createModalOpen ? " open" : ""}`}
        id="createModal"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeCreateModal();
        }}
      >
        <div className="modal-content">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Create & Assign Task</h3>
              <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-400)" }}>Define work item, assign to site team, and drop a location pin.</p>
            </div>
            <button onClick={closeCreateModal} style={{ padding: "8px", color: "var(--color-gray-400)", background: "none", border: "none", cursor: "pointer" }}>
              <EdIcon name="x" size={20} />
            </button>
          </div>

          <div className="grid-2" style={{ gap: "1.5rem" }}>
            {/* Left details */}
            <div>
              <div className="form-group">
                <label className="form-label">Task Title</label>
                <input type="text" className="form-input" id="taskTitle" placeholder="e.g. Inspect staircase rebar spacing" />
              </div>
              <div className="grid-2" style={{ gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Project</label>
                  <select
                    className="form-input form-select"
                    id="taskProject"
                    value={taskProject}
                    onChange={(e) => {
                      setTaskProject(e.target.value);
                      updatePlanView();
                    }}
                  >
                    <option value="Tower A">Tower A</option>
                    <option value="Tower B">Tower B</option>
                    <option value="Podium Block">Podium Block</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Assignee</label>
                  <select className="form-input form-select" id="taskAssignee" defaultValue="Site Team 1" onChange={() => {}}>
                    <option value="Site Team 1">Site Team 1</option>
                    <option value="Site Team 2">Site Team 2</option>
                    <option value="Eng. Patel">Eng. Patel</option>
                    <option value="Ar. Sharma">Ar. Sharma</option>
                  </select>
                </div>
              </div>
              <div className="grid-2" style={{ gap: "1rem" }}>
                <div className="form-group">
                  <label className="form-label">Priority</label>
                  <select className="form-input form-select" id="taskPriority" defaultValue="Medium" onChange={() => {}}>
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Due Date</label>
                  <input type="date" className="form-input" id="taskDueDate" defaultValue="2026-06-30" />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Description / Instructions</label>
                <textarea className="form-input" id="taskDesc" rows={3} placeholder="Add specific checklist, reference drawings, or quality standards..." />
              </div>
            </div>

            {/* Right: Map Pinning */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="form-label" style={{ marginBottom: 0 }}>📍 Location Pin on Plan</label>
                <select
                  className="form-input form-select"
                  style={{ width: "auto", fontSize: "0.6875rem", padding: "4px 22px 4px 8px" }}
                  id="taskFloor"
                  value={taskFloor}
                  onChange={(e) => {
                    setTaskFloor(e.target.value);
                    updatePlanView();
                  }}
                >
                  <option>Floor 12</option>
                  <option>Floor 11</option>
                  <option>Floor 10</option>
                  <option>Floor 9</option>
                  <option>Floor 7</option>
                </select>
              </div>
              <p style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)", marginBottom: "10px" }}>Tap anywhere on the drawing layout to attach a task pin.</p>
              <div className="plan-selector-container" id="planSelector" ref={planRef} onClick={placeTaskPin}>
                <div style={{ textAlign: "center" }} id="planPlaceholder">
                  <span style={{ margin: "0 auto 6px", display: "block", color: "var(--color-gray-400)" }}>
                    <EdIcon name="mapPin" size={28} />
                  </span>
                  <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "white" }} id="planTitleText">
                    {taskProject} — {taskFloor} Plan
                  </p>
                  <p style={{ fontSize: "0.625rem", opacity: 0.5 }}>Tap to attach location pin</p>
                </div>
                {pin && (
                  <div className="plan-pin" style={{ top: `${pin.y}%`, left: `${pin.x}%` }}>●</div>
                )}
              </div>
              <div className="form-group mt-3">
                <label className="form-label">Zone / Grid Reference</label>
                <input
                  type="text"
                  className="form-input"
                  id="taskGridRef"
                  placeholder="e.g. Zone A, Grid C-7"
                  value={taskGridRef}
                  onChange={(e) => setTaskGridRef(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-top" style={{ borderTop: "1px solid var(--color-gray-100)" }}>
            <button className="btn btn-secondary" onClick={closeCreateModal}>Cancel</button>
            <button className="btn btn-primary" onClick={submitCreateTask}>
              <EdIcon name="zap" size={14} /> Create & Dispatch
            </button>
          </div>
        </div>
      </div>

      {/* Task Detail Drawer */}
      <div className={`drawer${drawerOpen ? " open" : ""}`} id="detailDrawer">
        <div className="drawer-header">
          <div>
            <h3 style={{ fontSize: "1rem", fontWeight: 700 }} id="drawerTitle">{drawerData.title}</h3>
            <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }} id="drawerTaskId">{drawerTaskId} · {drawerData.project}</p>
          </div>
          <button onClick={closeDrawer} style={{ padding: "8px", color: "var(--color-gray-400)", background: "none", border: "none", cursor: "pointer" }}>
            <EdIcon name="x" size={18} />
          </button>
        </div>
        <div className="drawer-body">
          {/* Status Badge */}
          <div className="flex gap-2 mb-4" id="drawerBadges">
            <span className={`badge ${priorityBadgeClass}`}>{drawerData.priority}</span>
            <span className={`badge ${statusBadgeClass}`}>{drawerData.status}</span>
          </div>

          {/* Description */}
          <div className="card card-flat p-4 mb-4">
            <p className="label mb-2">Instructions</p>
            <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-700)", lineHeight: 1.5 }} id="drawerDesc">
              {drawerData.desc}
            </p>
          </div>

          {/* Location Plan */}
          <div className="mb-4">
            <p className="label mb-2">📍 Pinned Location</p>
            <div className="plan-selector-container" style={{ height: "150px", cursor: "default" }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "white" }} id="drawerPlanTitle">{drawerData.plan}</p>
              <div className="plan-pin" style={{ top: "35%", left: "62%" }}>●</div>
            </div>
          </div>

          {/* Meta Info */}
          <table className="data-table" style={{ fontSize: "0.8125rem", marginBottom: "1.5rem" }}>
            <tbody>
              <tr>
                <td style={{ color: "var(--color-gray-400)", padding: "8px 0" }}>Assignee</td>
                <td style={{ fontWeight: 700, padding: "8px 0" }} id="drawerAssignee">{drawerData.assignee}</td>
              </tr>
              <tr>
                <td style={{ color: "var(--color-gray-400)", padding: "8px 0" }}>Due Date</td>
                <td style={{ fontWeight: 700, padding: "8px 0", color: "var(--color-red-500)" }} id="drawerDueDate">{drawerData.due}</td>
              </tr>
              <tr>
                <td style={{ color: "var(--color-gray-400)", padding: "8px 0" }}>Related Query</td>
                <td style={{ padding: "8px 0" }}>
                  <a
                    href={drawerData.related === "None" ? "#" : "/user/sa-site-queries"}
                    style={{ fontWeight: 600, color: "var(--color-blue-500)" }}
                    id="drawerRelated"
                  >
                    {drawerData.related}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Comments/Updates */}
          <p className="label mb-2">Activity History</p>
          <div className="flex flex-col gap-3" style={{ fontSize: "0.75rem" }}>
            <div style={{ background: "var(--color-gray-50)", padding: "10px", borderRadius: "var(--radius-lg)" }}>
              <div className="flex justify-between mb-1">
                <strong>Site Team 1</strong>
                <span style={{ color: "var(--color-gray-400)" }}>Yesterday</span>
              </div>
              <p style={{ color: "var(--color-gray-600)" }}>Work stopped on parapet area. Waiting for Contractor X crew to arrive.</p>
            </div>
            <div style={{ background: "var(--color-gray-50)", padding: "10px", borderRadius: "var(--radius-lg)" }}>
              <div className="flex justify-between mb-1">
                <strong>Ar. Sharma (Admin)</strong>
                <span style={{ color: "var(--color-gray-400)" }}>2 days ago</span>
              </div>
              <p style={{ color: "var(--color-gray-600)" }}>Task created and assigned to Site Team 1 based on critical waterproofing query.</p>
            </div>
          </div>
        </div>
        <div className="drawer-footer">
          <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => window.alert("Coming soon")}>
            <EdIcon name="edit" size={12} /> Edit
          </button>
          <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={escalateTask}>
            <EdIcon name="alertTriangle" size={12} /> Escalate
          </button>
          <button className="btn btn-primary btn-sm" style={{ flex: 2 }} onClick={approveCompletion}>
            <EdIcon name="checkCircle" size={12} /> Approve Complete
          </button>
        </div>
      </div>
    </>
  );
}
