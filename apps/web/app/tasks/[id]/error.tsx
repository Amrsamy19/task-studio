"use client";

import Link from "next/link";

export default function TaskError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: 16,
        padding: 40,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "var(--status-blocked-bg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="var(--status-blocked-text)" strokeWidth="1.5">
          <circle cx="11" cy="11" r="9" />
          <line x1="11" y1="7" x2="11" y2="12" />
          <circle cx="11" cy="15.5" r="0.75" fill="currentColor" />
        </svg>
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontWeight: 600, marginBottom: 6 }}>Failed to load task</p>
        <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>{error.message}</p>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <Link
          href="/tasks"
          style={{
            padding: "7px 16px",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            fontSize: 13,
            color: "var(--text-secondary)",
            textDecoration: "none",
          }}
        >
          Back to tasks
        </Link>
        <button
          onClick={reset}
          style={{
            padding: "7px 16px",
            background: "var(--accent)",
            color: "#fff",
            border: "none",
            borderRadius: "var(--radius-md)",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 500,
            fontFamily: "inherit",
          }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
