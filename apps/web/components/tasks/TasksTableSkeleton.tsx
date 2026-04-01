export function TasksTableSkeleton() {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        fontSize: 13,
      }}
    >
      <colgroup>
        <col style={{ width: 28 }} />
        <col />
        <col style={{ width: 100 }} />
        <col style={{ width: 100 }} />
        <col style={{ width: 60 }} />
        <col style={{ width: 70 }} />
        <col style={{ width: 90 }} />
        <col style={{ width: 32 }} />
      </colgroup>
      {[
        { label: "In Progress", count: 3 },
        { label: "Blocked", count: 1 },
        { label: "Backlog", count: 2 },
      ].map((group) => (
        <tbody key={group.label}>
          {/* Group header */}
          <tr>
            <td colSpan={8} style={{ padding: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 20px",
                  background: "var(--bg-secondary)",
                  borderBottom: "1px solid var(--border-light)",
                  borderTop: "1px solid var(--border-light)",
                }}
              >
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <div className="shimmer" style={{ width: 80, height: 22, borderRadius: 100 }} />
                  <div className="shimmer" style={{ width: 20, height: 16, borderRadius: 4 }} />
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <div className="shimmer" style={{ width: 20, height: 20, borderRadius: 4 }} />
                  <div className="shimmer" style={{ width: 20, height: 20, borderRadius: 4 }} />
                </div>
              </div>
            </td>
          </tr>

          {/* Column headers */}
          <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
            {["", "Name", "Assignees", "Priority", "Start", "Due", "Category", ""].map((h, i) => (
              <th
                key={i}
                style={{
                  padding: "6px 8px",
                  fontSize: 11,
                  fontWeight: 500,
                  color: "var(--text-tertiary)",
                  textAlign: i === 1 ? "left" : "center",
                  background: "var(--bg)",
                }}
              >
                {h}
              </th>
            ))}
          </tr>

          {/* Row skeletons */}
          {Array.from({ length: group.count }).map((_, i) => (
            <tr key={i} style={{ borderBottom: "1px solid var(--border-light)" }}>
              <td style={{ padding: "12px 0 12px 20px" }}>
                <div className="shimmer" style={{ width: 14, height: 14, borderRadius: 2 }} />
              </td>
              <td style={{ padding: "12px 16px 12px 8px" }}>
                <div className="shimmer" style={{ width: `${60 + Math.random() * 30}%`, height: 14, marginBottom: 6 }} />
                <div className="shimmer" style={{ width: 50, height: 11 }} />
              </td>
              <td style={{ padding: "12px 8px" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div className="shimmer" style={{ width: 24, height: 24, borderRadius: "50%" }} />
                </div>
              </td>
              <td style={{ padding: "12px 8px" }}>
                <div className="shimmer" style={{ width: 60, height: 14, margin: "0 auto" }} />
              </td>
              <td style={{ padding: "12px 8px" }}>
                <div className="shimmer" style={{ width: 30, height: 14, margin: "0 auto" }} />
              </td>
              <td style={{ padding: "12px 8px" }}>
                <div className="shimmer" style={{ width: 40, height: 14, margin: "0 auto" }} />
              </td>
              <td style={{ padding: "12px 8px", textAlign: "center" }}>
                <div className="shimmer" style={{ width: 60, height: 18, borderRadius: 4, display: "inline-block" }} />
              </td>
              <td style={{ padding: "12px 12px 12px 4px" }}>
                <div className="shimmer" style={{ width: 16, height: 16, borderRadius: 2, margin: "0 auto" }} />
              </td>
            </tr>
          ))}
        </tbody>
      ))}
    </table>
  );
}
