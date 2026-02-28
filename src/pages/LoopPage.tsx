import { motion } from "framer-motion";
import { Eye, Paintbrush, DollarSign, MessageSquare, ArrowRight } from "lucide-react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
const item = { hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } };

const agents = [
  {
    id: "analyst",
    title: "Analyst Agent",
    subtitle: "Surveillance & Data Mining",
    icon: Eye,
    description: "Monitors ad performance, detects fatigue signals, identifies anomalies, and triggers alerts for the team.",
    actions: ["Monitor KPIs", "Detect fatigue", "Spot anomalies", "Send triggers"],
  },
  {
    id: "creative",
    title: "Creative Director",
    subtitle: "Content Generation",
    icon: Paintbrush,
    description: "Receives triggers from Analyst and auto-generates new ad variations aligned with brand guidelines.",
    actions: ["Generate creatives", "A/B variants", "Brand compliance", "Deploy assets"],
  },
  {
    id: "mediaBuyer",
    title: "Media Buyer",
    subtitle: "Budgeting & Bidding",
    icon: DollarSign,
    description: "Takes new creatives and optimizes budget allocation, bid strategies, and campaign scaling across platforms.",
    actions: ["Allocate budgets", "Adjust bids", "Scale winners", "Pause losers"],
  },
  {
    id: "accountManager",
    title: "Account Manager",
    subtitle: "Reporting & Communication",
    icon: MessageSquare,
    description: "Compiles results into narrative reports, generates video briefs, and communicates updates via Slack & email.",
    actions: ["Generate reports", "Video briefs", "Slack updates", "Client comms"],
  },
];

export default function LoopPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 max-w-5xl mx-auto">
      <motion.div variants={item}>
        <h1 className="text-2xl font-display font-bold text-foreground">The Agent Loop</h1>
        <p className="text-sm text-muted-foreground mt-1">
          How the four AI agents work together in a continuous optimization cycle
        </p>
      </motion.div>

      {/* Loop visualization */}
      <motion.div variants={item} className="glass-card p-8">
        <div className="flex flex-col items-center space-y-1">
          {agents.map((agent, i) => (
            <div key={agent.id} className="w-full">
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.15 }}
                className="flex items-center gap-4 p-5 rounded-xl border border-border/50 bg-secondary/20 hover:border-primary/30 hover:bg-secondary/40 transition-all duration-300 group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
                  <agent.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-semibold text-foreground">{agent.title}</h3>
                    <span className="text-[11px] text-muted-foreground hidden sm:inline">— {agent.subtitle}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{agent.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {agent.actions.map((a) => (
                      <span key={a} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/5 text-primary/80 border border-primary/10">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {i < agents.length - 1 && (
                <div className="flex justify-center py-2">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.15 }}
                    className="flex flex-col items-center"
                  >
                    <div className="h-6 w-px bg-gradient-to-b from-primary/40 to-primary/10" />
                    <ArrowRight className="h-4 w-4 text-primary/50 rotate-90" />
                  </motion.div>
                </div>
              )}
            </div>
          ))}

          {/* Loop back arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col items-center pt-2"
          >
            <div className="h-6 w-px bg-gradient-to-b from-primary/40 to-accent/40" />
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
              <span className="text-xs font-medium text-gradient">↻ Loop repeats continuously</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
