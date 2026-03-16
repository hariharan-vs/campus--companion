import { motion } from "framer-motion";
import { useState } from "react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const scheduleData: Record<string, { time: string; course: string; room: string; professor: string; color: string }[]> = {
  Mon: [
    { time: "09:00", course: "Data Structures", room: "B-204", professor: "Prof. Ramirez", color: "bg-primary/10 border-primary/20" },
    { time: "11:00", course: "Linear Algebra", room: "A-102", professor: "Prof. Chen", color: "bg-destructive/10 border-destructive/20" },
    { time: "14:00", course: "Physics Lab", room: "C-Lab 3", professor: "Dr. Patel", color: "bg-status-progress/10 border-status-progress/20" },
  ],
  Tue: [
    { time: "10:00", course: "Computer Networks", room: "B-301", professor: "Prof. Kim", color: "bg-primary/10 border-primary/20" },
    { time: "13:00", course: "Technical Writing", room: "A-205", professor: "Prof. Garcia", color: "bg-destructive/10 border-destructive/20" },
  ],
  Wed: [
    { time: "09:00", course: "Data Structures", room: "B-204", professor: "Prof. Ramirez", color: "bg-primary/10 border-primary/20" },
    { time: "15:00", course: "Elective: AI Ethics", room: "D-101", professor: "Prof. Nakamura", color: "bg-status-progress/10 border-status-progress/20" },
  ],
  Thu: [
    { time: "10:00", course: "Computer Networks", room: "B-301", professor: "Prof. Kim", color: "bg-primary/10 border-primary/20" },
    { time: "14:00", course: "Physics Lab", room: "C-Lab 3", professor: "Dr. Patel", color: "bg-status-progress/10 border-status-progress/20" },
  ],
  Fri: [
    { time: "11:00", course: "Linear Algebra", room: "A-102", professor: "Prof. Chen", color: "bg-destructive/10 border-destructive/20" },
  ],
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.2, 0.8, 0.2, 1] as const } },
};

const SchedulePage = () => {
  const [activeDay, setActiveDay] = useState("Mon");
  const classes = scheduleData[activeDay] || [];

  return (
    <div className="px-4 pt-12 space-y-6">
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Week View</p>
        <h1 className="text-3xl font-display">Schedule</h1>
      </div>

      {/* Day selector */}
      <div className="flex gap-2">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`flex-1 py-2.5 rounded-button text-xs font-medium uppercase tracking-widest transition-all ${
              activeDay === day
                ? "bg-foreground text-background"
                : "bg-secondary text-muted-foreground hover:bg-muted"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Classes */}
      <motion.div
        key={activeDay}
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {classes.length === 0 && (
          <div className="card-surface p-8 text-center">
            <p className="text-muted-foreground text-sm">No classes today 🎉</p>
          </div>
        )}
        {classes.map((cls, i) => (
          <motion.div key={i} variants={item} className={`card-surface p-4 border ${cls.color}`}>
            <div className="flex items-start gap-4">
              <div className="text-center min-w-[48px]">
                <p className="font-mono text-sm font-medium">{cls.time}</p>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold font-body">{cls.course}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{cls.professor}</p>
                <p className="text-xs font-mono text-muted-foreground mt-1">{cls.room}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default SchedulePage;
