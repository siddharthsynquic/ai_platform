import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { EdIcon } from "@/shared/icons/edifice-icons";

export function ValAdminDrawingsPage() {
  return (
    <EdifiShell system="validation" activeNav="drawings" section="admin">
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1>Drawing Database</h1>
            <p>Manage indexed drawings across all three stages — upload, ingest, and pipeline control.</p>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-secondary"><EdIcon name="upload" size={14} /> Batch Upload</button>
            <button className="btn btn-primary"><EdIcon name="plus" size={14} /> Add Drawing</button>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="tab-group">
          <button className="tab-item active">All (247)</button>
          <button className="tab-item">SD (82)</button>
          <button className="tab-item">DD (93)</button>
          <button className="tab-item">GFC (72)</button>
        </div>
        <div className="flex gap-2">
          <input type="text" className="form-input" placeholder="Search drawings..." style={{ width: "240px", fontSize: "0.8125rem" }} />
          <select className="form-input form-select" style={{ width: "auto", fontSize: "0.8125rem", paddingRight: "30px" }}>
            <option>All Types</option>
            <option>Floor Plan</option>
            <option>Section</option>
            <option>Elevation</option>
            <option>Detail Sheet</option>
          </select>
        </div>
      </div>

      {/* Drawing Table */}
      <div className="card" style={{ overflowX: "auto" }}>
        <table className="data-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Drawing Name</th>
              <th>Type</th>
              <th>Stage</th>
              <th>Project</th>
              <th>Index Status</th>
              <th>Validation</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="checkbox" /></td>
              <td><strong style={{ fontSize: "0.8125rem" }}>DWG-FP-003</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Floor Plan — Level 3</span></td>
              <td style={{ fontSize: "0.75rem" }}>Floor Plan</td>
              <td><span className="badge badge-amber">DD</span></td>
              <td style={{ fontSize: "0.75rem" }}>Tower A</td>
              <td><span className="badge badge-green" style={{ fontSize: "0.5625rem" }}>Indexed</span></td>
              <td><span className="badge badge-red" style={{ fontSize: "0.5625rem" }}>3 Errors</span></td>
              <td style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Jun 24</td>
              <td>
                <div className="flex gap-1">
                  <button className="btn btn-ghost btn-sm" title="View"><EdIcon name="eye" size={14} /></button>
                  <button className="btn btn-ghost btn-sm" title="Edit"><EdIcon name="edit" size={14} /></button>
                  <button className="btn btn-ghost btn-sm" title="Delete" style={{ color: "var(--color-red-400)" }}><EdIcon name="trash" size={14} /></button>
                </div>
              </td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td><strong style={{ fontSize: "0.8125rem" }}>DWG-ST-012</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Staircase Detail — Core B</span></td>
              <td style={{ fontSize: "0.75rem" }}>Detail Sheet</td>
              <td><span className="badge badge-green">GFC</span></td>
              <td style={{ fontSize: "0.75rem" }}>Tower A</td>
              <td><span className="badge badge-green" style={{ fontSize: "0.5625rem" }}>Indexed</span></td>
              <td><span className="badge badge-green" style={{ fontSize: "0.5625rem" }}>Passed</span></td>
              <td style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Jun 24</td>
              <td>
                <div className="flex gap-1">
                  <button className="btn btn-ghost btn-sm"><EdIcon name="eye" size={14} /></button>
                  <button className="btn btn-ghost btn-sm"><EdIcon name="edit" size={14} /></button>
                  <button className="btn btn-ghost btn-sm" style={{ color: "var(--color-red-400)" }}><EdIcon name="trash" size={14} /></button>
                </div>
              </td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td><strong style={{ fontSize: "0.8125rem" }}>DWG-MEP-B1</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>MEP Layout — Basement 1</span></td>
              <td style={{ fontSize: "0.75rem" }}>MEP Layout</td>
              <td><span className="badge badge-purple">SD</span></td>
              <td style={{ fontSize: "0.75rem" }}>Tower A</td>
              <td><span className="badge badge-amber" style={{ fontSize: "0.5625rem" }}>Indexing...</span></td>
              <td><span className="badge badge-gray" style={{ fontSize: "0.5625rem" }}>Pending</span></td>
              <td style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Jun 23</td>
              <td>
                <div className="flex gap-1">
                  <button className="btn btn-ghost btn-sm"><EdIcon name="eye" size={14} /></button>
                  <button className="btn btn-ghost btn-sm"><EdIcon name="edit" size={14} /></button>
                  <button className="btn btn-ghost btn-sm" style={{ color: "var(--color-red-400)" }}><EdIcon name="trash" size={14} /></button>
                </div>
              </td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td><strong style={{ fontSize: "0.8125rem" }}>DWG-EL-N01</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Elevation — North Facade</span></td>
              <td style={{ fontSize: "0.75rem" }}>Elevation</td>
              <td><span className="badge badge-amber">DD</span></td>
              <td style={{ fontSize: "0.75rem" }}>Tower A</td>
              <td><span className="badge badge-green" style={{ fontSize: "0.5625rem" }}>Indexed</span></td>
              <td><span className="badge badge-red" style={{ fontSize: "0.5625rem" }}>5 Errors</span></td>
              <td style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Jun 23</td>
              <td>
                <div className="flex gap-1">
                  <button className="btn btn-ghost btn-sm"><EdIcon name="eye" size={14} /></button>
                  <button className="btn btn-ghost btn-sm"><EdIcon name="edit" size={14} /></button>
                  <button className="btn btn-ghost btn-sm" style={{ color: "var(--color-red-400)" }}><EdIcon name="trash" size={14} /></button>
                </div>
              </td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td><strong style={{ fontSize: "0.8125rem" }}>DWG-SEC-L01</strong><br /><span style={{ fontSize: "0.6875rem", color: "var(--color-gray-400)" }}>Section — Through Lobby</span></td>
              <td style={{ fontSize: "0.75rem" }}>Section</td>
              <td><span className="badge badge-green">GFC</span></td>
              <td style={{ fontSize: "0.75rem" }}>Tower B</td>
              <td><span className="badge badge-green" style={{ fontSize: "0.5625rem" }}>Indexed</span></td>
              <td><span className="badge badge-green" style={{ fontSize: "0.5625rem" }}>Passed</span></td>
              <td style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>Jun 22</td>
              <td>
                <div className="flex gap-1">
                  <button className="btn btn-ghost btn-sm"><EdIcon name="eye" size={14} /></button>
                  <button className="btn btn-ghost btn-sm"><EdIcon name="edit" size={14} /></button>
                  <button className="btn btn-ghost btn-sm" style={{ color: "var(--color-red-400)" }}><EdIcon name="trash" size={14} /></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4" style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>
        <span>Showing 5 of 247 drawings</span>
        <div className="flex gap-2">
          <button className="btn btn-secondary btn-sm">Bulk Index</button>
          <button className="btn btn-secondary btn-sm" disabled>Previous</button>
          <button className="btn btn-secondary btn-sm">Next</button>
        </div>
      </div>
    </EdifiShell>
  );
}
