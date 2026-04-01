import { Status, Priority } from "@/types";
import { clsx } from "clsx";

// --- Status Badge ---
const STATUS_CONFIG: Record<
  Status,
  { label: string; bg: string; text: string; dot: string }
> = {
  BACKLOG: {
    label: "Backlog",
    bg: "var(--status-backlog-bg)",
    text: "var(--status-backlog-text)",
    dot: "var(--status-backlog-dot)",
  },
  IN_PROGRESS: {
    label: "In Progress",
    bg: "var(--status-inprogress-bg)",
    text: "var(--status-inprogress-text)",
    dot: "var(--status-inprogress-dot)",
  },
  BLOCKED: {
    label: "Blocked",
    bg: "var(--status-blocked-bg)",
    text: "var(--status-blocked-text)",
    dot: "var(--status-blocked-dot)",
  },
  DONE: {
    label: "Done",
    bg: "var(--status-done-bg)",
    text: "var(--status-done-text)",
    dot: "var(--status-done-dot)",
  },
};

export function StatusBadge({ status }: { status: Status }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 8px",
        borderRadius: 100,
        fontSize: 12,
        fontWeight: 500,
        background: cfg.bg,
        color: cfg.text,
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: cfg.dot,
          flexShrink: 0,
        }}
      />
      {cfg.label}
    </span>
  );
}

// --- Priority Flag ---
const PRIORITY_CONFIG: Record<
  Priority,
  { label: string; color: string }
> = {
  URGENT: { label: "Urgent", color: "var(--priority-urgent)" },
  HIGH: { label: "High", color: "var(--priority-high)" },
  MEDIUM: { label: "Medium", color: "var(--priority-medium)" },
  LOW: { label: "Low", color: "var(--priority-low)" },
};

export function PriorityFlag({ priority }: { priority: Priority }) {
  const cfg = PRIORITY_CONFIG[priority];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontSize: 13,
        color: "var(--text-secondary)",
        whiteSpace: "nowrap",
      }}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill={cfg.color}
      >
        <path d="M2 1v10M2 1l7 2-7 3" stroke={cfg.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
      {cfg.label}
    </span>
  );
}

// --- Category Tag ---
const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Backend: { bg: "var(--cat-backend-bg)", text: "var(--cat-backend-text)" },
  Frontend: { bg: "var(--cat-frontend-bg)", text: "var(--cat-frontend-text)" },
  Design: { bg: "var(--cat-design-bg)", text: "var(--cat-design-text)" },
  Testing: { bg: "var(--cat-testing-bg)", text: "var(--cat-testing-text)" },
  DevOps: { bg: "var(--cat-devops-bg)", text: "var(--cat-devops-text)" },
};

export function CategoryTag({ category }: { category?: string | null }) {
  if (!category) return null;
  const colors = CATEGORY_COLORS[category] ?? {
    bg: "var(--bg-tertiary)",
    text: "var(--text-secondary)",
  };
  return (
    <span
      style={{
        display: "inline-flex",
        padding: "2px 8px",
        borderRadius: "var(--radius-sm)",
        fontSize: 11,
        fontWeight: 600,
        background: colors.bg,
        color: colors.text,
        whiteSpace: "nowrap",
      }}
    >
      {category}
    </span>
  );
}

// --- Avatar ---
const AVATAR_COLORS = [
  "#7c3aed", "#2563eb", "#059669", "#d97706",
  "#dc2626", "#7c3aed", "#0891b2", "#65a30d",
];

function hashColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export function Avatar({
  name,
  size = 26,
}: {
  name: string;
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
      title={name}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: hashColor(name),
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.38,
        fontWeight: 600,
        flexShrink: 0,
        cursor: "default",
        userSelect: "none",
      }}
    >
      {initials}
    </div>
  );
}

// --- Skeleton ---
export function Skeleton({
  width = "100%",
  height = 16,
  style,
}: {
  width?: string | number;
  height?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="shimmer"
      style={{ width, height, borderRadius: "var(--radius-md)", ...style }}
    />
  );
}

// --- Empty State ---
export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        textAlign: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: "var(--bg-tertiary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 4,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5">
          <rect x="3" y="3" width="16" height="16" rx="3"/>
          <line x1="7" y1="11" x2="15" y2="11"/>
          <line x1="11" y1="7" x2="11" y2="15"/>
        </svg>
      </div>
      <div style={{ fontWeight: 500, color: "var(--text-primary)", fontSize: 14 }}>
        {title}
      </div>
      {description && (
        <div style={{ fontSize: 13, color: "var(--text-secondary)", maxWidth: 300 }}>
          {description}
        </div>
      )}
      {action}
    </div>
  );
}

// --- Button ---
export function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  disabled,
  style,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  style?: React.CSSProperties;
}) {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: 500,
    fontFamily: "inherit",
    transition: "background 0.15s, opacity 0.15s",
    opacity: disabled ? 0.5 : 1,
    whiteSpace: "nowrap",
    borderRadius: "var(--radius-md)",
    fontSize: size === "sm" ? 12 : 13,
    padding: size === "sm" ? "5px 10px" : "7px 14px",
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: { background: "var(--accent)", color: "#fff" },
    secondary: { background: "var(--bg-secondary)", color: "var(--text-primary)", border: "1px solid var(--border)" },
    ghost: { background: "transparent", color: "var(--text-secondary)", border: "1px solid var(--border)" },
    danger: { background: "#fee2e2", color: "#dc2626", border: "1px solid #fecaca" },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...base, ...variants[variant], ...style }}
    >
      {children}
    </button>
  );
}
