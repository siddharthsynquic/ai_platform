import { useMemo, useState } from "react";
import { EdIcon } from "@/shared/icons/edifice-icons";
import type { Observation } from "./mock-data";

interface Props {
  entries: Observation[];
  onClickEntry?: (entry: Observation) => void;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function MonthlyCalendar({ entries, onClickEntry }: Props) {
  const monthsWithData = useMemo(() => {
    const map: Record<string, Observation[]> = {};
    entries.forEach((e) => {
      const d = e.dateRaised || e.createdAt?.split("T")[0];
      if (!d) return;
      const key = d.substring(0, 7);
      if (!map[key]) map[key] = [];
      map[key].push(e);
    });
    return map;
  }, [entries]);

  const allMonthKeys = useMemo(
    () => Object.keys(monthsWithData).sort().reverse(),
    [monthsWithData],
  );

  const [pageOffset, setPageOffset] = useState(0);
  const MONTHS_PER_PAGE = 6;
  const visibleMonths = allMonthKeys.slice(pageOffset, pageOffset + MONTHS_PER_PAGE);
  const hasPrev = pageOffset > 0;
  const hasNext = pageOffset + MONTHS_PER_PAGE < allMonthKeys.length;

  const monthLabel = (key: string) => {
    const [y, m] = key.split("-");
    return `${MONTHS[parseInt(m) - 1]} ${y}`;
  };

  const getThumb = (entry: Observation) =>
    entry.images?.before?.[0] || entry.images?.after?.[0] || null;

  if (allMonthKeys.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 0", color: "var(--color-gray-300)" }}>
        <p style={{ fontSize: "0.875rem" }}>No dated entries to display.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p style={{ fontSize: "0.75rem", color: "var(--color-gray-400)", fontWeight: 500 }}>
          Showing {visibleMonths.length} of {allMonthKeys.length} months
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPageOffset(Math.max(0, pageOffset - MONTHS_PER_PAGE))}
            disabled={!hasPrev}
            style={{
              padding: 6,
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-gray-200)",
              opacity: hasPrev ? 1 : 0.2,
              cursor: hasPrev ? "pointer" : "not-allowed",
            }}
          >
            <EdIcon name="chevronLeft" size={14} />
          </button>
          <button
            onClick={() => setPageOffset(pageOffset + MONTHS_PER_PAGE)}
            disabled={!hasNext}
            style={{
              padding: 6,
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-gray-200)",
              opacity: hasNext ? 1 : 0.2,
              cursor: hasNext ? "pointer" : "not-allowed",
            }}
          >
            <EdIcon name="chevronRight" size={14} />
          </button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {visibleMonths.map((monthKey) => {
          const items = monthsWithData[monthKey] || [];
          const openCount = items.filter((i) => i.status === "open").length;
          const resolvedCount = items.filter((i) => i.status === "resolved").length;
          const thumbItems = items.slice(0, 8);

          return (
            <div
              key={monthKey}
              style={{
                borderRadius: "var(--radius-2xl)",
                border: "1px solid var(--color-gray-100)",
                background: "white",
                overflow: "hidden",
              }}
            >
              <div
                className="flex items-center justify-between"
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid var(--color-gray-50)",
                }}
              >
                <div>
                  <p style={{ fontSize: "0.875rem", fontWeight: 700 }}>{monthLabel(monthKey)}</p>
                  <p style={{ fontSize: "0.625rem", color: "var(--color-gray-400)", marginTop: 2 }}>
                    {items.length} entries
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {resolvedCount > 0 && (
                    <span
                      className="badge badge-green"
                      style={{ fontSize: "0.625rem" }}
                    >
                      {resolvedCount} ✓
                    </span>
                  )}
                  {openCount > 0 && (
                    <span
                      className="badge badge-amber"
                      style={{ fontSize: "0.625rem" }}
                    >
                      {openCount} open
                    </span>
                  )}
                </div>
              </div>

              <div style={{ padding: 12 }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 6,
                  }}
                >
                  {thumbItems.map((item, i) => {
                    const thumb = getThumb(item);
                    return (
                      <div
                        key={item.id || i}
                        onClick={() => onClickEntry?.(item)}
                        title={item.description?.substring(0, 100)}
                        style={{
                          aspectRatio: "1 / 1",
                          borderRadius: "var(--radius-lg)",
                          overflow: "hidden",
                          cursor: "pointer",
                          position: "relative",
                          background: "var(--color-gray-50)",
                        }}
                      >
                        {thumb ? (
                          <img
                            src={thumb}
                            alt=""
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <div
                            className="flex items-center justify-center"
                            style={{ width: "100%", height: "100%" }}
                          >
                            <EdIcon name="image" size={12} style={{ color: "var(--color-gray-200)" }} />
                          </div>
                        )}
                        <div
                          style={{
                            position: "absolute",
                            top: 4,
                            right: 4,
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background:
                              item.status === "resolved"
                                ? "var(--color-green-400)"
                                : "var(--color-amber-400)",
                          }}
                        />
                      </div>
                    );
                  })}
                </div>

                {items.length > 8 && (
                  <p
                    style={{
                      fontSize: "0.625rem",
                      color: "var(--color-gray-300)",
                      textAlign: "center",
                      marginTop: 8,
                    }}
                  >
                    +{items.length - 8} more
                  </p>
                )}

                <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 4 }}>
                  {items.slice(0, 3).map((item, i) => (
                    <div
                      key={item.id || i}
                      onClick={() => onClickEntry?.(item)}
                      className="flex items-center gap-2"
                      style={{
                        fontSize: "0.6875rem",
                        color: "var(--color-gray-500)",
                        cursor: "pointer",
                        padding: "2px 0",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          flexShrink: 0,
                          background:
                            item.status === "resolved"
                              ? "var(--color-green-400)"
                              : "var(--color-amber-400)",
                        }}
                      />
                      <span
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.description?.substring(0, 60) || item.category || "No description"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
