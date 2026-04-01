"use client";

import { usePathname } from "next/navigation";

export function Topbar() {
  return (
    <header
      style={{
        height: 48,
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        background: "var(--bg)",
        flexShrink: 0,
      }}
    >
      {/* Breadcrumb */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: 13,
          color: "var(--text-secondary)",
        }}
      >
        <span>Projects</span>
        <span style={{ color: "var(--text-muted)" }}>/</span>
        <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>
          Sprint Board
        </span>
      </div>

      {/* Right controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Search */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "var(--bg-secondary)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            padding: "5px 10px",
            fontSize: 13,
            color: "var(--text-tertiary)",
            width: 200,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="5.5" cy="5.5" r="4"/>
            <line x1="9" y1="9" x2="12" y2="12"/>
          </svg>
          Search tasks...
          <span
            style={{
              marginLeft: "auto",
              fontSize: 11,
              color: "var(--text-muted)",
              background: "var(--bg-tertiary)",
              border: "1px solid var(--border)",
              borderRadius: 4,
              padding: "1px 5px",
              fontFamily: "monospace",
            }}
          >
            ⌘K
          </span>
        </div>

        {/* Bell */}
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-secondary)",
            display: "flex",
            alignItems: "center",
            padding: 4,
            borderRadius: "var(--radius-md)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 1.5a5 5 0 00-5 5v2.5l-1.5 2h13l-1.5-2V6.5a5 5 0 00-5-5z"/>
            <path d="M6.5 13.5a1.5 1.5 0 003 0"/>
          </svg>
        </button>

        {/* Settings */}
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-secondary)",
            display: "flex",
            alignItems: "center",
            padding: 4,
            borderRadius: "var(--radius-md)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="8" cy="8" r="2.5"/>
            <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.22 3.22l1.42 1.42M11.36 11.36l1.42 1.42M3.22 12.78l1.42-1.42M11.36 4.64l1.42-1.42"/>
          </svg>
        </button>

        {/* Avatar */}
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: "var(--accent)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          SC
        </div>
      </div>
    </header>
  );
}
