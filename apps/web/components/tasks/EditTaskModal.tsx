"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { updateTaskAction } from "@/lib/actions";
import { TaskDetail, User } from "@/types";
import { formatDateInput } from "@/lib/utils";

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
      }}
    >
      {pending ? "Saving…" : "Save Changes"}
    </button>
  );
}

export function EditTaskModal({
  task,
  users,
}: {
  task: TaskDetail;
  users: User[];
}) {
  const router = useRouter();
  const boundAction = updateTaskAction.bind(null, task.id);
  const [state, dispatch] = useFormState(boundAction, null);

  useEffect(() => {
    if (state?.success) router.push(`/tasks/${task.id}`);
  }, [state, router, task.id]);

  function close() {
    router.push(`/tasks/${task.id}`);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
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
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-modal-title"
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
          <h2 id="edit-modal-title" style={{ fontSize: 15, fontWeight: 600 }}>
            Edit Task
          </h2>
          <button
            onClick={close}
            aria-label="Close"
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-tertiary)", display: "flex", padding: 4 }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="3" x2="13" y2="13" /><line x1="13" y1="3" x2="3" y2="13" />
            </svg>
          </button>
        </div>

        <form action={dispatch} style={{ padding: "20px" }}>
          {state?.success === false && state.errors?._form && (
            <div style={{ background: "var(--status-blocked-bg)", border: "1px solid var(--status-blocked-dot)", borderRadius: "var(--radius-md)", padding: "10px 12px", fontSize: 13, color: "var(--status-blocked-text)", marginBottom: 16 }}>
              {state.errors._form[0]}
            </div>
          )}

          <Field label="Title" error={state?.success === false ? state.errors?.title?.[0] : undefined} required>
            <input name="title" type="text" defaultValue={task.title} style={inputStyle} />
          </Field>

          <Field label="Description">
            <textarea name="description" rows={3} defaultValue={task.description ?? ""} style={{ ...inputStyle, resize: "none", lineHeight: 1.6 }} />
          </Field>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Status">
              <div style={{ position: "relative" }}>
                <select name="status" defaultValue={task.status} style={{ ...inputStyle, appearance: "none" }}>
                  <option value="BACKLOG">Backlog</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="BLOCKED">Blocked</option>
                  <option value="DONE">Done</option>
                </select>
                <Chevron />
              </div>
            </Field>
            <Field label="Priority">
              <div style={{ position: "relative" }}>
                <select name="priority" defaultValue={task.priority} style={{ ...inputStyle, appearance: "none" }}>
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="URGENT">Urgent</option>
                </select>
                <Chevron />
              </div>
            </Field>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Assignees">
              <div style={{ ...inputStyle, height: "90px", overflowY: "auto", padding: "6px 12px" }}>
                {users.map((u) => (
                  <label key={u.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0", cursor: "pointer", fontSize: 13, color: "var(--text-primary)" }}>
                    <input type="checkbox" name="assigneeIds" value={u.id} defaultChecked={(task.assignees || []).some(a => a.id === u.id)} style={{ cursor: "pointer" }} />
                    {u.name}
                  </label>
                ))}
              </div>
            </Field>
            <Field label="Due Date" error={state?.success === false ? state.errors?.dueDate?.[0] : undefined}>
              <input name="dueDate" type="date" defaultValue={formatDateInput(task.dueDate)} style={{ ...inputStyle, colorScheme: "light" }} />
            </Field>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 8, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
            <button type="button" onClick={close} style={{ padding: "8px 16px", background: "transparent", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", fontSize: 13, color: "var(--text-secondary)", cursor: "pointer", fontFamily: "inherit", fontWeight: 500 }}>
              Cancel
            </button>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children, error, required }: { label: string; children: React.ReactNode; error?: string; required?: boolean }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 6 }}>
        {label}{required && <span style={{ color: "var(--status-blocked-dot)", marginLeft: 2 }}>*</span>}
      </label>
      {children}
      {error && <p style={{ fontSize: 11, color: "var(--status-blocked-text)", marginTop: 4 }}>{error}</p>}
    </div>
  );
}

function Chevron() {
  return (
    <svg style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5">
      <polyline points="2,4 6,8 10,4" />
    </svg>
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
