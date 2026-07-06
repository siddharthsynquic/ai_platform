import { useState } from "react";
import { EdifiShell } from "@/shared/components/layout/edifice-shell";
import { EdIcon } from "@/shared/icons/edifice-icons";

const CATEGORIES = [
  "All Details",
  "Staircase",
  "Waterproofing",
  "Facade",
  "Structural",
  "MEP",
  "Doors & Windows",
  "Railing",
  "Flooring",
  "Envelope",
];

export function ValReferencesPage() {
  const [activeCategory, setActiveCategory] = useState("All Details");

  return (
    <>
      <style>{`
    .detail-card {
      border: 1px solid var(--color-gray-100);
      border-radius: var(--radius-2xl);
      overflow: hidden;
      transition: all 0.3s var(--ease-out);
      cursor: pointer;
      background: white;
    }
    .detail-card:hover {
      border-color: var(--color-gray-300);
      box-shadow: var(--shadow-xl);
      transform: translateY(-2px);
    }
    .detail-preview {
      background: var(--color-gray-900);
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-gray-500);
      position: relative;
    }
    .detail-preview:hover {
      background: #111;
    }
    .detail-card-body {
      padding: 1.25rem;
    }
    .search-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 20px;
      background: var(--color-gray-50);
      border: 1px solid var(--color-gray-100);
      border-radius: var(--radius-2xl);
      transition: all 0.2s;
    }
    .search-bar:focus-within {
      border-color: var(--color-black);
      background: white;
      box-shadow: 0 0 0 3px rgba(0,0,0,0.05);
    }
    .search-bar input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      font-size: 0.9375rem;
      font-family: inherit;
    }
    .category-pill {
      padding: 8px 16px;
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 600;
      border: 1px solid var(--color-gray-200);
      background: white;
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
    }
    .category-pill:hover, .category-pill.active {
      background: var(--color-black);
      color: white;
      border-color: var(--color-black);
    }
  `}</style>
      <EdifiShell system="validation" activeNav="references" section="user">
        <div className="page-header">
          <div className="flex items-center justify-between">
            <div>
              <h1>Standard Detail References</h1>
              <p>Browse the standard detail PDF library — semantically indexed and linked to validation flags.</p>
            </div>
            <button className="btn btn-secondary btn-sm">
              <EdIcon name="upload" size={14} />
              Upload Detail
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="search-bar mb-6" id="searchBar">
          <span style={{ color: "var(--color-gray-400)" }}><EdIcon name="search" size={18} /></span>
          <input type="text" placeholder="Search by name, element, or content... e.g. 'parapet waterproofing'" />
          <span className="badge badge-gray" style={{ fontSize: "0.625rem" }}>AI Semantic Search</span>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`category-pill ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Detail Grid */}
        <div className="grid-4 mb-8" style={{ gap: "1.25rem" }}>
          {/* Detail 1 */}
          <div className="detail-card">
            <div className="detail-preview">
              <EdIcon name="fileText" size={32} />
              <div style={{ position: "absolute", top: "8px", right: "8px" }}>
                <span className="badge badge-dark" style={{ fontSize: "0.5625rem" }}>v2.1</span>
              </div>
            </div>
            <div className="detail-card-body">
              <h4 style={{ fontSize: "0.8125rem", fontWeight: 700, marginBottom: "4px" }}>SD-STAIR-004</h4>
              <p style={{ fontSize: "0.75rem", color: "var(--color-gray-500)", lineHeight: 1.4 }}>Standard Handrail Detail — Height, Fixing, and Return</p>
              <div className="flex gap-1 mt-3 flex-wrap">
                <span className="badge badge-purple" style={{ fontSize: "0.5625rem" }}>DD</span>
                <span className="badge badge-green" style={{ fontSize: "0.5625rem" }}>GFC</span>
              </div>
              <p style={{ fontSize: "0.625rem", color: "var(--color-gray-300)", marginTop: "8px" }}>Referenced 12 times · Last linked: Jun 24</p>
            </div>
          </div>

          {/* Detail 2 */}
          <div className="detail-card">
            <div className="detail-preview">
              <EdIcon name="fileText" size={32} />
              <div style={{ position: "absolute", top: "8px", right: "8px" }}>
                <span className="badge badge-dark" style={{ fontSize: "0.5625rem" }}>v1.3</span>
              </div>
            </div>
            <div className="detail-card-body">
              <h4 style={{ fontSize: "0.8125rem", fontWeight: 700, marginBottom: "4px" }}>SD-WP-012</h4>
              <p style={{ fontSize: "0.75rem", color: "var(--color-gray-500)", lineHeight: 1.4 }}>Waterproofing Membrane Detail — Parapet Junction</p>
              <div className="flex gap-1 mt-3 flex-wrap">
                <span className="badge badge-amber" style={{ fontSize: "0.5625rem" }}>DD</span>
                <span className="badge badge-green" style={{ fontSize: "0.5625rem" }}>GFC</span>
              </div>
              <p style={{ fontSize: "0.625rem", color: "var(--color-gray-300)", marginTop: "8px" }}>Referenced 8 times · Last linked: Jun 22</p>
            </div>
          </div>

          {/* Detail 3 */}
          <div className="detail-card">
            <div className="detail-preview">
              <EdIcon name="fileText" size={32} />
              <div style={{ position: "absolute", top: "8px", right: "8px" }}>
                <span className="badge badge-dark" style={{ fontSize: "0.5625rem" }}>v3.0</span>
              </div>
            </div>
            <div className="detail-card-body">
              <h4 style={{ fontSize: "0.8125rem", fontWeight: 700, marginBottom: "4px" }}>SD-STAIR-007</h4>
              <p style={{ fontSize: "0.75rem", color: "var(--color-gray-500)", lineHeight: 1.4 }}>Standard Rebar Detail for Staircase Landings</p>
              <div className="flex gap-1 mt-3 flex-wrap">
                <span className="badge badge-green" style={{ fontSize: "0.5625rem" }}>GFC</span>
              </div>
              <p style={{ fontSize: "0.625rem", color: "var(--color-gray-300)", marginTop: "8px" }}>Referenced 15 times · Last linked: Jun 24</p>
            </div>
          </div>

          {/* Detail 4 */}
          <div className="detail-card">
            <div className="detail-preview">
              <EdIcon name="fileText" size={32} />
              <div style={{ position: "absolute", top: "8px", right: "8px" }}>
                <span className="badge badge-dark" style={{ fontSize: "0.5625rem" }}>v1.0</span>
              </div>
            </div>
            <div className="detail-card-body">
              <h4 style={{ fontSize: "0.8125rem", fontWeight: 700, marginBottom: "4px" }}>SD-FAC-003</h4>
              <p style={{ fontSize: "0.75rem", color: "var(--color-gray-500)", lineHeight: 1.4 }}>Curtain Wall Mullion Junction — Typical Section</p>
              <div className="flex gap-1 mt-3 flex-wrap">
                <span className="badge badge-purple" style={{ fontSize: "0.5625rem" }}>SD</span>
                <span className="badge badge-amber" style={{ fontSize: "0.5625rem" }}>DD</span>
                <span className="badge badge-green" style={{ fontSize: "0.5625rem" }}>GFC</span>
              </div>
              <p style={{ fontSize: "0.625rem", color: "var(--color-gray-300)", marginTop: "8px" }}>Referenced 6 times · Last linked: Jun 20</p>
            </div>
          </div>

          {/* Detail 5 */}
          <div className="detail-card">
            <div className="detail-preview">
              <EdIcon name="fileText" size={32} />
              <div style={{ position: "absolute", top: "8px", right: "8px" }}>
                <span className="badge badge-dark" style={{ fontSize: "0.5625rem" }}>v2.0</span>
              </div>
            </div>
            <div className="detail-card-body">
              <h4 style={{ fontSize: "0.8125rem", fontWeight: 700, marginBottom: "4px" }}>SD-STR-001</h4>
              <p style={{ fontSize: "0.75rem", color: "var(--color-gray-500)", lineHeight: 1.4 }}>Expansion Joint Detail — Floor to Column</p>
              <div className="flex gap-1 mt-3 flex-wrap">
                <span className="badge badge-amber" style={{ fontSize: "0.5625rem" }}>DD</span>
                <span className="badge badge-green" style={{ fontSize: "0.5625rem" }}>GFC</span>
              </div>
              <p style={{ fontSize: "0.625rem", color: "var(--color-gray-300)", marginTop: "8px" }}>Referenced 4 times · Last linked: Jun 18</p>
            </div>
          </div>

          {/* Detail 6 */}
          <div className="detail-card">
            <div className="detail-preview">
              <EdIcon name="fileText" size={32} />
              <div style={{ position: "absolute", top: "8px", right: "8px" }}>
                <span className="badge badge-dark" style={{ fontSize: "0.5625rem" }}>v1.2</span>
              </div>
            </div>
            <div className="detail-card-body">
              <h4 style={{ fontSize: "0.8125rem", fontWeight: 700, marginBottom: "4px" }}>SD-DW-008</h4>
              <p style={{ fontSize: "0.75rem", color: "var(--color-gray-500)", lineHeight: 1.4 }}>Door Frame Detail — Hollow Metal Frame in Drywall</p>
              <div className="flex gap-1 mt-3 flex-wrap">
                <span className="badge badge-amber" style={{ fontSize: "0.5625rem" }}>DD</span>
                <span className="badge badge-green" style={{ fontSize: "0.5625rem" }}>GFC</span>
              </div>
              <p style={{ fontSize: "0.625rem", color: "var(--color-gray-300)", marginTop: "8px" }}>Referenced 9 times · Last linked: Jun 21</p>
            </div>
          </div>

          {/* Detail 7 */}
          <div className="detail-card">
            <div className="detail-preview">
              <EdIcon name="fileText" size={32} />
              <div style={{ position: "absolute", top: "8px", right: "8px" }}>
                <span className="badge badge-dark" style={{ fontSize: "0.5625rem" }}>v1.5</span>
              </div>
            </div>
            <div className="detail-card-body">
              <h4 style={{ fontSize: "0.8125rem", fontWeight: 700, marginBottom: "4px" }}>SD-FLR-002</h4>
              <p style={{ fontSize: "0.75rem", color: "var(--color-gray-500)", lineHeight: 1.4 }}>Vitrified Tile Flooring — Typical Section with Skirting</p>
              <div className="flex gap-1 mt-3 flex-wrap">
                <span className="badge badge-green" style={{ fontSize: "0.5625rem" }}>GFC</span>
              </div>
              <p style={{ fontSize: "0.625rem", color: "var(--color-gray-300)", marginTop: "8px" }}>Referenced 3 times · Last linked: Jun 19</p>
            </div>
          </div>

          {/* Detail 8 */}
          <div className="detail-card">
            <div className="detail-preview">
              <EdIcon name="fileText" size={32} />
              <div style={{ position: "absolute", top: "8px", right: "8px" }}>
                <span className="badge badge-dark" style={{ fontSize: "0.5625rem" }}>v2.2</span>
              </div>
            </div>
            <div className="detail-card-body">
              <h4 style={{ fontSize: "0.8125rem", fontWeight: 700, marginBottom: "4px" }}>SD-RAIL-001</h4>
              <p style={{ fontSize: "0.75rem", color: "var(--color-gray-500)", lineHeight: 1.4 }}>Glass Railing — Balcony Fixing Detail with Base Channel</p>
              <div className="flex gap-1 mt-3 flex-wrap">
                <span className="badge badge-amber" style={{ fontSize: "0.5625rem" }}>DD</span>
                <span className="badge badge-green" style={{ fontSize: "0.5625rem" }}>GFC</span>
              </div>
              <p style={{ fontSize: "0.625rem", color: "var(--color-gray-300)", marginTop: "8px" }}>Referenced 7 times · Last linked: Jun 23</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="card card-flat p-5">
          <div className="flex justify-between items-center" style={{ fontSize: "0.8125rem", color: "var(--color-gray-500)" }}>
            <span>Showing 8 of 34 standard details</span>
            <div className="flex gap-6">
              <span>Total References: <strong style={{ color: "var(--color-black)" }}>64</strong></span>
              <span>Last Updated: <strong style={{ color: "var(--color-black)" }}>Jun 24, 2026</strong></span>
              <span>Library Version: <strong style={{ color: "var(--color-black)" }}>2.1</strong></span>
            </div>
          </div>
        </div>
      </EdifiShell>
    </>
  );
}
