import { cn } from "@/lib/utils";

type Status = "resolved" | "pending" | "in-progress";

const statusConfig: Record<Status, { dot: string; border: string; text: string; label: string }> = {
  resolved: {
    dot: "status-dot-resolved",
    border: "border-status-resolved/30",
    text: "text-status-resolved",
    label: "Resolved",
  },
  pending: {
    dot: "status-dot-pending",
    border: "border-status-pending/30",
    text: "text-status-pending",
    label: "Pending",
  },
  "in-progress": {
    dot: "status-dot-progress",
    border: "border-status-progress/30",
    text: "text-status-progress",
    label: "In Progress",
  },
};

const StatusBadge = ({ status }: { status: Status }) => {
  const config = statusConfig[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-widest border font-medium", config.border, config.text)}>
      <span className={cn("status-dot", config.dot)} />
      {config.label}
    </span>
  );
};

export default StatusBadge;
export type { Status };
