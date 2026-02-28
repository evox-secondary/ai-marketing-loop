import { motion } from "framer-motion";
import { Bell, Check } from "lucide-react";
import { mockNotifications } from "@/lib/mock-data";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function NotificationsPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-4xl mx-auto">
      <motion.div variants={item}>
        <h1 className="text-2xl font-display font-bold text-foreground">Notifications</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time updates from your AI agents</p>
      </motion.div>

      <div className="space-y-3">
        {mockNotifications.map((n) => (
          <motion.div key={n.id} variants={item} className={`glass-card p-4 flex items-start gap-3 ${!n.read ? "border-primary/20" : ""}`}>
            <div className={`h-2 w-2 rounded-full mt-2 shrink-0 ${n.read ? "bg-muted-foreground/30" : "bg-primary animate-pulse-glow"}`} />
            <div className="flex-1">
              <p className={`text-sm ${n.read ? "text-muted-foreground" : "text-foreground"}`}>{n.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
            </div>
            {!n.read && (
              <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground">
                <Check className="h-4 w-4" />
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
