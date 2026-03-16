import { motion } from "framer-motion";
import { Bell, Megaphone, Ticket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import NowCard from "@/components/NowCard";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] as const } },
};

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user!.id)
        .single();
      return data;
    },
    enabled: !!user,
  });

  const { data: tickets = [] } = useQuery({
    queryKey: ["tickets-summary", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("tickets")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false })
        .limit(3);
      return data ?? [];
    },
    enabled: !!user,
  });

  const { data: announcements = [] } = useQuery({
    queryKey: ["announcements-summary"],
    queryFn: async () => {
      const { data } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);
      return data ?? [];
    },
  });

  const greeting = new Date().getHours() < 12 ? "Good Morning" : new Date().getHours() < 17 ? "Good Afternoon" : "Good Evening";
  const displayName = profile?.full_name?.split(" ")[0] ?? user?.email?.split("@")[0] ?? "Student";

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="px-4 pt-12 space-y-6">
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{greeting}</p>
          <h1 className="text-3xl font-display">Hi, {displayName}</h1>
        </div>
        <button
          onClick={() => navigate("/announcements")}
          className="relative w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
        >
          <Bell size={18} className="text-foreground" />
          {announcements.some((a) => a.urgent) && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
          )}
        </button>
      </motion.div>

      <motion.div variants={item}>
        <NowCard
          courseName="Data Structures & Algorithms"
          roomNumber="B-204"
          building="Block B"
          timeUntil={12}
          professor="Prof. Ramirez"
        />
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        <motion.div variants={item} className="card-surface p-4 col-span-1 cursor-pointer" onClick={() => navigate("/tickets")}>
          <div className="flex items-center gap-2 mb-3">
            <Ticket size={14} className="text-primary" />
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Tickets</span>
          </div>
          <div className="space-y-2.5">
            {tickets.length === 0 && <p className="text-xs text-muted-foreground">No tickets yet</p>}
            {tickets.map((t) => (
              <div key={t.id} className="flex items-start gap-2">
                <span className={`status-dot mt-1.5 ${t.status === "resolved" ? "status-dot-resolved" : t.status === "pending" ? "status-dot-pending" : "status-dot-progress"}`} />
                <div className="min-w-0">
                  <p className="text-xs truncate font-medium">{t.title}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">T-{t.ticket_number}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={item} className="card-surface p-4 col-span-1 cursor-pointer" onClick={() => navigate("/announcements")}>
          <div className="flex items-center gap-2 mb-3">
            <Megaphone size={14} className="text-primary" />
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Updates</span>
          </div>
          <div className="space-y-2.5">
            {announcements.map((a) => (
              <div key={a.id} className="flex items-start gap-2">
                {a.urgent ? <span className="status-dot status-dot-pending mt-1.5" /> : <span className="status-dot bg-muted mt-1.5" />}
                <div className="min-w-0">
                  <p className="text-xs truncate font-medium">{a.title}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div variants={item}>
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-medium">Quick Actions</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "New Ticket", icon: "🎫", path: "/tickets/new" },
            { label: "Schedule", icon: "📅", path: "/schedule" },
            { label: "Map", icon: "🗺️", path: "/map" },
          ].map((action) => (
            <motion.button
              key={action.label}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(action.path)}
              className="card-surface p-4 flex flex-col items-center gap-2"
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-xs font-medium text-foreground">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Index;
