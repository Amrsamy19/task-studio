"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navGeneral = [
  { label: "Dashboard", href: "/dashboard", icon: DashboardIcon },
  { label: "My Tasks", href: "/my-tasks", icon: TasksIcon },
  { label: "Inbox", href: "/inbox", icon: InboxIcon },
  { label: "Calendar", href: "/calendar", icon: CalendarIcon },
];

const navProjects = [
  { label: "Sprint Board", href: "/tasks", icon: BoardIcon, active: true },
  { label: "Backlog", href: "/tasks?archived=true", icon: BacklogIcon },
  { label: "Roadmap", href: "/roadmap", icon: RoadmapIcon },
  { label: "Releases", href: "/releases", icon: ReleasesIcon },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: "var(--sidebar-width)",
        background: "var(--sidebar-bg)",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Logo / Workspace */}
      <div
        style={{
          padding: "16px 14px",
          borderBottom: "1px solid var(--sidebar-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            E
          </div>
          <div>
            <div style={{ color: "#000", fontWeight: 600, fontSize: 13 }}>
              Eng Tasks
            </div>
            <div style={{ color: "var(--sidebar-section)", fontSize: 11 }}>
              Engineering Team
            </div>
          </div>
        </div>
        <ChevronIcon />
      </div>

      {/* Search */}
      <div style={{ padding: "10px 14px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "var(--sidebar-hover)",
            borderRadius: "var(--radius-md)",
            padding: "6px 10px",
          }}
        >
          <SearchIcon />
          <span style={{ color: "var(--sidebar-section)", fontSize: 13 }}>
            Search...
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflow: "auto", padding: "4px 0" }}>
        <NavSection label="General">
          {navGeneral.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              Icon={item.icon}
              isActive={pathname === item.href}
            />
          ))}
        </NavSection>

        <NavSection
          label="Projects"
          action={
            <button
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--sidebar-section)",
                lineHeight: 1,
                padding: 0,
                fontSize: 16,
              }}
            >
              +
            </button>
          }
        >
          {navProjects.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              Icon={item.icon}
              isActive={item.label === "Sprint Board" ? pathname.startsWith("/tasks") : pathname === item.href}
            />
          ))}
        </NavSection>
      </nav>

      {/* User footer */}
      <div
        style={{
          padding: "12px 14px",
          borderTop: "1px solid var(--sidebar-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Avatar name="Sarah Chen" color="#7c3aed" size={28} />
          <div>
            <div style={{ color: "#000", fontSize: 12, fontWeight: 500 }}>
              Sarah Chen
            </div>
            <div style={{ color: "var(--sidebar-section)", fontSize: 11 }}>
              sarah@eng.co
            </div>
          </div>
        </div>
        <LogoutIcon />
      </div>
    </aside>
  );
}

function NavSection({
  label,
  children,
  action,
}: {
  label: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 14px 4px",
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: "var(--sidebar-section)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {label}
        </span>
        {action}
      </div>
      {children}
    </div>
  );
}

function NavItem({
  href,
  label,
  Icon,
  isActive,
}: {
  href: string;
  label: string;
  Icon: React.FC;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "7px 14px",
        color: isActive ? "var(--sidebar-text-active)" : "var(--sidebar-text)",
        background: isActive ? "var(--sidebar-active)" : "transparent",
        textDecoration: "none",
        fontSize: 13,
        fontWeight: isActive ? 500 : 400,
        borderRadius: "var(--radius-md)",
        margin: "1px 6px",
        transition: "background 0.1s, color 0.1s",
      }}
    >
      <Icon />
      {label}
    </Link>
  );
}

function Avatar({
  name,
  color,
  size = 32,
}: {
  name: string;
  color: string;
  size?: number;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.38,
        fontWeight: 600,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

// --- Icons ---
function DashboardIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1.5" y="1.5" width="5" height="5" rx="1"/>
      <rect x="8.5" y="1.5" width="5" height="5" rx="1"/>
      <rect x="1.5" y="8.5" width="5" height="5" rx="1"/>
      <rect x="8.5" y="8.5" width="5" height="5" rx="1"/>
    </svg>
  );
}
function TasksIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="2,7.5 5,10.5 10,4.5"/>
      <rect x="1.5" y="1.5" width="12" height="12" rx="2"/>
    </svg>
  );
}
function InboxIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1.5" y="1.5" width="12" height="12" rx="2"/>
      <path d="M1.5 9.5h3.5l1.5 2.5h2l1.5-2.5h3.5"/>
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1.5" y="2.5" width="12" height="11" rx="2"/>
      <line x1="1.5" y1="6.5" x2="13.5" y2="6.5"/>
      <line x1="5" y1="1" x2="5" y2="4"/>
      <line x1="10" y1="1" x2="10" y2="4"/>
    </svg>
  );
}
function BoardIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1.5" y="1.5" width="12" height="12" rx="2"/>
      <line x1="1.5" y1="5.5" x2="13.5" y2="5.5"/>
      <line x1="6" y1="5.5" x2="6" y2="13.5"/>
    </svg>
  );
}
function BacklogIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="7.5" cy="7.5" r="5.5"/>
      <path d="M4 7.5h7"/>
      <path d="M7.5 4v7"/>
    </svg>
  );
}
function RoadmapIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="2" y1="5" x2="13" y2="5"/>
      <line x1="2" y1="8" x2="10" y2="8"/>
      <line x1="2" y1="11" x2="7" y2="11"/>
    </svg>
  );
}
function ReleasesIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polygon points="7.5,1.5 9.5,5.5 13.5,6 10.5,9 11.5,13 7.5,11 3.5,13 4.5,9 1.5,6 5.5,5.5"/>
    </svg>
  );
}
function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--sidebar-section)" strokeWidth="1.5">
      <polyline points="5,3 9,7 5,11"/>
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="var(--sidebar-section)" strokeWidth="1.5">
      <circle cx="5.5" cy="5.5" r="4"/>
      <line x1="9" y1="9" x2="12" y2="12"/>
    </svg>
  );
}
function LogoutIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--sidebar-section)" strokeWidth="1.5">
      <path d="M5 2H2.5A1.5 1.5 0 001 3.5v7A1.5 1.5 0 002.5 12H5"/>
      <polyline points="9,4 13,7 9,10"/>
      <line x1="13" y1="7" x2="5" y2="7"/>
    </svg>
  );
}
