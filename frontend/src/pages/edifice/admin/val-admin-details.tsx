import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { EdIcon } from "@/shared/icons/edifice-icons";

export function ValAdminDetailsPage() {
  return (
    <EdifiShell system="validation" activeNav="details" section="admin">
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1>Standard Details Library</h1>
            <p>Manage versioned standard detail PDFs — upload, organize, and control visibility.</p>
          </div>
          <button className="btn btn-primary"><EdIcon name="plus" size={14} /> Add Detail</button>
        </div>
      </div>

      <div className="card" style={{ overflowX: "auto" }}>
        <table className="data-table">
          <thead>
            <tr><th>Detail ID</th><th>Title</th><th>Category</th><th>Applicable Stages</th><th>Version</th><th>References</th><th>Actions</th></tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ fontSize: "0.8125rem", fontWeight: "700" }}>SD-STAIR-004</td>
              <td style={{ fontSize: "0.8125rem" }}>Standard Handrail Detail — Height, Fixing, Return</td>
              <td style={{ fontSize: "0.75rem" }}>Staircase</td>
              <td><span className="badge badge-amber" style={{ fontSize: "0.5625rem" }}>DD</span> <span className="badge badge-green" style={{ fontSize: "0.5625rem" }}>GFC</span></td>
              <td style={{ fontSize: "0.75rem" }}>v2.1</td>
              <td style={{ fontSize: "0.75rem", fontWeight: "600" }}>12</td>
              <td><div className="flex gap-1"><button className="btn btn-ghost btn-sm"><EdIcon name="eye" size={14} /></button><button className="btn btn-ghost btn-sm"><EdIcon name="edit" size={14} /></button><button className="btn btn-ghost btn-sm"><EdIcon name="upload" size={14} /></button></div></td>
            </tr>
            <tr>
              <td style={{ fontSize: "0.8125rem", fontWeight: "700" }}>SD-WP-012</td>
              <td style={{ fontSize: "0.8125rem" }}>Waterproofing Membrane — Parapet Junction</td>
              <td style={{ fontSize: "0.75rem" }}>Waterproofing</td>
              <td><span className="badge badge-amber" style={{ fontSize: "0.5625rem" }}>DD</span> <span className="badge badge-green" style={{ fontSize: "0.5625rem" }}>GFC</span></td>
              <td style={{ fontSize: "0.75rem" }}>v1.3</td>
              <td style={{ fontSize: "0.75rem", fontWeight: "600" }}>8</td>
              <td><div className="flex gap-1"><button className="btn btn-ghost btn-sm"><EdIcon name="eye" size={14} /></button><button className="btn btn-ghost btn-sm"><EdIcon name="edit" size={14} /></button><button className="btn btn-ghost btn-sm"><EdIcon name="upload" size={14} /></button></div></td>
            </tr>
            <tr>
              <td style={{ fontSize: "0.8125rem", fontWeight: "700" }}>SD-STAIR-007</td>
              <td style={{ fontSize: "0.8125rem" }}>Rebar Detail for Staircase Landings</td>
              <td style={{ fontSize: "0.75rem" }}>Staircase</td>
              <td><span className="badge badge-green" style={{ fontSize: "0.5625rem" }}>GFC</span></td>
              <td style={{ fontSize: "0.75rem" }}>v3.0</td>
              <td style={{ fontSize: "0.75rem", fontWeight: "600" }}>15</td>
              <td><div className="flex gap-1"><button className="btn btn-ghost btn-sm"><EdIcon name="eye" size={14} /></button><button className="btn btn-ghost btn-sm"><EdIcon name="edit" size={14} /></button><button className="btn btn-ghost btn-sm"><EdIcon name="upload" size={14} /></button></div></td>
            </tr>
            <tr>
              <td style={{ fontSize: "0.8125rem", fontWeight: "700" }}>SD-FAC-003</td>
              <td style={{ fontSize: "0.8125rem" }}>Curtain Wall Mullion Junction — Typical Section</td>
              <td style={{ fontSize: "0.75rem" }}>Facade</td>
              <td><span className="badge badge-purple" style={{ fontSize: "0.5625rem" }}>SD</span> <span className="badge badge-amber" style={{ fontSize: "0.5625rem" }}>DD</span> <span className="badge badge-green" style={{ fontSize: "0.5625rem" }}>GFC</span></td>
              <td style={{ fontSize: "0.75rem" }}>v1.0</td>
              <td style={{ fontSize: "0.75rem", fontWeight: "600" }}>6</td>
              <td><div className="flex gap-1"><button className="btn btn-ghost btn-sm"><EdIcon name="eye" size={14} /></button><button className="btn btn-ghost btn-sm"><EdIcon name="edit" size={14} /></button><button className="btn btn-ghost btn-sm"><EdIcon name="upload" size={14} /></button></div></td>
            </tr>
            <tr>
              <td style={{ fontSize: "0.8125rem", fontWeight: "700" }}>SD-STR-001</td>
              <td style={{ fontSize: "0.8125rem" }}>Expansion Joint Detail — Floor to Column</td>
              <td style={{ fontSize: "0.75rem" }}>Structural</td>
              <td><span className="badge badge-amber" style={{ fontSize: "0.5625rem" }}>DD</span> <span className="badge badge-green" style={{ fontSize: "0.5625rem" }}>GFC</span></td>
              <td style={{ fontSize: "0.75rem" }}>v2.0</td>
              <td style={{ fontSize: "0.75rem", fontWeight: "600" }}>4</td>
              <td><div className="flex gap-1"><button className="btn btn-ghost btn-sm"><EdIcon name="eye" size={14} /></button><button className="btn btn-ghost btn-sm"><EdIcon name="edit" size={14} /></button><button className="btn btn-ghost btn-sm"><EdIcon name="upload" size={14} /></button></div></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4" style={{ fontSize: "0.75rem", color: "var(--color-gray-400)" }}>
        <span>Showing 5 of 34 standard details</span>
        <div className="flex gap-2"><button className="btn btn-secondary btn-sm">Bulk Index to AI</button></div>
      </div>
    </EdifiShell>
  );
}
