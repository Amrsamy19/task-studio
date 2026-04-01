"use client";

export default function TasksError({
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
          <circle cx="11" cy="11" r="9"/>
          <line x1="11" y1="7" x2="11" y2="12"/>
          <circle cx="11" cy="15" r="0.5" fill="currentColor"/>
        </svg>
      </div>
      <div>
        <p style={{ fontWeight: 500, textAlign: "center", marginBottom: 4 }}>
          Failed to load tasks
        </p>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", textAlign: "center" }}>
          {error.message}
        </p>
      </div>
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
        }}
      >
        Try again
      </button>
    </div>
  );
}
