import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { EdIcon } from "@/shared/icons/edifice-icons";
import { useState } from "react";

type TabId = "tab-projects" | "tab-drawings" | "tab-reports" | "tab-categories";

export function ValAdminProjectsMgmtPage() {
  const [activeTab, setActiveTab] = useState<TabId>("tab-projects");
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [showEditProjectModal, setShowEditProjectModal] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  const switchTab = (tabId: TabId) => setActiveTab(tabId);

  return (
    <>
      <style>{`
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
    }
    .page-tab:hover { color: var(--color-black); }
    .page-tab.active { color: var(--color-black); border-bottom-color: var(--color-black); }
    .tab-panel { display: none; }
    .tab-panel.active { display: block; }
    .project-row {
      display: grid;
      grid-template-columns: 1fr 120px 100px 100px 80px;
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
    .drawing-row {
      display: grid;
      grid-template-columns: 40px 1fr 100px 100px 80px 60px;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid var(--color-gray-50);
      gap: var(--space-3);
      font-size: 0.8125rem;
    }
    .drawing-thumb {
      width: 36px; height: 36px;
      background: var(--color-gray-100);
      border-radius: var(--radius-md);
      display: flex; align-items: center; justify-content: center;
      color: var(--color-gray-400);
    }
    .report-card {
      border: 1px solid var(--color-gray-100);
      border-radius: var(--radius-xl);
      padding: var(--space-4);
      transition: all 0.2s;
      cursor: pointer;
    }
    .report-card:hover { border-color: var(--color-gray-300); box-shadow: var(--shadow-sm); }
      `}</style>
      <EdifiShell system="validation" activeNav="dashboard" section="admin">
        <div className="page-header">
          <h1>Project Management</h1>
          <p>Add, modify, categorize, and manage all projects and their resources.</p>
        </div>

        {/* Page Tabs */}
        <div className="page-tabs">
          <button className={`page-tab${activeTab === "tab-projects" ? " active" : ""}`} onClick={() => switchTab("tab-projects")}>All Projects</button>
          <button className={`page-tab${activeTab === "tab-drawings" ? " active" : ""}`} onClick={() => switchTab("tab-drawings")}>Drawings</button>
          <button className={`page-tab${activeTab === "tab-reports" ? " active" : ""}`} onClick={() => switchTab("tab-reports")}>Site Reports</button>
          <button className={`page-tab${activeTab === "tab-categories" ? " active" : ""}`} onClick={() => switchTab("tab-categories")}>Categories</button>
        </div>

        {/* TAB: All Projects */}
        <div className={`tab-panel${activeTab === "tab-projects" ? " active" : ""}`} id="tab-projects">
          <div className="toolbar">
            <div className="toolbar-search">
              <EdIcon name="search" size={14} />
              <input type="text" placeholder="Search projects..." />
            </div>
            <div className="flex items-center gap-2">
              <button className="btn btn-secondary btn-sm" onClick={() => window.alert("Import — Coming soon")}>
                <EdIcon name="upload" size={14} />
                Import
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => setShowAddProjectModal(true)}>
                <EdIcon name="plus" size={14} />
                New Project
              </button>
            </div>
          </div>

          {/* Column Headers */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 100px 100px 80px", padding: "8px 0", borderBottom: "1px solid var(--color-gray-100)", gap: "var(--space-4)" }}>
            <span className="label">Project</span>
            <span className="label">Category</span>
            <span className="label">Status</span>
            <span className="label">Drawings</span>
            <span className="label text-right">Actions</span>
          </div>

          {/* Project Rows */}
          <div className="project-row">
            <div>
              <div className="project-row-name">Tower A — Marina Bay</div>
              <div className="project-row-sub">Mixed-use · 42 floors · GFC Stage</div>
            </div>
            <span className="category-tag cat-residential">Residential</span>
            <span className="badge badge-green" style={{ width: "fit-content" }}>Active</span>
            <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>247</span>
            <div className="flex justify-end gap-1">
              <button className="btn btn-ghost btn-sm" onClick={() => setShowEditProjectModal(true)} title="Edit"><EdIcon name="edit" size={14} /></button>
              <button className="btn btn-ghost btn-sm" title="Archive" onClick={() => window.alert("Archive — Coming soon")}><EdIcon name="archive" size={14} /></button>
            </div>
          </div>

          <div className="project-row">
            <div>
              <div className="project-row-name">Mall Block C</div>
              <div className="project-row-sub">Retail podium · DD Stage</div>
            </div>
            <span className="category-tag cat-retail">Retail</span>
            <span className="badge badge-green" style={{ width: "fit-content" }}>Active</span>
            <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>124</span>
            <div className="flex justify-end gap-1">
              <button className="btn btn-ghost btn-sm" title="Edit" onClick={() => setShowEditProjectModal(true)}><EdIcon name="edit" size={14} /></button>
              <button className="btn btn-ghost btn-sm" title="Archive" onClick={() => window.alert("Archive — Coming soon")}><EdIcon name="archive" size={14} /></button>
            </div>
          </div>

          <div className="project-row">
            <div>
              <div className="project-row-name">Residences Phase 2</div>
              <div className="project-row-sub">Luxury villas · 6 typologies · SD Stage</div>
            </div>
            <span className="category-tag cat-residential">Residential</span>
            <span className="badge badge-blue" style={{ width: "fit-content" }}>In Review</span>
            <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>86</span>
            <div className="flex justify-end gap-1">
              <button className="btn btn-ghost btn-sm" title="Edit" onClick={() => setShowEditProjectModal(true)}><EdIcon name="edit" size={14} /></button>
              <button className="btn btn-ghost btn-sm" title="Archive" onClick={() => window.alert("Archive — Coming soon")}><EdIcon name="archive" size={14} /></button>
            </div>
          </div>

          <div className="project-row">
            <div>
              <div className="project-row-name">Office Tower East</div>
              <div className="project-row-sub">Commercial · 28 floors · GFC Stage</div>
            </div>
            <span className="category-tag cat-commercial">Commercial</span>
            <span className="badge badge-green" style={{ width: "fit-content" }}>Active</span>
            <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>312</span>
            <div className="flex justify-end gap-1">
              <button className="btn btn-ghost btn-sm" title="Edit" onClick={() => setShowEditProjectModal(true)}><EdIcon name="edit" size={14} /></button>
              <button className="btn btn-ghost btn-sm" title="Archive" onClick={() => window.alert("Archive — Coming soon")}><EdIcon name="archive" size={14} /></button>
            </div>
          </div>

          <div className="project-row">
            <div>
              <div className="project-row-name">Community Centre</div>
              <div className="project-row-sub">Public facility · Completed</div>
            </div>
            <span className="category-tag cat-public">Public</span>
            <span className="badge badge-gray" style={{ width: "fit-content" }}>Archived</span>
            <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>64</span>
            <div className="flex justify-end gap-1">
              <button className="btn btn-ghost btn-sm" title="Edit" onClick={() => setShowEditProjectModal(true)}><EdIcon name="edit" size={14} /></button>
              <button className="btn btn-ghost btn-sm" title="Restore" onClick={() => window.alert("Restore — Coming soon")}><EdIcon name="refresh" size={14} /></button>
            </div>
          </div>

          <div className="project-row">
            <div>
              <div className="project-row-name">Hotel & Serviced Apts</div>
              <div className="project-row-sub">Hospitality · DD Stage</div>
            </div>
            <span className="category-tag cat-hospitality">Hospitality</span>
            <span className="badge badge-blue" style={{ width: "fit-content" }}>In Review</span>
            <span style={{ fontSize: "0.875rem", fontWeight: 600 }}>156</span>
            <div className="flex justify-end gap-1">
              <button className="btn btn-ghost btn-sm" title="Edit" onClick={() => setShowEditProjectModal(true)}><EdIcon name="edit" size={14} /></button>
              <button className="btn btn-ghost btn-sm" title="Archive" onClick={() => window.alert("Archive — Coming soon")}><EdIcon name="archive" size={14} /></button>
            </div>
          </div>
        </div>

        {/* TAB: Drawings */}
        <div className={`tab-panel${activeTab === "tab-drawings" ? " active" : ""}`} id="tab-drawings">
          <div className="toolbar">
            <div className="flex items-center gap-3">
              <select className="form-input form-select" style={{ width: "220px", padding: "7px 12px", fontSize: "0.8125rem" }}>
                <option>Tower A — Marina Bay</option>
                <option>Mall Block C</option>
                <option>Residences Phase 2</option>
                <option>Office Tower East</option>
              </select>
              <div className="toolbar-search">
                <EdIcon name="search" size={14} />
                <input type="text" placeholder="Search drawings..." />
              </div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => window.alert("Upload — Coming soon")}>
              <EdIcon name="upload" size={14} />
              Upload Drawings
            </button>
          </div>

          {/* Summary Stats */}
          <div className="grid-4 mb-6">
            <div className="stat-card stat-card-dark">
              <div className="stat-value">247</div>
              <div className="stat-label">Total Drawings</div>
            </div>
            <div className="stat-card stat-card-green">
              <div className="stat-value">189</div>
              <div className="stat-label">Validated</div>
            </div>
            <div className="stat-card stat-card-amber">
              <div className="stat-value">42</div>
              <div className="stat-label">Flagged</div>
            </div>
            <div className="stat-card stat-card-blue">
              <div className="stat-value">16</div>
              <div className="stat-label">Pending</div>
            </div>
          </div>

          {/* Drawing Headers */}
          <div style={{ display: "grid", gridTemplateColumns: "40px 1fr 100px 100px 80px 60px", padding: "8px 0", borderBottom: "1px solid var(--color-gray-100)", gap: "var(--space-3)" }}>
            <span></span>
            <span className="label">Drawing</span>
            <span className="label">Stage</span>
            <span className="label">Status</span>
            <span className="label">Discipline</span>
            <span className="label text-right">View</span>
          </div>

          {/* Drawing Rows */}
          <div className="drawing-row">
            <div className="drawing-thumb"><EdIcon name="fileText" size={14} /></div>
            <div>
              <div style={{ fontWeight: 600 }}>A-101 Ground Floor Plan</div>
              <div style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Rev 04 · Updated 2 days ago</div>
            </div>
            <span className="badge badge-green" style={{ width: "fit-content" }}>GFC</span>
            <span className="badge badge-green" style={{ width: "fit-content" }}>Validated</span>
            <span style={{ fontSize: "0.75rem", color: "var(--color-gray-500)" }}>ARCH</span>
            <div className="text-right"><button className="btn btn-ghost btn-sm"><EdIcon name="eye" size={14} /></button></div>
          </div>

          <div className="drawing-row">
            <div className="drawing-thumb"><EdIcon name="fileText" size={14} /></div>
            <div>
              <div style={{ fontWeight: 600 }}>A-201 Building Section A-A</div>
              <div style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Rev 03 · Updated 5 days ago</div>
            </div>
            <span className="badge badge-green" style={{ width: "fit-content" }}>GFC</span>
            <span className="badge badge-amber" style={{ width: "fit-content" }}>Flagged</span>
            <span style={{ fontSize: "0.75rem", color: "var(--color-gray-500)" }}>ARCH</span>
            <div className="text-right"><button className="btn btn-ghost btn-sm"><EdIcon name="eye" size={14} /></button></div>
          </div>

          <div className="drawing-row">
            <div className="drawing-thumb"><EdIcon name="fileText" size={14} /></div>
            <div>
              <div style={{ fontWeight: 600 }}>S-301 Foundation Plan</div>
              <div style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Rev 02 · Updated 1 week ago</div>
            </div>
            <span className="badge badge-amber" style={{ width: "fit-content" }}>DD</span>
            <span className="badge badge-green" style={{ width: "fit-content" }}>Validated</span>
            <span style={{ fontSize: "0.75rem", color: "var(--color-gray-500)" }}>STR</span>
            <div className="text-right"><button className="btn btn-ghost btn-sm"><EdIcon name="eye" size={14} /></button></div>
          </div>

          <div className="drawing-row">
            <div className="drawing-thumb"><EdIcon name="fileText" size={14} /></div>
            <div>
              <div style={{ fontWeight: 600 }}>M-401 HVAC Layout Floor 7</div>
              <div style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Rev 01 · Uploaded today</div>
            </div>
            <span className="badge badge-blue" style={{ width: "fit-content" }}>SD</span>
            <span className="badge badge-red" style={{ width: "fit-content" }}>Critical</span>
            <span style={{ fontSize: "0.75rem", color: "var(--color-gray-500)" }}>MEP</span>
            <div className="text-right"><button className="btn btn-ghost btn-sm"><EdIcon name="eye" size={14} /></button></div>
          </div>

          <div className="drawing-row">
            <div className="drawing-thumb"><EdIcon name="fileText" size={14} /></div>
            <div>
              <div style={{ fontWeight: 600 }}>E-501 Electrical SLD</div>
              <div style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Rev 02 · Updated 3 days ago</div>
            </div>
            <span className="badge badge-green" style={{ width: "fit-content" }}>GFC</span>
            <span className="badge badge-green" style={{ width: "fit-content" }}>Validated</span>
            <span style={{ fontSize: "0.75rem", color: "var(--color-gray-500)" }}>ELEC</span>
            <div className="text-right"><button className="btn btn-ghost btn-sm"><EdIcon name="eye" size={14} /></button></div>
          </div>
        </div>

        {/* TAB: Site Reports */}
        <div className={`tab-panel${activeTab === "tab-reports" ? " active" : ""}`} id="tab-reports">
          <div className="toolbar">
            <div className="flex items-center gap-3">
              <select className="form-input form-select" style={{ width: "220px", padding: "7px 12px", fontSize: "0.8125rem" }}>
                <option>Tower A — Marina Bay</option>
                <option>Mall Block C</option>
                <option>Residences Phase 2</option>
              </select>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => window.alert("Generate Report — Coming soon")}>
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
              <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)", marginBottom: "var(--space-3)" }}>Covers structural progress on floors 18-22. MEP coordination flagged.</p>
              <div className="flex items-center gap-3" style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>
                <span>12 observations</span>
                <span>·</span>
                <span>3 attachments</span>
              </div>
            </div>

            <div className="report-card animate-in stagger-2">
              <div className="flex items-center justify-between mb-3">
                <span className="badge badge-amber">Monthly</span>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Jun 1, 2026</span>
              </div>
              <h4 style={{ fontSize: "0.9375rem", fontWeight: 700, marginBottom: "4px" }}>Monthly Progress Report — June</h4>
              <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)", marginBottom: "var(--space-3)" }}>Full month summary: 94% on-schedule. 3 critical issues resolved.</p>
              <div className="flex items-center gap-3" style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>
                <span>48 observations</span>
                <span>·</span>
                <span>PDF export</span>
              </div>
            </div>

            <div className="report-card animate-in stagger-3">
              <div className="flex items-center justify-between mb-3">
                <span className="badge badge-red">Incident</span>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Jun 15, 2026</span>
              </div>
              <h4 style={{ fontSize: "0.9375rem", fontWeight: 700, marginBottom: "4px" }}>Safety Incident — Floor 19</h4>
              <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)", marginBottom: "var(--space-3)" }}>Scaffolding inspection report following minor incident. Corrective actions documented.</p>
              <div className="flex items-center gap-3" style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>
                <span>6 observations</span>
                <span>·</span>
                <span>5 photos</span>
              </div>
            </div>

            <div className="report-card animate-in stagger-4">
              <div className="flex items-center justify-between mb-3">
                <span className="badge badge-green">Validation</span>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Jun 18, 2026</span>
              </div>
              <h4 style={{ fontSize: "0.9375rem", fontWeight: 700, marginBottom: "4px" }}>GFC Validation Summary</h4>
              <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)", marginBottom: "var(--space-3)" }}>Complete GFC stage validation results for all architectural drawings.</p>
              <div className="flex items-center gap-3" style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>
                <span>247 drawings checked</span>
                <span>·</span>
                <span>PDF</span>
              </div>
            </div>
          </div>
        </div>

        {/* TAB: Categories */}
        <div className={`tab-panel${activeTab === "tab-categories" ? " active" : ""}`} id="tab-categories">
          <div className="toolbar">
            <p style={{ fontSize: "0.875rem", color: "var(--color-gray-500)" }}>Define project categories for organization and filtering.</p>
            <button className="btn btn-primary btn-sm" onClick={() => setShowAddCategoryModal(true)}>
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
              <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Apartments, villas, townhouses, and other residential typologies.</p>
            </div>
            <div className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="category-tag cat-commercial">Commercial</span>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>1 project</span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Office towers, business parks, and corporate headquarters.</p>
            </div>
            <div className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="category-tag cat-retail">Retail</span>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>1 project</span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Shopping malls, retail podiums, and mixed-use commercial.</p>
            </div>
            <div className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="category-tag cat-hospitality">Hospitality</span>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>1 project</span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Hotels, serviced apartments, and resort developments.</p>
            </div>
            <div className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="category-tag cat-public">Public</span>
                <span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>1 project</span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Community centres, civic buildings, and government projects.</p>
            </div>
          </div>
        </div>

        {/* Add Project Modal */}
        {showAddProjectModal && (
          <div className="modal-overlay" id="addProjectModal" style={{ display: "flex" }}>
            <div className="modal-content modal-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Add New Project</h2>
                <button onClick={() => setShowAddProjectModal(false)} style={{ padding: "8px", color: "var(--color-gray-400)" }} aria-label="Close">
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
                  <select className="form-input form-select">
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Retail</option>
                    <option>Hospitality</option>
                    <option>Public</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Current Stage</label>
                  <select className="form-input form-select">
                    <option>SD — Schematic Design</option>
                    <option>DD — Design Development</option>
                    <option>GFC — Good For Construction</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-input form-select">
                    <option>Active</option>
                    <option>In Review</option>
                    <option>On Hold</option>
                    <option>Archived</option>
                  </select>
                </div>
                <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                  <label className="form-label">Description</label>
                  <textarea className="form-input form-textarea" placeholder="Brief project description..." rows={3}></textarea>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button className="btn btn-secondary" onClick={() => setShowAddProjectModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={() => setShowAddProjectModal(false)}>Create Project</button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Project Modal */}
        {showEditProjectModal && (
          <div className="modal-overlay" id="editProjectModal" style={{ display: "flex" }}>
            <div className="modal-content modal-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Edit Project</h2>
                <button onClick={() => setShowEditProjectModal(false)} style={{ padding: "8px", color: "var(--color-gray-400)" }} aria-label="Close">
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
                  <select className="form-input form-select" defaultValue="Residential">
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>Retail</option>
                    <option>Hospitality</option>
                    <option>Public</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Current Stage</label>
                  <select className="form-input form-select" defaultValue="GFC — Good For Construction">
                    <option>SD — Schematic Design</option>
                    <option>DD — Design Development</option>
                    <option>GFC — Good For Construction</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select className="form-input form-select" defaultValue="Active">
                    <option>Active</option>
                    <option>In Review</option>
                    <option>On Hold</option>
                    <option>Archived</option>
                  </select>
                </div>
                <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                  <label className="form-label">Description</label>
                  <textarea className="form-input form-textarea" rows={3} defaultValue="Mixed-use residential tower. 42 floors. GFC stage in progress with active validation cycles."></textarea>
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button className="btn btn-danger btn-sm" onClick={() => window.alert("Delete Project — Coming soon")}>
                  <EdIcon name="trash" size={14} />
                  Delete Project
                </button>
                <div className="flex gap-3">
                  <button className="btn btn-secondary" onClick={() => setShowEditProjectModal(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={() => setShowEditProjectModal(false)}>Save Changes</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Category Modal */}
        {showAddCategoryModal && (
          <div className="modal-overlay" id="addCategoryModal" style={{ display: "flex" }}>
            <div className="modal-content">
              <div className="flex items-center justify-between mb-6">
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>Add Category</h2>
                <button onClick={() => setShowAddCategoryModal(false)} style={{ padding: "8px", color: "var(--color-gray-400)" }} aria-label="Close">
                  <EdIcon name="x" size={18} />
                </button>
              </div>
              <div className="form-group">
                <label className="form-label">Category Name</label>
                <input type="text" className="form-input" placeholder="e.g. Infrastructure" />
              </div>
              <div className="form-group">
                <label className="form-label">Color</label>
                <select className="form-input form-select">
                  <option>Blue</option>
                  <option>Amber</option>
                  <option>Green</option>
                  <option>Purple</option>
                  <option>Red</option>
                  <option>Cyan</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-input form-textarea" placeholder="Brief description..." rows={2}></textarea>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button className="btn btn-secondary" onClick={() => setShowAddCategoryModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={() => setShowAddCategoryModal(false)}>Create Category</button>
              </div>
            </div>
          </div>
        )}
      </EdifiShell>
    </>
  );
}
