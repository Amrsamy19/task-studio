export default function Loading() {
  return <TaskDetailSkeleton />;
}

export function TaskDetailSkeleton() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", height: "100%", overflow: "hidden" }}>
      <div style={{ padding: 32, borderRight: "1px solid var(--border)", overflow: "auto" }}>
        <div className="shimmer" style={{ width: 200, height: 14, marginBottom: 24, borderRadius: 4 }} />
        <div className="shimmer" style={{ width: 32, height: 12, marginBottom: 12, borderRadius: 4 }} />
        <div className="shimmer" style={{ width: "70%", height: 28, marginBottom: 16, borderRadius: 6 }} />
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {[80, 70, 60, 70].map((w, i) => (
            <div key={i} className="shimmer" style={{ width: w, height: 22, borderRadius: 100 }} />
          ))}
        </div>
        <div className="shimmer" style={{ width: 100, height: 12, marginBottom: 12, borderRadius: 4 }} />
        {[100, 80, 90].map((w, i) => (
          <div key={i} className="shimmer" style={{ width: `${w}%`, height: 14, marginBottom: 8, borderRadius: 4 }} />
        ))}
      </div>
      <div style={{ padding: 24, background: "var(--bg-secondary)" }}>
        {[80, 60, 70, 50, 60].map((w, i) => (
          <div key={i} style={{ marginBottom: 20 }}>
            <div className="shimmer" style={{ width: 60, height: 11, marginBottom: 8, borderRadius: 4 }} />
            <div className="shimmer" style={{ width: `${w}%`, height: 16, borderRadius: 4 }} />
          </div>
        ))}
      </div>
    </div>
  );
}
