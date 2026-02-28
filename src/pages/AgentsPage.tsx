import { motion } from "framer-motion";
import { Bot, Eye, Paintbrush, DollarSign, MessageSquare, AlertTriangle, CheckCircle, Loader2, Pause } from "lucide-react";
import { mockAnalystTriggers, mockCreativeAssets, mockBudgetActions, mockAgentStatuses } from "@/lib/mock-data";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const statusConfig = {
  active: { color: "text-success", bg: "bg-success/10", icon: CheckCircle, label: "Active" },
  generating: { color: "text-warning", bg: "bg-warning/10", icon: Loader2, label: "Generating" },
  idle: { color: "text-muted-foreground", bg: "bg-muted", icon: Pause, label: "Idle" },
};

const severityColor = { high: "text-destructive bg-destructive/10", medium: "text-warning bg-warning/10", low: "text-success bg-success/10" };

function AgentCard({ title, icon: Icon, status, lastAction, children }: {
  title: string; icon: React.ElementType; status: keyof typeof statusConfig; lastAction: string; children: React.ReactNode;
}) {
  const s = statusConfig[status];
  return (
    <motion.div variants={item} className="glass-card-hover p-5 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">{title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{lastAction}</p>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${s.bg} ${s.color}`}>
          <s.icon className={`h-3 w-3 ${status === "generating" ? "animate-spin" : ""}`} />
          {s.label}
        </span>
      </div>
      {children}
    </motion.div>
  );
}

export default function AgentsPage() {
  const { analyst, creative, mediaBuyer, accountManager } = mockAgentStatuses;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-7xl mx-auto">
      <motion.div variants={item}>
        <h1 className="text-2xl font-display font-bold text-foreground">AI Agents</h1>
        <p className="text-sm text-muted-foreground mt-1">Monitor each agent's status and recent actions</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Analyst */}
        <AgentCard title="Analyst Agent" icon={Eye} status={analyst.status} lastAction={analyst.lastAction}>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {mockAnalystTriggers.map((t) => (
              <div key={t.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                <AlertTriangle className={`h-4 w-4 mt-0.5 shrink-0 ${severityColor[t.severity as keyof typeof severityColor].split(" ")[0]}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{t.message}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] text-muted-foreground">{t.platform}</span>
                    <span className="text-[11px] text-muted-foreground">•</span>
                    <span className="text-[11px] text-muted-foreground">{t.time}</span>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${severityColor[t.severity as keyof typeof severityColor]}`}>
                  {t.severity}
                </span>
              </div>
            ))}
          </div>
        </AgentCard>

        {/* Creative */}
        <AgentCard title="Creative Director" icon={Paintbrush} status={creative.status} lastAction={creative.lastAction}>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {mockCreativeAssets.map((a) => (
              <div key={a.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                <span className="text-2xl">{a.thumbnail}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground font-medium">{a.name}</p>
                  <p className="text-[11px] text-muted-foreground">{a.platform} • {a.type}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  a.status === "deployed" ? "bg-success/10 text-success" :
                  a.status === "generating" ? "bg-warning/10 text-warning" :
                  "bg-accent/10 text-accent"
                }`}>
                  {a.status.replace("_", " ")}
                </span>
              </div>
            ))}
          </div>
        </AgentCard>

        {/* Media Buyer */}
        <AgentCard title="Media Buyer" icon={DollarSign} status={mediaBuyer.status} lastAction={mediaBuyer.lastAction}>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {mockBudgetActions.map((b) => (
              <div key={b.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
                <DollarSign className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{b.action}</p>
                  <p className="text-[11px] text-muted-foreground">{b.campaign} • {b.platform}</p>
                </div>
                <span className="text-xs font-mono font-medium text-primary">{b.amount}</span>
              </div>
            ))}
          </div>
        </AgentCard>

        {/* Account Manager */}
        <AgentCard title="Account Manager" icon={MessageSquare} status={accountManager.status} lastAction={accountManager.lastAction}>
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-secondary/30">
              <p className="text-sm font-medium text-foreground mb-1">Latest Report Summary</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                This week's performance shows a 12.5% increase in ROAS across all platforms. 
                Meta campaigns continue to lead with 4.5x ROAS. TikTok engagement has risen 23% 
                over the weekend, suggesting increased creative rotation opportunity.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/30">
              <p className="text-sm font-medium text-foreground mb-1">Communication Log</p>
              <div className="space-y-1.5">
                <p className="text-xs text-muted-foreground">📧 Weekly digest sent — 2 hrs ago</p>
                <p className="text-xs text-muted-foreground">💬 Slack alert: Budget increase approved — 3 hrs ago</p>
                <p className="text-xs text-muted-foreground">📹 Video brief generated — 5 hrs ago</p>
              </div>
            </div>
          </div>
        </AgentCard>
      </div>
    </motion.div>
  );
}
