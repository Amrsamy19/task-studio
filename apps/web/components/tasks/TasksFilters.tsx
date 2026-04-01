"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { User, TaskFilters, Status, Priority } from "@/types";

export function TasksFilters({
  users,
  filters,
}: {
  users: User[];
  filters: TaskFilters;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const showClosed = filters.archived === true;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "8px 20px",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg)",
        flexWrap: "wrap",
        flexShrink: 0,
      }}
    >
      {/* Group: Status */}
      <FilterChip
        icon={<GroupIcon />}
        label="Group: Status"
        active={false}
      />

      <Divider />

      {/* Filters */}
      <FilterDropdown
        icon={<FilterIcon />}
        label="Filters"
        value={filters.status || filters.priority ? "active" : undefined}
      >
        <optgroup label="Status">
          <option value="">All statuses</option>
          <option value="BACKLOG">Backlog</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="BLOCKED">Blocked</option>
          <option value="DONE">Done</option>
        </optgroup>
      </FilterDropdown>

      {/* Assignees */}
      <FilterDropdown
        icon={<AssigneeIcon />}
        label="Assignees"
        value={filters.assigneeId}
        onChange={(v) => updateFilter("assigneeId", v || undefined)}
      >
        <option value="">All assignees</option>
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </FilterDropdown>

      {/* Show Closed */}
      <FilterChip
        icon={<ClosedIcon />}
        label="Show Closed"
        active={showClosed}
        onClick={() =>
          updateFilter("archived", showClosed ? undefined : "true")
        }
      />

      {/* Right: search + sort */}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
        {/* Sort */}
        <select
          value={`${filters.sortBy ?? "createdAt"}:${filters.sortOrder ?? "desc"}`}
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split(":");
            const params = new URLSearchParams(searchParams.toString());
            params.set("sortBy", sortBy);
            params.set("sortOrder", sortOrder);
            router.push(`${pathname}?${params.toString()}`);
          }}
          style={{
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            padding: "4px 8px",
            fontSize: 12,
            color: "var(--text-secondary)",
            background: "var(--bg)",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          <option value="createdAt:desc">Newest first</option>
          <option value="createdAt:asc">Oldest first</option>
          <option value="dueDate:asc">Due date ↑</option>
          <option value="dueDate:desc">Due date ↓</option>
          <option value="priority:desc">Priority ↓</option>
          <option value="title:asc">Title A-Z</option>
        </select>

        {/* Search */}
        <div style={{ position: "relative" }}>
          <svg
            style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
            width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5"
          >
            <circle cx="5" cy="5" r="3.5"/><line x1="8" y1="8" x2="11" y2="11"/>
          </svg>
          <input
            type="search"
            placeholder="Search Tasks"
            defaultValue={filters.search}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateFilter("search", (e.target as HTMLInputElement).value || undefined);
              }
            }}
            style={{
              paddingLeft: 26,
              paddingRight: 10,
              paddingTop: 5,
              paddingBottom: 5,
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              fontSize: 12,
              color: "var(--text-primary)",
              background: "var(--bg)",
              fontFamily: "inherit",
              width: 160,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Divider() {
  return <div style={{ width: 1, height: 16, background: "var(--border)" }} />;
}

function FilterChip({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "4px 10px",
        border: active ? "1px solid var(--accent)" : "1px solid var(--border)",
        borderRadius: "var(--radius-md)",
        background: active ? "var(--accent-light)" : "var(--bg)",
        color: active ? "var(--accent)" : "var(--text-secondary)",
        fontSize: 12,
        fontWeight: 500,
        cursor: "pointer",
        fontFamily: "inherit",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

function FilterDropdown({
  icon,
  label,
  value,
  onChange,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onChange?: (v: string) => void;
  children: React.ReactNode;
}) {
  const active = Boolean(value && value !== "");
  return (
    <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      <span style={{ position: "absolute", left: 8, pointerEvents: "none", color: active ? "var(--accent)" : "var(--text-secondary)", display: "flex" }}>
        {icon}
      </span>
      <select
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        style={{
          paddingLeft: 26,
          paddingRight: 10,
          paddingTop: 4,
          paddingBottom: 4,
          border: active ? "1px solid var(--accent)" : "1px solid var(--border)",
          borderRadius: "var(--radius-md)",
          background: active ? "var(--accent-light)" : "var(--bg)",
          color: active ? "var(--accent)" : "var(--text-secondary)",
          fontSize: 12,
          fontWeight: 500,
          cursor: "pointer",
          fontFamily: "inherit",
          appearance: "none",
        }}
      >
        <option value="">{label}</option>
        {children}
      </select>
    </div>
  );
}

function GroupIcon() { return <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="2" width="11" height="2.5" rx="0.5"/><rect x="1" y="5.5" width="7" height="2.5" rx="0.5"/><rect x="1" y="9" width="9" height="2.5" rx="0.5"/></svg>; }
function FilterIcon() { return <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="1" y1="3" x2="12" y2="3"/><line x1="2.5" y1="6.5" x2="10.5" y2="6.5"/><line x1="4.5" y1="10" x2="8.5" y2="10"/></svg>; }
function AssigneeIcon() { return <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="6.5" cy="4.5" r="2.5"/><path d="M1 12c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/></svg>; }
function ClosedIcon() { return <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="2,6.5 5,9.5 11,3.5"/></svg>; }
