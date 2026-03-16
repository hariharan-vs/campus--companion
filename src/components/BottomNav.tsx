import { useLocation, useNavigate } from "react-router-dom";
import { Home, Map, Calendar, Ticket, User } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/map", icon: Map, label: "Map" },
  { path: "/schedule", icon: Calendar, label: "Schedule" },
  { path: "/tickets", icon: Ticket, label: "Tickets" },
  { path: "/profile", icon: User, label: "Profile" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bottom-nav flex items-center justify-around px-2 safe-area-bottom">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        const Icon = tab.icon;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className="relative flex flex-col items-center gap-0.5 py-2 px-3 transition-colors"
          >
            <div className="relative">
              <Icon
                size={24}
                strokeWidth={1.5}
                className={isActive ? "text-primary" : "text-muted-foreground"}
                fill={isActive ? "hsl(var(--primary))" : "none"}
              />
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </div>
            <span
              className={`text-[10px] uppercase tracking-widest font-medium ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
