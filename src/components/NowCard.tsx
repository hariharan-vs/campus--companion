import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NowCardProps {
  className?: string;
  courseName: string;
  roomNumber: string;
  building: string;
  timeUntil: number; // minutes
  professor: string;
}

const NowCard = ({ className, courseName, roomNumber, building, timeUntil, professor }: NowCardProps) => {
  const navigate = useNavigate();
  const isLate = timeUntil < 0;
  const isUrgent = timeUntil <= 5 && timeUntil >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className={`now-card ${isUrgent || isLate ? "animate-pulse-glow" : ""} ${className ?? ""}`}
    >
      <div className="flex items-center gap-2 mb-4">
        <Clock size={14} className="opacity-60" />
        <span className="text-xs uppercase tracking-widest opacity-60">
          {isLate ? "Started" : "Next Class"} · {Math.abs(timeUntil)} min {isLate ? "ago" : ""}
        </span>
      </div>

      <h2 className="font-display text-2xl mb-1">{courseName}</h2>
      <p className="text-sm opacity-70 mb-4">{professor}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-primary" />
          <span className="font-mono text-sm">{roomNumber} · {building}</span>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={() => navigate("/map")}
          className="flex items-center gap-2 bg-primary text-primary-foreground h-10 px-5 rounded-button text-sm font-medium"
        >
          Route Me
          <ArrowRight size={14} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default NowCard;
