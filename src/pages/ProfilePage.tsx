import { motion } from "framer-motion";
import { ChevronRight, Bell, Shield, LogOut, BookOpen, GraduationCap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { requestNotificationPermission } from "@/lib/notifications";
import { toast } from "sonner";

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

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

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  const handleEnableNotifications = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      toast.success("Notifications enabled!");
    } else {
      toast.error("Notifications blocked. Enable them in browser settings.");
    }
  };

  return (
    <div className="px-4 pt-12 space-y-6">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-3"
        >
          <span className="text-3xl font-display text-primary">
            {(profile?.full_name?.[0] ?? user?.email?.[0] ?? "S").toUpperCase()}
          </span>
        </motion.div>
        <h1 className="text-2xl font-display">{profile?.full_name ?? "Student"}</h1>
        <p className="text-sm text-muted-foreground">{user?.email}</p>
      </div>

      <div className="card-surface p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-button bg-primary/10 flex items-center justify-center">
            <GraduationCap size={16} className="text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Program</p>
            <p className="text-sm font-medium">{profile?.program ?? "—"}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-button bg-primary/10 flex items-center justify-center">
            <BookOpen size={16} className="text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Semester</p>
            <p className="text-sm font-medium">{profile?.semester ?? "—"} · {profile?.academic_year ?? "—"}</p>
          </div>
        </div>
      </div>

      <div className="card-surface divide-y divide-border">
        <button onClick={handleEnableNotifications} className="w-full flex items-center gap-3 p-4 text-left hover:bg-secondary/50 transition-colors">
          <div className="w-9 h-9 rounded-button flex items-center justify-center bg-secondary">
            <Bell size={16} className="text-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Notifications</p>
            <p className="text-xs text-muted-foreground">Enable push alerts</p>
          </div>
          <ChevronRight size={14} className="text-muted-foreground" />
        </button>
        <button className="w-full flex items-center gap-3 p-4 text-left hover:bg-secondary/50 transition-colors">
          <div className="w-9 h-9 rounded-button flex items-center justify-center bg-secondary">
            <Shield size={16} className="text-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Privacy</p>
            <p className="text-xs text-muted-foreground">Account settings</p>
          </div>
          <ChevronRight size={14} className="text-muted-foreground" />
        </button>
        <button onClick={handleSignOut} className="w-full flex items-center gap-3 p-4 text-left hover:bg-secondary/50 transition-colors">
          <div className="w-9 h-9 rounded-button flex items-center justify-center bg-destructive/10">
            <LogOut size={16} className="text-destructive" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-destructive">Sign Out</p>
            <p className="text-xs text-muted-foreground">See you soon</p>
          </div>
          <ChevronRight size={14} className="text-muted-foreground" />
        </button>
      </div>

      <p className="text-center text-[10px] text-muted-foreground uppercase tracking-widest">Quad v1.0 · Smart Campus Assistant</p>
    </div>
  );
};

export default ProfilePage;
