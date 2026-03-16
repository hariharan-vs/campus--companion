import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.2, 0.8, 0.2, 1] as const } },
};

const AnnouncementsPage = () => {
  const navigate = useNavigate();

  const { data: announcements = [] } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const { data } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });
      return data ?? [];
    },
  });

  return (
    <div className="px-4 pt-12 space-y-6">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <ArrowLeft size={18} />
        </button>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Campus</p>
          <h1 className="text-2xl font-display">Announcements</h1>
        </div>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
        {announcements.map((a) => (
          <motion.div key={a.id} variants={item} className="card-surface p-4">
            <div className="flex items-center gap-2 mb-2">
              {a.urgent && <span className="status-dot status-dot-pending" />}
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground bg-secondary px-1.5 py-0.5 rounded font-medium">{a.tag}</span>
              <span className="text-[10px] text-muted-foreground ml-auto">{formatDistanceToNow(new Date(a.created_at), { addSuffix: true })}</span>
            </div>
            <h3 className="text-sm font-semibold mb-1">{a.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{a.body}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AnnouncementsPage;
