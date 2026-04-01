"use client";

import Link from "next/link";

export default function NotFound() {
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
            background: "#f0dcdcff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            stroke="#cf5757ff"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="9" />
            <path d="M7 11h8M11 7v8" transform="rotate(45 11 11)" />
          </svg>
        </div>
        <h1
          style={{ fontWeight: 600, fontSize: 22, color: "#111827", margin: 0 }}
        >
          Page not found
        </h1>
      </div>

      <p
        style={{
          fontSize: 14,
          color: "#6b7280",
          textAlign: "center",
          maxWidth: 400,
          lineHeight: 1.6,
          margin: "-8px 0 8px",
        }}
      >
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        href="/tasks"
        style={{
          padding: "10px 24px",
          background: "#7c3aed",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "8px",
          fontSize: 14,
          fontWeight: 500,
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#6d28d9")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#7c3aed")}
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
