"use client";

import Link from "next/link";
import { Task, Status, TaskFilters } from "@/types";
import { StatusBadge, PriorityFlag, Avatar, EmptyState } from "@/components/ui";
import { formatDueDate } from "@/lib/utils";

const STATUS_LABELS: Record<Status, string> = {
  IN_PROGRESS: "In Progress",
  BLOCKED: "Blocked",
  BACKLOG: "Backlog",
  DONE: "Done",
};

export function TasksTable({
  grouped,
  statusGroups,
  filters,
}: {
  grouped: Record<Status, Task[]>;
  statusGroups: Status[];
  filters: TaskFilters;
}) {
  if (statusGroups.length === 0) {
    return (
      <EmptyState
        title="No tasks found"
        description={
          filters.search || filters.status || filters.priority
            ? "Try adjusting your filters to see more tasks."
            : "Create your first task to get started."
        }
      />
    );
  }

  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        fontSize: 13,
      }}
    >
      {/* Columns */}
      <colgroup>
        <col style={{ width: 28 }} />
        <col />
        <col style={{ width: 100 }} />
        <col style={{ width: 100 }} />
        <col style={{ width: 60 }} />
        <col style={{ width: 70 }} />
        <col style={{ width: 70 }} />
        <col style={{ width: 90 }} />
        <col style={{ width: 32 }} />
      </colgroup>

      {statusGroups.map((status) => {
        const tasks = grouped[status] ?? [];
        return (
          <TableGroup
            key={status}
            status={status}
            tasks={tasks}
          />
        );
      })}
    </table>
  );
}

function TableGroup({ status, tasks }: { status: Status; tasks: Task[] }) {
  const statusColors: Record<Status, string> = {
    IN_PROGRESS: "var(--status-inprogress-dot)",
    BLOCKED: "var(--status-blocked-dot)",
    BACKLOG: "var(--status-backlog-dot)",
    DONE: "var(--status-done-dot)",
  };

  return (
    <>
      {/* Group header */}
      <thead>
        <tr>
          <td colSpan={9} style={{ padding: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 20px",
                background: "var(--bg-secondary)",
                borderBottom: "1px solid var(--border-light)",
                borderTop: "1px solid var(--border-light)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <StatusBadge status={status} />
                <span style={{ fontSize: 12, color: "var(--text-tertiary)", fontWeight: 500 }}>
                  {tasks.length}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <IconButton title="Add task">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="6.5" y1="1.5" x2="6.5" y2="11.5"/>
                    <line x1="1.5" y1="6.5" x2="11.5" y2="6.5"/>
                  </svg>
                </IconButton>
                <IconButton title="More">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="2.5" cy="6.5" r="1" fill="currentColor"/>
                    <circle cx="6.5" cy="6.5" r="1" fill="currentColor"/>
                    <circle cx="10.5" cy="6.5" r="1" fill="currentColor"/>
                  </svg>
                </IconButton>
              </div>
            </div>
          </td>
        </tr>

        {/* Column headers */}
        <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
          <th style={thStyle}></th>
          <th style={{ ...thStyle, textAlign: "left" }}>Name</th>
          <th style={thStyle}>Assignee</th>
          <th style={thStyle}>Priority</th>
          <th style={thStyle}>Start</th>
          <th style={thStyle}>Due</th>
          <th style={thStyle}>Category</th>
          <th style={thStyle}></th>
        </tr>
      </thead>

      <tbody>
        {tasks.length === 0 ? (
          <tr>
            <td
              colSpan={9}
              style={{ padding: "20px", textAlign: "center", color: "var(--text-tertiary)", fontSize: 12 }}
            >
              No {STATUS_LABELS[status].toLowerCase()} tasks
            </td>
          </tr>
        ) : (
          tasks.map((task) => <TaskRow key={task.id} task={task} />)
        )}
      </tbody>
    </>
  );
}

function TaskRow({ task }: { task: Task }) {
  const due = formatDueDate(task.dueDate);

  return (
    <tr
      style={{ borderBottom: "1px solid var(--border-light)", cursor: "pointer" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = "var(--bg-secondary)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = "";
      }}
    >
      {/* Checkbox */}
      <td style={{ padding: "0 0 0 20px", width: 28 }}>
        <input
          type="checkbox"
          style={{ accentColor: "var(--accent)", cursor: "pointer" }}
          onClick={(e) => e.stopPropagation()}
        />
      </td>

      {/* Name */}
      <td style={{ padding: "12px 16px 12px 8px" }}>
        <Link
          href={`/tasks/${task.id}`}
          style={{ textDecoration: "none" }}
        >
          <div style={{ fontWeight: 500, color: "var(--text-primary)", fontSize: 13, marginBottom: 2 }}>
            {task.title}
          </div>
          <div style={{ fontSize: 11, color: "var(--text-tertiary)", fontFamily: "monospace" }}>
            TASK-{task.id.slice(-3).toUpperCase()}
          </div>
        </Link>
      </td>

      {/* Assignee */}
      <td style={{ padding: "12px 8px", textAlign: "center" }}>
        {(task.assignees || []).length > 0 ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "-6px" }}>
            {(task.assignees || []).map(a => <Avatar key={a.id} name={a.name} size={24} />)}
          </div>
        ) : (
          <div style={{ color: "var(--text-muted)", fontSize: 12 }}>—</div>
        )}
      </td>

      {/* Priority */}
      <td style={{ padding: "12px 8px" }}>
        <PriorityFlag priority={task.priority} />
      </td>

      {/* Start */}
      <td style={{ padding: "12px 8px", color: "var(--text-tertiary)", fontSize: 12, textAlign: "center" }}>
        —
      </td>

      {/* Due */}
      <td style={{ padding: "12px 8px", textAlign: "center" }}>
        <span style={{ fontSize: 12, color: due.color, fontWeight: due.color === "var(--status-blocked-text)" ? 500 : 400 }}>
          {due.label}
        </span>
      </td>

      {/* Category */}
      <td style={{ padding: "12px 8px" }}>
        {task.archived && (
          <span style={{
            display: "inline-flex",
            padding: "2px 6px",
            borderRadius: 4,
            fontSize: 11,
            fontWeight: 600,
            background: "var(--bg-tertiary)",
            color: "var(--text-secondary)",
          }}>
            Archived
          </span>
        )}
      </td>

      {/* More */}
      <td style={{ padding: "12px 12px 12px 4px" }}>
        <IconButton title="More options">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="6.5" cy="2.5" r="1" fill="currentColor"/>
            <circle cx="6.5" cy="6.5" r="1" fill="currentColor"/>
            <circle cx="6.5" cy="10.5" r="1" fill="currentColor"/>
          </svg>
        </IconButton>
      </td>
    </tr>
  );
}

function IconButton({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <button
      title={title}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "var(--text-tertiary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        borderRadius: "var(--radius-sm)",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-secondary)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--text-tertiary)")}
    >
      {children}
    </button>
  );
}

const thStyle: React.CSSProperties = {
  padding: "6px 8px",
  fontSize: 11,
  fontWeight: 500,
  color: "var(--text-tertiary)",
  textAlign: "center",
  background: "var(--bg)",
  whiteSpace: "nowrap",
};
