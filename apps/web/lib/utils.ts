import { format, formatDistanceToNow, isPast, isToday, isTomorrow } from "date-fns";

export function formatDueDate(date: string | null | undefined): {
  label: string;
  color: string;
} {
  if (!date) return { label: "—", color: "var(--text-tertiary)" };

  const d = new Date(date);
  if (isPast(d) && !isToday(d)) {
    return {
      label: format(d, "MMM d"),
      color: "var(--status-blocked-text)",
    };
  }
  if (isToday(d)) {
    return { label: "Today", color: "var(--priority-high)" };
  }
  if (isTomorrow(d)) {
    return { label: "Tomorrow", color: "var(--priority-medium)" };
  }
  return { label: format(d, "MMM d"), color: "var(--text-secondary)" };
}

export function formatRelative(date: string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}

export function formatFull(date: string) {
  return format(new Date(date), "MMM d, yyyy");
}

export function formatDateInput(date: string | null | undefined) {
  if (!date) return "";
  return format(new Date(date), "yyyy-MM-dd");
}
