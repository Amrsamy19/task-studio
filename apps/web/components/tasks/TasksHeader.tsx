"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { TaskFilters } from "@/types";

const TABS = [
  { label: "List", icon: ListIcon },
  { label: "Board", icon: BoardIcon },
  { label: "Calendar", icon: CalIcon },
  { label: "Timeline", icon: TimelineIcon },
  { label: "Activity", icon: ActivityIcon },
];

export function TasksHeader({
  total,
  filters,
}: {
  total: number;
  meta: { total: number; page: number; totalPages: number };
  filters: TaskFilters;
}) {
  const searchParams = useSearchParams();

  function newTaskHref() {
    const p = new URLSearchParams(searchParams.toString());
    p.set("newTask", "1");
    return `/tasks?${p}`;
  }

  return (
    <div
      style={{
        borderBottom: "1px solid var(--border)",
        background: "var(--bg)",
        flexShrink: 0,
      }}
    >
      {/* Title row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px 12px",
        }}
      >
        <h1 style={{ fontSize: 20, fontWeight: 600, color: "var(--text-primary)" }}>
          Sprint Board
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link
            href={newTaskHref()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "7px 14px",
              background: "var(--accent)",
              color: "#fff",
              borderRadius: "var(--radius-md)",
              fontSize: 13,
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="6.5" y1="1.5" x2="6.5" y2="11.5"/>
              <line x1="1.5" y1="6.5" x2="11.5" y2="6.5"/>
            </svg>
            New Task
          </Link>
          <button
            style={{
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "7px 8px",
              cursor: "pointer",
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="7.5" cy="3" r="1"/><circle cx="7.5" cy="7.5" r="1"/><circle cx="7.5" cy="12" r="1"/>
            </svg>
          </button>
        </div>
      </div>

      {/* View tabs */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          padding: "0 20px",
          borderTop: "1px solid var(--border-light)",
        }}
      >
        {TABS.map(({ label, icon: Icon }, i) => (
          <button
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 12px",
              background: "none",
              border: "none",
              borderBottom: i === 0 ? "2px solid var(--accent)" : "2px solid transparent",
              cursor: "pointer",
              color: i === 0 ? "var(--accent)" : "var(--text-secondary)",
              fontSize: 13,
              fontWeight: i === 0 ? 500 : 400,
              fontFamily: "inherit",
            }}
          >
            <Icon />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Tab icons
function ListIcon() {
  return <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="1" y1="3.5" x2="12" y2="3.5"/><line x1="1" y1="6.5" x2="12" y2="6.5"/><line x1="1" y1="9.5" x2="12" y2="9.5"/></svg>;
}
function BoardIcon() {
  return <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="1" width="4" height="11" rx="1"/><rect x="7" y="1" width="5" height="7" rx="1"/></svg>;
}
function CalIcon() {
  return <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="2" width="11" height="10" rx="1.5"/><line x1="1" y1="5.5" x2="12" y2="5.5"/><line x1="4" y1="1" x2="4" y2="3.5"/><line x1="9" y1="1" x2="9" y2="3.5"/></svg>;
}
function TimelineIcon() {
  return <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="1" y1="4" x2="12" y2="4"/><rect x="2" y="2.5" width="5" height="3" rx="1"/><line x1="1" y1="9" x2="12" y2="9"/><rect x="5" y="7.5" width="6" height="3" rx="1"/></svg>;
}
function ActivityIcon() {
  return <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="1,8 3.5,4 6,7 8.5,3 12,6"/></svg>;
}
