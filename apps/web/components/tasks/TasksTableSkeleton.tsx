export function TasksTableSkeleton() {
  return (
    <div style={{ padding: "0" }}>
      {[
        { label: "In Progress", count: 3 },
        { label: "Blocked", count: 1 },
        { label: "Backlog", count: 2 },
      ].map((group) => (
        <div key={group.label}>
          {/* Group header skeleton */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 20px",
              background: "var(--bg-secondary)",
              borderBottom: "1px solid var(--border-light)",
              borderTop: "1px solid var(--border-light)",
            }}
          >
            <div className="shimmer" style={{ width: 80, height: 22, borderRadius: 100 }} />
            <div className="shimmer" style={{ width: 20, height: 16, borderRadius: 4 }} />
          </div>

          {/* Column headers */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "28px 1fr 100px 100px 60px 70px 90px 32px",
              padding: "6px 20px",
              borderBottom: "1px solid var(--border-light)",
              gap: 8,
            }}
          >
            {["", "Name", "Assignee", "Priority", "Start", "Due", "Category", ""].map((h, i) => (
              <div key={i} style={{ fontSize: 11, color: "var(--text-tertiary)", fontWeight: 500 }}>
                {h}
              </div>
            ))}
          </div>

          {/* Row skeletons */}
          {Array.from({ length: group.count }).map((_, i) => (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "28px 1fr 100px 100px 60px 70px 90px 32px",
                alignItems: "center",
                padding: "12px 20px",
                borderBottom: "1px solid var(--border-light)",
                gap: 8,
              }}
            >
              <div className="shimmer" style={{ width: 14, height: 14, borderRadius: 2 }} />
              <div>
                <div className="shimmer" style={{ width: `${60 + Math.random() * 30}%`, height: 14, marginBottom: 6 }} />
                <div className="shimmer" style={{ width: 50, height: 11 }} />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="shimmer" style={{ width: 24, height: 24, borderRadius: "50%" }} />
              </div>
              <div className="shimmer" style={{ width: 60, height: 14 }} />
              <div className="shimmer" style={{ width: 30, height: 14, margin: "0 auto" }} />
              <div className="shimmer" style={{ width: 40, height: 14, margin: "0 auto" }} />
              <div className="shimmer" style={{ width: 60, height: 20, borderRadius: 4 }} />
              <div />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
