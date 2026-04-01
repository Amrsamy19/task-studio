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
        minHeight: "calc(100vh - 120px)",
        gap: 24,
        padding: 40,
        background: "#ffffff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            background: "#fee2e2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#dc2626" strokeWidth="2.2">
            <circle cx="11" cy="11" r="9"/>
            <line x1="11" y1="7" x2="11" y2="12"/>
            <circle cx="11" cy="15" r="0.5" fill="currentColor"/>
          </svg>
        </div>
        <h1 style={{ fontWeight: 600, fontSize: 22, color: "#111827", margin: 0 }}>
          Failed to load tasks
        </h1>
      </div>

      <p style={{ fontSize: 14, color: "#6b7280", textAlign: "center", maxWidth: 450, lineHeight: 1.6, margin: "-8px 0 8px" }}>
        {error.message || "An unexpected error occurred while fetching the tasks. This is often temporary—please try again."}
      </p>

      <button
        onClick={() => {
          reset();
          router.refresh();
        }}
        style={{
          padding: "10px 24px",
          background: "#7c3aed",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: 14,
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
