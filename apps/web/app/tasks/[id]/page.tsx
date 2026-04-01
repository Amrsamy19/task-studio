import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getTask, getUsers } from "@/lib/api";
import { ApiError } from "@/lib/api";
import { TaskDetail } from "@/components/tasks/TaskDetail";
import { TaskDetailSkeleton } from "@/components/tasks/TaskDetailSkeleton";

export default async function TaskPage({ params }: { params: { id: string } }) {
  try {
    const [task, users] = await Promise.all([
      getTask(params.id),
      getUsers(),
    ]);

    return (
      <Suspense fallback={<TaskDetailSkeleton />}>
        <TaskDetail task={task} users={users} />
      </Suspense>
    );
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }
}
