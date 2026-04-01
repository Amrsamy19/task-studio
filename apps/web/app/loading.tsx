export default function RootLoading() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header Skeleton */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderBottom: "1px solid var(--border, #e5e7eb)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="shimmer" style={{ width: 24, height: 24, borderRadius: 4 }} />
          <div className="shimmer" style={{ width: 120, height: 24, borderRadius: 4 }} />
        </div>
      </div>

      <div style={{ padding: 20 }}>
        <div className="shimmer" style={{ width: "40%", height: 32, marginBottom: 20 }} />
        <div className="shimmer" style={{ width: "90%", height: 16, marginBottom: 12 }} />
        <div className="shimmer" style={{ width: "80%", height: 16, marginBottom: 12 }} />
        <div className="shimmer" style={{ width: "85%", height: 16, marginBottom: 12 }} />
      </div>
    </div>
  );
}
