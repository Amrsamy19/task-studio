import { notFound } from "next/navigation";
import { getTask, getUsers, ApiError } from "@/lib/api";
import { EditTaskModal } from "@/components/tasks/EditTaskModal";

export default async function EditTaskPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const [task, users] = await Promise.all([getTask(params.id), getUsers()]);
    return <EditTaskModal task={task} users={users} />;
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) notFound();
    throw err;
  }
}
