import { TasksTableSkeleton } from "@/components/tasks/TasksTableSkeleton";

export default function Loading() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header Skeleton */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderBottom: "1px solid var(--border)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="shimmer" style={{ width: 24, height: 24, borderRadius: 4 }} />
          <div className="shimmer" style={{ width: 120, height: 24, borderRadius: 4 }} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div className="shimmer" style={{ width: 80, height: 32, borderRadius: 6 }} />
          <div className="shimmer" style={{ width: 100, height: 32, borderRadius: 6 }} />
        </div>
      </div>

      {/* Filters Skeleton */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 20px", borderBottom: "1px solid var(--border)", background: "var(--bg)", flexShrink: 0 }}>
        <div className="shimmer" style={{ width: 100, height: 26, borderRadius: 6 }} />
        <div style={{ width: 1, height: 16, background: "var(--border)" }} />
        <div className="shimmer" style={{ width: 90, height: 26, borderRadius: 6 }} />
        <div className="shimmer" style={{ width: 90, height: 26, borderRadius: 6 }} />
        <div className="shimmer" style={{ width: 100, height: 26, borderRadius: 6 }} />
        
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <div className="shimmer" style={{ width: 100, height: 26, borderRadius: 6 }} />
          <div className="shimmer" style={{ width: 160, height: 26, borderRadius: 6 }} />
        </div>
      </div>

      {/* Table Skeleton */}
      <div style={{ flex: 1, overflow: "auto" }}>
        <TasksTableSkeleton />
      </div>
    </div>
  );
}
