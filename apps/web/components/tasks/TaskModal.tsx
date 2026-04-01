"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createTaskAction } from "@/lib/actions";
import { User } from "@/types";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      style={{
        padding: "8px 20px",
        background: pending ? "var(--accent-light)" : "var(--accent)",
        color: pending ? "var(--accent-text)" : "#fff",
        border: "none",
        borderRadius: "var(--radius-md)",
        fontSize: 13,
        fontWeight: 500,
        cursor: pending ? "not-allowed" : "pointer",
        fontFamily: "inherit",
        transition: "background 0.15s",
      }}
    >
      {pending ? "Creating…" : "Create Task"}
    </button>
  );
}

export function TaskModal({ users }: { users: User[] }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, dispatch] = useFormState(createTaskAction, null);

  // Close on success
  useEffect(() => {
    if (state?.success) {
      router.push("/tasks");
    }
  }, [state, router]);

  function close() {
    router.push("/tasks");
  }

  // Close on backdrop click or Escape
  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) close();
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    /* Backdrop */
    <div
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{
          background: "var(--bg)",
          borderRadius: "var(--radius-xl)",
          width: "100%",
          maxWidth: 480,
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 20px 16px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <h2
            id="modal-title"
            style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}
          >
            Create New Task
          </h2>
          <button
            onClick={close}
            aria-label="Close"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-tertiary)",
              display: "flex",
              alignItems: "center",
              padding: 4,
              borderRadius: "var(--radius-sm)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="3" x2="13" y2="13" />
              <line x1="13" y1="3" x2="3" y2="13" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form ref={formRef} action={dispatch} style={{ padding: "20px" }}>
          {/* Global form error */}
          {state?.success === false && state.errors?._form && (
            <div
              style={{
                background: "var(--status-blocked-bg)",
                border: "1px solid var(--status-blocked-dot)",
                borderRadius: "var(--radius-md)",
                padding: "10px 12px",
                fontSize: 13,
                color: "var(--status-blocked-text)",
                marginBottom: 16,
              }}
            >
              {state.errors._form[0]}
            </div>
          )}

          {/* Title */}
          <FieldGroup label="Title" error={state?.success === false ? state.errors?.title?.[0] : undefined} required>
            <input
              name="title"
              type="text"
              placeholder="Enter task title..."
              autoFocus
              style={inputStyle}
            />
          </FieldGroup>

          {/* Description */}
          <FieldGroup label="Description">
            <textarea
              name="description"
              placeholder="Enter description..."
              rows={3}
              style={{ ...inputStyle, resize: "none", lineHeight: 1.6 }}
            />
          </FieldGroup>

          {/* Status + Priority */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FieldGroup label="Status">
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", width: 8, height: 8, borderRadius: "50%", background: "var(--status-backlog-dot)", pointerEvents: "none" }} />
                <select name="status" defaultValue="BACKLOG" style={{ ...inputStyle, paddingLeft: 26, appearance: "none" }}>
                  <option value="BACKLOG">Backlog</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="BLOCKED">Blocked</option>
                  <option value="DONE">Done</option>
                </select>
                <ChevronDown />
              </div>
            </FieldGroup>

            <FieldGroup label="Priority" error={state?.success === false ? state.errors?.priority?.[0] : undefined}>
              <div style={{ position: "relative" }}>
                <FlagIcon />
                <select name="priority" defaultValue="MEDIUM" style={{ ...inputStyle, paddingLeft: 26, appearance: "none" }}>
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="URGENT">Urgent</option>
                </select>
                <ChevronDown />
              </div>
            </FieldGroup>
          </div>

          {/* Assignee + Category */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FieldGroup label="Assignees">
              <div style={{ ...inputStyle, height: "90px", overflowY: "auto", padding: "6px 12px" }}>
                {users.map((u) => (
                  <label key={u.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", cursor: "pointer", fontSize: 13, color: "var(--text-primary)" }}>
                    <input type="checkbox" name="assigneeIds" value={u.id} style={{ cursor: "pointer" }} />
                    {u.name}
                  </label>
                ))}
              </div>
            </FieldGroup>

            <FieldGroup label="Category">
              <div style={{ position: "relative" }}>
                <select name="category" style={{ ...inputStyle, appearance: "none" }}>
                  <option value="">Select category...</option>
                  <option value="Backend">Backend</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Design">Design</option>
                  <option value="Testing">Testing</option>
                  <option value="DevOps">DevOps</option>
                </select>
                <ChevronDown />
              </div>
            </FieldGroup>
          </div>

          {/* Start Date + Due Date */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FieldGroup label="Start Date">
              <div style={{ position: "relative" }}>
                <CalIcon />
                <input
                  name="startDate"
                  type="date"
                  style={{ ...inputStyle, paddingLeft: 30, colorScheme: "light" }}
                />
              </div>
            </FieldGroup>

            <FieldGroup label="Due Date" error={state?.success === false ? state.errors?.dueDate?.[0] : undefined}>
              <div style={{ position: "relative" }}>
                <CalIcon />
                <input
                  name="dueDate"
                  type="date"
                  style={{ ...inputStyle, paddingLeft: 30, colorScheme: "light" }}
                />
              </div>
            </FieldGroup>
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              marginTop: 8,
              paddingTop: 16,
              borderTop: "1px solid var(--border)",
            }}
          >
            <button
              type="button"
              onClick={close}
              style={{
                padding: "8px 16px",
                background: "transparent",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                fontSize: 13,
                color: "var(--text-secondary)",
                cursor: "pointer",
                fontFamily: "inherit",
                fontWeight: 500,
              }}
            >
              Cancel
            </button>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}

// FieldGroup
function FieldGroup({
  label,
  children,
  error,
  required,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label
        style={{
          display: "block",
          fontSize: 12,
          fontWeight: 500,
          color: "var(--text-secondary)",
          marginBottom: 6,
        }}
      >
        {label}
        {required && <span style={{ color: "var(--status-blocked-dot)", marginLeft: 2 }}>*</span>}
      </label>
      {children}
      {error && (
        <p style={{ fontSize: 11, color: "var(--status-blocked-text)", marginTop: 4 }}>
          {error}
        </p>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-md)",
  padding: "8px 12px",
  fontSize: 13,
  color: "var(--text-primary)",
  background: "var(--bg)",
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.15s",
};

// Inline icon helpers
function ChevronDown() {
  return (
    <svg
      style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
      width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5"
    >
      <polyline points="2,4 6,8 10,4" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg
      style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
      width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="var(--priority-medium)" strokeWidth="1.5"
    >
      <path d="M2 1v10M2 1l7 2-7 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AvatarIcon() {
  return (
    <svg
      style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
      width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5"
    >
      <circle cx="6.5" cy="4.5" r="2.5" />
      <path d="M1 12c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
    </svg>
  );
}

function CalIcon() {
  return (
    <svg
      style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
      width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5"
    >
      <rect x="1" y="2" width="11" height="10" rx="1.5" />
      <line x1="1" y1="5.5" x2="12" y2="5.5" />
      <line x1="4" y1="1" x2="4" y2="3.5" />
      <line x1="9" y1="1" x2="9" y2="3.5" />
    </svg>
  );
}
