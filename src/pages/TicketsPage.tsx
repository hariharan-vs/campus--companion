import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import StatusBadge, { type Status } from "@/components/StatusBadge";
import { format } from "date-fns";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.2, 0.8, 0.2, 1] as const } },
};

const TicketsPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: tickets = [] } = useQuery({
    queryKey: ["tickets", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("tickets")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      return data ?? [];
    },
    enabled: !!user,
  });

  return (
    <div className="px-4 pt-12 space-y-6 relative">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Support</p>
        <h1 className="text-3xl font-display">Tickets</h1>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
        {tickets.length === 0 && (
          <div className="card-surface p-8 text-center">
            <p className="text-muted-foreground text-sm">No tickets yet. Tap + to create one.</p>
          </div>
        )}
        {tickets.map((ticket) => (
          <motion.div key={ticket.id} variants={item} className="card-surface p-4 flex items-start gap-3 cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] text-muted-foreground">T-{ticket.ticket_number}</span>
                <StatusBadge status={ticket.status as Status} />
              </div>
              <p className="text-sm font-medium truncate">{ticket.title}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">{ticket.category}</span>
                <span className="text-[10px] text-muted-foreground">{format(new Date(ticket.created_at), "MMM d")}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={() => navigate("/tickets/new")}
        className="fixed bottom-20 right-4 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg z-40"
      >
        <Plus size={24} />
      </motion.button>
    </div>
  );
};

export default TicketsPage;
