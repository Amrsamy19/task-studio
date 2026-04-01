import { Suspense } from "react";
import { getTasks, getUsers } from "@/lib/api";
import { TaskFilters, Status, Task } from "@/types";
import { TasksHeader } from "@/components/tasks/TasksHeader";
import { TasksFilters } from "@/components/tasks/TasksFilters";
import { TasksTable } from "@/components/tasks/TasksTable";
import { TasksTableSkeleton } from "@/components/tasks/TasksTableSkeleton";
import { TaskModal } from "@/components/tasks/TaskModal";

const STATUS_ORDER: Status[] = ["IN_PROGRESS", "BLOCKED", "BACKLOG", "DONE"];

type SearchParams = {
  status?: string;
  priority?: string;
  assigneeId?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: string;
  newTask?: string;
};

export default async function TasksPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const filters: TaskFilters = {
    status: searchParams.status as Status | undefined,
    priority: searchParams.priority as TaskFilters["priority"],
    assigneeId: searchParams.assigneeId,
    search: searchParams.search,
    sortBy: searchParams.sortBy as TaskFilters["sortBy"],
    sortOrder: searchParams.sortOrder as TaskFilters["sortOrder"],
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    limit: 50,
  };

  const [tasksResult, users] = await Promise.all([
    getTasks(filters),
    getUsers(),
  ]);

  // Group tasks by status (only when no status filter)
  const grouped: Record<Status, Task[]> =
    filters.status
      ? ({ [filters.status]: tasksResult.data } as Record<Status, Task[]>)
      : STATUS_ORDER.reduce((acc, status) => {
          acc[status] = tasksResult.data.filter((t) => t.status === status);
          return acc;
        }, {} as Record<Status, Task[]>);

  const statusGroups = filters.status
    ? [filters.status as Status]
    : STATUS_ORDER.filter((s) => grouped[s]?.length > 0);

  const showModal = searchParams.newTask === "1";

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <TasksHeader
        total={tasksResult.meta.total}
        meta={tasksResult.meta}
        filters={filters}
      />

      <TasksFilters users={users} filters={filters} />

      <div style={{ flex: 1, overflow: "auto" }}>
        <Suspense fallback={<TasksTableSkeleton />}>
          <TasksTable
            grouped={grouped}
            statusGroups={statusGroups}
            filters={filters}
          />
        </Suspense>
      </div>

      {/* Status bar */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "8px 20px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 12,
          color: "var(--text-secondary)",
          background: "var(--bg)",
          flexShrink: 0,
        }}
      >
        <span>{tasksResult.meta.total} tasks</span>
        {STATUS_ORDER.map((s) => {
          const count = grouped[s]?.length ?? 0;
          if (!count) return null;
          const colors: Record<Status, string> = {
            IN_PROGRESS: "var(--status-inprogress-dot)",
            BLOCKED: "var(--status-blocked-dot)",
            BACKLOG: "var(--status-backlog-dot)",
            DONE: "var(--status-done-dot)",
          };
          const labels: Record<Status, string> = {
            IN_PROGRESS: "In Progress",
            BLOCKED: "Blocked",
            BACKLOG: "Backlog",
            DONE: "Done",
          };
          return (
            <span key={s} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: colors[s], display: "inline-block" }} />
              {count} {labels[s]}
            </span>
          );
        })}
      </div>

      {showModal && <TaskModal users={users} />}
    </div>
  );
}
