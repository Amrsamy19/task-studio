"use client";

import Link from "next/link";
import { useTransition } from "react";
import { TaskDetail as TaskDetailType, User } from "@/types";
import { StatusBadge, PriorityFlag, Avatar } from "@/components/ui";
import { CommentForm } from "@/components/tasks/CommentForm";
import { archiveTaskAction } from "@/lib/actions";
import { formatFull, formatRelative } from "@/lib/utils";

export function TaskDetail({
  task,
  users,
}: {
  task: TaskDetailType;
  users: User[];
}) {
  const [isPending, startTransition] = useTransition();

  function handleArchive() {
    if (!confirm("Archive this task?")) return;
    startTransition(() => archiveTaskAction(task.id));
  }

  // Mix comments + system events into one sorted timeline
  const activityItems = [
    {
      type: "system" as const,
      id: "created",
      date: task.createdAt,
      text: `Task created`,
    },
    ...task.comments.map((c) => ({
      type: "comment" as const,
      id: c.id,
      date: c.createdAt,
      text: c.message,
    })),
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 280px",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* ── Left: main content ── */}
      <div style={{ overflow: "auto", padding: "24px 32px" }}>
        {/* Breadcrumb */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            color: "var(--text-tertiary)",
            marginBottom: 20,
          }}
        >
          <Link href="/tasks" style={{ color: "var(--text-tertiary)", textDecoration: "none" }}>
            Projects
          </Link>
          <span>/</span>
          <Link href="/tasks" style={{ color: "var(--text-tertiary)", textDecoration: "none" }}>
            Sprint Board
          </Link>
          <span>/</span>
          <span style={{ color: "var(--text-primary)" }}>
            TASK-{task.id.slice(-3).toUpperCase()}
          </span>
        </div>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              color: "var(--text-tertiary)",
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 4,
                background: "var(--accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              B
            </div>
            TASK-{task.id.slice(-3).toUpperCase()}
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <Link
              href={`/tasks/${task.id}/edit`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "5px 12px",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                fontSize: 12,
                color: "var(--text-secondary)",
                textDecoration: "none",
                background: "var(--bg)",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 1l2 2-7 7H2V8l7-7z"/>
              </svg>
              Edit
            </Link>
            <button
              onClick={handleArchive}
              disabled={isPending || task.archived}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "5px 12px",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                fontSize: 12,
                color: task.archived ? "var(--text-tertiary)" : "var(--text-secondary)",
                cursor: task.archived ? "default" : "pointer",
                background: "var(--bg)",
                fontFamily: "inherit",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="1" y="3.5" width="10" height="7" rx="1"/>
                <path d="M1 3.5l1-2h8l1 2"/>
                <line x1="4.5" y1="6.5" x2="7.5" y2="6.5"/>
              </svg>
              {task.archived ? "Archived" : "Archive"}
            </button>
          </div>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: 22, fontWeight: 600, color: "var(--text-primary)", marginBottom: 12, lineHeight: 1.3 }}>
          {task.title}
        </h1>

        {/* Inline badges */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          <StatusBadge status={task.status} />
          <PriorityFlag priority={task.priority} />
          {task.dueDate && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontSize: 12,
                color: "var(--status-blocked-text)",
                background: "var(--status-blocked-bg)",
                padding: "3px 8px",
                borderRadius: 100,
              }}
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="1" y="1.5" width="9" height="8.5" rx="1.5"/>
                <line x1="1" y1="4.5" x2="10" y2="4.5"/>
                <line x1="3.5" y1="0.5" x2="3.5" y2="2.5"/>
                <line x1="7.5" y1="0.5" x2="7.5" y2="2.5"/>
              </svg>
              Due {formatFull(task.dueDate)}
            </span>
          )}
        </div>

        {/* Description */}
        {task.description && (
          <section style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 10 }}>
              Description
            </h2>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
              {task.description}
            </p>
          </section>
        )}

        {/* Activity */}
        <section>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <h2 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: 8 }}>
              Activity
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 500,
                  background: "var(--bg-tertiary)",
                  color: "var(--text-tertiary)",
                  padding: "1px 6px",
                  borderRadius: 100,
                }}
              >
                {activityItems.length}
              </span>
            </h2>
            <div style={{ display: "flex", gap: 4 }}>
              {["All", "Comments", "History"].map((tab, i) => (
                <button
                  key={tab}
                  style={{
                    padding: "3px 10px",
                    border: "1px solid var(--border)",
                    borderRadius: 100,
                    fontSize: 12,
                    background: i === 0 ? "var(--bg-tertiary)" : "transparent",
                    color: i === 0 ? "var(--text-primary)" : "var(--text-secondary)",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontWeight: i === 0 ? 500 : 400,
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {activityItems.map((item, i) => (
              <ActivityItem
                key={item.id}
                item={item}
                isLast={i === activityItems.length - 1}
                assigneeName={(task.assignees || [])[0]?.name}
              />
            ))}
          </div>

          {/* Comment form */}
          <div style={{ marginTop: 20 }}>
            <CommentForm taskId={task.id} />
          </div>
        </section>
      </div>

      {/* ── Right: details sidebar ── */}
      <aside
        style={{
          background: "var(--bg)",
          borderLeft: "1px solid var(--border)",
          overflow: "auto",
          padding: "24px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <h3 style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>
          Details
        </h3>

        <MetaRow label="Status">
          <StatusBadge status={task.status} />
        </MetaRow>

        <MetaRow label="Priority">
          <PriorityFlag priority={task.priority} />
        </MetaRow>

        <MetaRow label="Assignees">
          {(task.assignees || []).length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {(task.assignees || []).map((a) => (
                <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Avatar name={a.name} size={22} />
                  <span style={{ fontSize: 13, color: "var(--text-primary)" }}>
                    {a.name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <span style={{ fontSize: 13, color: "var(--text-tertiary)" }}>Unassigned</span>
          )}
        </MetaRow>

        {task.dueDate && (
          <MetaRow label="Due Date">
            <span style={{ fontSize: 13, color: "var(--text-primary)" }}>
              {formatFull(task.dueDate)}
            </span>
          </MetaRow>
        )}

        <MetaRow label="Start Date">
          <span style={{ fontSize: 13, color: "var(--text-tertiary)" }}>—</span>
        </MetaRow>

        <div style={{ height: 1, background: "var(--border)" }} />

        <MetaRow label="Created">
          <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            {formatFull(task.createdAt)}
          </span>
        </MetaRow>

        <MetaRow label="Updated">
          <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            {formatRelative(task.updatedAt)}
          </span>
        </MetaRow>
      </aside>
    </div>
  );
}

function MetaRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 500,
          color: "var(--text-tertiary)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

function ActivityItem({
  item,
  isLast,
  assigneeName,
}: {
  item: { type: "comment" | "system"; id: string; date: string; text: string };
  isLast: boolean;
  assigneeName?: string;
}) {
  const isSystem = item.type === "system";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "32px 1fr",
        gap: 12,
        paddingBottom: isLast ? 0 : 16,
      }}
    >
      {/* Avatar / system icon */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {isSystem ? (
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "var(--bg-tertiary)",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5">
              <circle cx="6" cy="6" r="4.5"/>
              <path d="M6 3.5V6l2 1.5"/>
            </svg>
          </div>
        ) : (
          <Avatar name={assigneeName ?? "User"} size={28} />
        )}
        {!isLast && (
          <div style={{ width: 1, flex: 1, background: "var(--border)", marginTop: 4 }} />
        )}
      </div>

      {/* Content */}
      <div>
        {isSystem ? (
          <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
            {item.text}
            <span style={{ color: "var(--text-tertiary)", marginLeft: 6, fontSize: 12 }}>
              {formatRelative(item.date)}
            </span>
          </p>
        ) : (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>
                {assigneeName ?? "User"}
              </span>
              <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>
                {formatRelative(item.date)}
              </span>
            </div>
            <div
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                padding: "10px 14px",
                fontSize: 13,
                color: "var(--text-primary)",
                lineHeight: 1.6,
              }}
            >
              {item.text}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
