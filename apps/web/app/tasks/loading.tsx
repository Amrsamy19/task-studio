import { TasksTableSkeleton } from "@/components/tasks/TasksTableSkeleton";

export default function Loading() {
  return (
    <div style={{ padding: "0 0 24px" }}>
      <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ width: 200, height: 24, borderRadius: 6, background: "var(--bg-tertiary)" }} />
      </div>
      <TasksTableSkeleton />
    </div>
  );
}
