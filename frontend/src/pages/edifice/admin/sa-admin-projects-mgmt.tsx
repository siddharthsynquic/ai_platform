import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { EdIcon } from "@/shared/icons/edifice-icons";
import { useState } from "react";

const pageStyles = `
    .panel-content { padding: var(--space-8); }
    .page-tabs {
      display: flex;
      border-bottom: 1px solid var(--color-gray-100);
      margin-bottom: var(--space-6);
      gap: 0;
    }
    .page-tab {
      padding: 10px 20px;
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--color-gray-400);
      border-bottom: 2px solid transparent;
      cursor: pointer;
      transition: all 0.15s;
      white-space: nowrap;
      background: none;
      border-top: none;
      border-left: none;
      border-right: none;
    }
    .page-tab:hover { color: var(--color-black); }
    .page-tab.active { color: var(--color-black); border-bottom-color: var(--color-black); }
    .tab-panel { display: none; }
    .tab-panel.active { display: block; }
    .project-row {
      display: grid;
      grid-template-columns: 1fr 120px 100px 100px 100px 80px;
      align-items: center;
      padding: 14px 0;
      border-bottom: 1px solid var(--color-gray-50);
      gap: var(--space-4);
    }
    .project-row:hover { background: var(--color-gray-50); margin: 0 -16px; padding-left: 16px; padding-right: 16px; border-radius: var(--radius-lg); }
    .project-row-name { font-size: 0.875rem; font-weight: 600; }
    .project-row-sub { font-size: 0.6875rem; color: var(--color-gray-400); }
    .toolbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-5); flex-wrap: wrap; gap: var(--space-3); }
    .toolbar-search {
      display: flex; align-items: center; gap: 8px;
      padding: 7px 14px; background: var(--color-white);
      border: 1px solid var(--color-gray-200); border-radius: var(--radius-xl); width: 260px;
    }
    .toolbar-search input { border: none; background: none; font-size: 0.8125rem; outline: none; flex: 1; }
    .category-tag {
      padding: 3px 10px; font-size: 0.625rem; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.08em;
      border-radius: var(--radius-full); white-space: nowrap;
    }
    .cat-residential { background: var(--color-blue-50); color: var(--color-blue-600); }
    .cat-commercial { background: var(--color-amber-50); color: var(--color-amber-600); }
    .cat-hospitality { background: var(--color-purple-50); color: var(--color-purple-600); }
    .cat-retail { background: var(--color-green-50); color: var(--color-green-600); }
    .cat-public { background: var(--color-cyan-50); color: var(--color-cyan-500); }
    .report-card {
      border: 1px solid var(--color-gray-100);
      border-radius: var(--radius-xl);
      padding: var(--space-4);
      transition: all 0.2s;
      cursor: pointer;
    }
    .report-card:hover { border-color: var(--color-gray-300); box-shadow: var(--shadow-sm); }
`;

type TabId = "tab-projects" | "tab-observations" | "tab-reports" | "tab-categories";

export function SaAdminProjectsMgmtPage() {
  const [activeTab, setActiveTab] = useState<TabId>("tab-projects");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const isActive = (id: TabId) => activeTab === id;

  return (
    <>
      <style>{pageStyles}</style>
      <EdifiShell system="site-agent" activeNav="projects" section="admin">
        <div className="page-header">
          <h1>Project Management</h1>
          <p>Manage all construction projects, their site teams, observations, and reports.</p>
        </div>

        {/* Page Tabs */}
        <div className="page-tabs">
          <button className={`page-tab${isActive("tab-projects") ? " active" : ""}`} onClick={() => setActiveTab("tab-projects")}>All Projects</button>
          <button className={`page-tab${isActive("tab-observations") ? " active" : ""}`} onClick={() => setActiveTab("tab-observations")}>Observations</button>
          <button className={`page-tab${isActive("tab-reports") ? " active" : ""}`} onClick={() => setActiveTab("tab-reports")}>Site Reports</button>
          <button className={`page-tab${isActive("tab-categories") ? " active" : ""}`} onClick={() => setActiveTab("tab-categories")}>Categories</button>
        </div>

        {/* TAB: All Projects */}
        <div className={`tab-panel${isActive("tab-projects") ? " active" : ""}`} id="tab-projects">
          <div className="toolbar">
            <div className="toolbar-search">
              <span style={{ color: "var(--color-gray-300)" }}>
                <EdIcon name="search" size={14} />
              </span>
              <input type="text" placeholder="Search projects..." />
            </div>
            <div className="flex items-center gap-2">
              <button className="btn btn-secondary btn-sm" onClick={() => window.alert("Coming soon")}>
                <EdIcon name="upload" size={14} />
                Import
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => setAddOpen(true)}>
                <EdIcon name="plus" size={14} />
                New Project
              </button>
            </div>
          </div>

          {/* Column Headers */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 100px 100px 100px 80px", padding: "8px 0", borderBottom: "1px solid var(--color-gray-100)", gap: "var(--space-4)" }}>
            <span className="label">Project</span>
            <span className="label">Category</span>
            <span className="label">Status</span>
            <span className="label">Observations</span>
            <span className="label">Open Queries</span>
            <span className="label text-right">Actions</span>
          </div>

          {/* Project Rows */}
          <div className="project-row">
            <div>
              <div className="project-row-name">Tower A — Marina Bay</div>
              <div className="project-row-sub">42-storey tower · Floors 7-24 active</div>
            </div>
            <span className="category-tag cat-residential">Residential</span>
            <span className="badge badge-green" style={{ width: "fit-content" }}>Active</span>
            <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>156</span>
            <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-red-500)" }}>12</span>
            <div className="flex justify-end gap-1">
              <button className="btn btn-ghost btn-sm" onClick={() => setEditOpen(true)} title="Edit"><EdIcon name="edit" size={14} /></button>
              <button className="btn btn-ghost btn-sm" title="Archive" onClick={() => window.alert("Coming soon")}><EdIcon name="archive" size={14} /></button>
            </div>
          </div>

          <div className="project-row">
            <div>
              <div className="project-row-name">Mall Block C</div>
              <div className="project-row-sub">Retail podium · Finishing works</div>
            </div>
            <span className="category-tag cat-retail">Retail</span>
            <span className="badge badge-green" style={{ width: "fit-content" }}>Active</span>
            <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>89</span>
            <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-red-500)" }}>5</span>
            <div className="flex justify-end gap-1">
              <button className="btn btn-ghost btn-sm" title="Edit" onClick={() => setEditOpen(true)}><EdIcon name="edit" size={14} /></button>
              <button className="btn btn-ghost btn-sm" title="Archive" onClick={() => window.alert("Coming soon")}><EdIcon name="archive" size={14} /></button>
            </div>
          </div>

          <div className="project-row">
            <div>
              <div className="project-row-name">Residences Phase 2</div>
              <div className="project-row-sub">Villas · Foundation stage</div>
            </div>
            <span className="category-tag cat-residential">Residential</span>
            <span className="badge badge-green" style={{ width: "fit-content" }}>Active</span>
            <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>42</span>
            <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-red-500)" }}>3</span>
            <div className="flex justify-end gap-1">
              <button className="btn btn-ghost btn-sm" title="Edit" onClick={() => setEditOpen(true)}><EdIcon name="edit" size={14} /></button>
              <button className="btn btn-ghost btn-sm" title="Archive" onClick={() => window.alert("Coming soon")}><EdIcon name="archive" size={14} /></button>
            </div>
          </div>

          <div className="project-row">
            <div>
              <div className="project-row-name">Office Tower East</div>
              <div className="project-row-sub">Commercial · On hold — design revision</div>
            </div>
            <span className="category-tag cat-commercial">Commercial</span>
            <span className="badge badge-red" style={{ width: "fit-content" }}>On Hold</span>
            <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>203</span>
            <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>0</span>
            <div className="flex justify-end gap-1">
              <button className="btn btn-ghost btn-sm" title="Edit" onClick={() => setEditOpen(true)}><EdIcon name="edit" size={14} /></button>
              <button className="btn btn-ghost btn-sm" title="Archive" onClick={() => window.alert("Coming soon")}><EdIcon name="archive" size={14} /></button>
            </div>
          </div>

          <div className="project-row">
            <div>
              <div className="project-row-name">Community Centre</div>
              <div className="project-row-sub">Public facility · Handed over</div>
            </div>
            <span className="category-tag cat-public">Public</span>
            <span className="badge badge-gray" style={{ width: "fit-content" }}>Archived</span>
            <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>78</span>
            <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>0</span>
            <div className="flex justify-end gap-1">
              <button className="btn btn-ghost btn-sm" title="Edit" onClick={() => setEditOpen(true)}><EdIcon name="edit" size={14} /></button>
              <button className="btn btn-ghost btn-sm" title="Restore" onClick={() => window.alert("Coming soon")}><EdIcon name="refresh" size={14} /></button>
            </div>
          </div>

          <div className="project-row">
            <div>
              <div className="project-row-name">Hotel & Serviced Apts</div>
              <div className="project-row-sub">Hospitality · MEP rough-ins</div>
            </div>
            <span className="category-tag cat-hospitality">Hospitality</span>
            <span className="badge badge-green" style={{ width: "fit-content" }}>Active</span>
            <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>67</span>
            <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-red-500)" }}>8</span>
            <div className="flex justify-end gap-1">
              <button className="btn btn-ghost btn-sm" title="Edit" onClick={() => setEditOpen(true)}><EdIcon name="edit" size={14} /></button>
              <button className="btn btn-ghost btn-sm" title="Archive" onClick={() => window.alert("Coming soon")}><EdIcon name="archive" size={14} /></button>
            </div>
          </div>
        </div>

        {/* TAB: Observations */}
        <div className={`tab-panel${isActive("tab-observations") ? " active" : ""}`} id="tab-observations">
          <div className="toolbar">
            <div className="flex items-center gap-3">
              <select className="form-input form-select" style={{ width: "220px", padding: "7px 12px", fontSize: "0.8125rem" }} defaultValue="All Projects" onChange={() => {}}>
                <option>All Projects</option>
                <option>Tower A — Marina Bay</option>
                <option>Mall Block C</option>
                <option>Residences Phase 2</option>
              </select>
              <div className="toolbar-search">
                <span style={{ color: "var(--color-gray-300)" }}>
                  <EdIcon name="search" size={14} />
                </span>
                <input type="text" placeholder="Search observations..." />
              </div>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => window.alert("Coming soon")}>
              <EdIcon name="download" size={14} />
              Export All
            </button>
          </div>

          {/* Summary */}
          <div className="grid-4 mb-6">
            <div className="stat-card stat-card-dark">
              <div className="stat-value">635</div>
              <div className="stat-label">Total Observations</div>
            </div>
            <div className="stat-card stat-card-red">
              <div className="stat-value">28</div>
              <div className="stat-label">Open Queries</div>
            </div>
            <div className="stat-card stat-card-green">
              <div className="stat-value">94%</div>
              <div className="stat-label">Resolution Rate</div>
            </div>
            <div className="stat-card stat-card-amber">
              <div className="stat-value">2.4d</div>
              <div className="stat-label">Avg Response Time</div>
            </div>
          </div>

          <p style={{ fontSize: "0.8125rem", color: "var(--color-gray-400)", textAlign: "center", padding: "var(--space-8)" }}>Select a specific project to view detailed observations and manage site queries.</p>
        </div>

        {/* TAB: Site Reports */}
        <div className={`tab-panel${isActive("tab-reports") ? " active" : ""}`} id="tab-reports">
          <div className="toolbar">
            <div className="flex items-center gap-3">
              <select className="form-input form-select" style={{ width: "220px", padding: "7px 12px", fontSize: "0.8125rem" }} defaultValue="All Projects" onChange={() => {}}>
                <option>All Projects</option>
                <option>Tower A — Marina Bay</option>
                <option>Mall Block C</option>
              </select>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => window.alert("Coming soon")}>
              <EdIcon name="plus" size={14} />
              Generate Report
            </button>
          </div>

          <div className="grid-3">
            <div className="report-card animate-in stagger-1">
              <div className="flex items-center justify-between mb-3">
                <span className="badge badge-dark">Weekly</span>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Jun 20, 2026</span>
              </div>
              <h4 style={{ fontSize: "0.9375rem", fontWeight: 700, marginBottom: "4px" }}>Weekly Site Report #24</h4>
              <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)", marginBottom: "var(--space-3)" }}>Tower A — Structural progress floors 18-22.</p>
              <div style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>12 observations · 3 attachments</div>
            </div>
            <div className="report-card animate-in stagger-2">
              <div className="flex items-center justify-between mb-3">
                <span className="badge badge-amber">Monthly</span>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Jun 1, 2026</span>
              </div>
              <h4 style={{ fontSize: "0.9375rem", fontWeight: 700, marginBottom: "4px" }}>Monthly Progress — June</h4>
              <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)", marginBottom: "var(--space-3)" }}>All projects combined progress summary.</p>
              <div style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>48 observations · PDF export</div>
            </div>
            <div className="report-card animate-in stagger-3">
              <div className="flex items-center justify-between mb-3">
                <span className="badge badge-red">Incident</span>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Jun 15, 2026</span>
              </div>
              <h4 style={{ fontSize: "0.9375rem", fontWeight: 700, marginBottom: "4px" }}>Safety Incident — Floor 19</h4>
              <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)", marginBottom: "var(--space-3)" }}>Scaffolding report with corrective actions.</p>
              <div style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>6 observations · 5 photos</div>
            </div>
          </div>
        </div>

        {/* TAB: Categories */}
        <div className={`tab-panel${isActive("tab-categories") ? " active" : ""}`} id="tab-categories">
          <div className="toolbar">
            <p style={{ fontSize: "0.875rem", color: "var(--color-gray-500)" }}>Define project categories for organization and filtering.</p>
            <button className="btn btn-primary btn-sm" onClick={() => window.alert("Coming soon")}>
              <EdIcon name="plus" size={14} />
              Add Category
            </button>
          </div>
          <div className="grid-3">
            <div className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="category-tag cat-residential">Residential</span>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>2 projects</span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Apartments, villas, townhouses.</p>
            </div>
            <div className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="category-tag cat-commercial">Commercial</span>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>1 project</span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Office towers, business parks.</p>
            </div>
            <div className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="category-tag cat-retail">Retail</span>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>1 project</span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Shopping malls, retail podiums.</p>
            </div>
            <div className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="category-tag cat-hospitality">Hospitality</span>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>1 project</span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Hotels, serviced apartments.</p>
            </div>
            <div className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="category-tag cat-public">Public</span>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>1 project</span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Community centres, civic buildings.</p>
            </div>
          </div>
        </div>
      </EdifiShell>

      {/* Add Project Modal */}
      {addOpen && (
        <div className="modal-overlay" id="addProjectModal" style={{ display: "flex" }}>
          <div className="modal-content modal-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Add New Project</h2>
              <button onClick={() => setAddOpen(false)} style={{ padding: "8px", color: "var(--color-gray-400)" }}>
                <EdIcon name="x" size={18} />
              </button>
            </div>
            <div className="grid-2" style={{ gap: "var(--space-5)" }}>
              <div className="form-group">
                <label className="form-label">Project Name</label>
                <input type="text" className="form-input" placeholder="e.g. Tower B — Marina Bay" />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-input form-select" defaultValue="Residential" onChange={() => {}}>
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Retail</option>
                  <option>Hospitality</option>
                  <option>Public</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Location / Zone</label>
                <input type="text" className="form-input" placeholder="e.g. Marina Bay District" />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-input form-select" defaultValue="Active" onChange={() => {}}>
                  <option>Active</option>
                  <option>On Hold</option>
                  <option>Archived</option>
                </select>
              </div>
              <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                <label className="form-label">Description</label>
                <textarea className="form-input form-textarea" placeholder="Brief project description..." rows={3} />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button className="btn btn-secondary" onClick={() => setAddOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setAddOpen(false)}>Create Project</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {editOpen && (
        <div className="modal-overlay" id="editProjectModal" style={{ display: "flex" }}>
          <div className="modal-content modal-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Edit Project</h2>
              <button onClick={() => setEditOpen(false)} style={{ padding: "8px", color: "var(--color-gray-400)" }}>
                <EdIcon name="x" size={18} />
              </button>
            </div>
            <div className="grid-2" style={{ gap: "var(--space-5)" }}>
              <div className="form-group">
                <label className="form-label">Project Name</label>
                <input type="text" className="form-input" defaultValue="Tower A — Marina Bay" />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-input form-select" defaultValue="Residential" onChange={() => {}}>
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Retail</option>
                  <option>Hospitality</option>
                  <option>Public</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Location / Zone</label>
                <input type="text" className="form-input" defaultValue="Marina Bay District" />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select className="form-input form-select" defaultValue="Active" onChange={() => {}}>
                  <option>Active</option>
                  <option>On Hold</option>
                  <option>Archived</option>
                </select>
              </div>
              <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                <label className="form-label">Description</label>
                <textarea className="form-input form-textarea" rows={3} defaultValue="42-storey mixed-use tower. Structural and MEP works in progress. Floors 7-24 active." />
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button className="btn btn-danger btn-sm" onClick={() => window.alert("Coming soon")}>
                <EdIcon name="trash" size={14} />
                Delete Project
              </button>
              <div className="flex gap-3">
                <button className="btn btn-secondary" onClick={() => setEditOpen(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={() => setEditOpen(false)}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
