"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TasksError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

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
        background: "var(--bg)",
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
        <p style={{ fontWeight: 600, textAlign: "center", marginBottom: 6, fontSize: 16, color: "var(--text-primary)" }}>
          Failed to load tasks
        </p>
        <p style={{ fontSize: 13, color: "var(--text-secondary)", textAlign: "center", maxWidth: 400, lineHeight: 1.5 }}>
          {error.message || "An unexpected error occurred while fetching the tasks."}
        </p>
      </div>
      <button
        onClick={() => {
          reset();
          router.refresh();
        }}
        style={{
          marginTop: 8,
          padding: "8px 20px",
          background: "var(--accent)",
          color: "#fff",
          border: "none",
          borderRadius: "var(--radius-md)",
          cursor: "pointer",
          fontSize: 13,
          fontWeight: 500,
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        Try again
      </button>
    </div>
  );
}
