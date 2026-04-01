export function TaskDetailSkeleton() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 280px",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "24px 32px" }}>
        <div className="shimmer" style={{ width: 120, height: 16, marginBottom: 20 }} />
        <div className="shimmer" style={{ width: 300, height: 32, marginBottom: 12 }} />
        <div className="shimmer" style={{ width: 200, height: 24, marginBottom: 24 }} />
        <div className="shimmer" style={{ width: "100%", height: 100, marginBottom: 28 }} />
      </div>
      <aside
        style={{
          background: "var(--bg)",
          borderLeft: "1px solid var(--border)",
          padding: "24px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div className="shimmer" style={{ width: 100, height: 20 }} />
        <div className="shimmer" style={{ width: 150, height: 24 }} />
        <div className="shimmer" style={{ width: 120, height: 24 }} />
      </aside>
    </div>
  );
}
