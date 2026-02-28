import { motion } from "framer-motion";
import { FileText, Download, Loader2 } from "lucide-react";
import { mockReports } from "@/lib/mock-data";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const typeLabels: Record<string, string> = {
  weekly: "Weekly",
  creative: "Creative",
  budget: "Budget",
  quarterly: "Quarterly",
};

export default function ReportsPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-4xl mx-auto">
      <motion.div variants={item}>
        <h1 className="text-2xl font-display font-bold text-foreground">Reports</h1>
        <p className="text-sm text-muted-foreground mt-1">AI-generated performance reports and insights</p>
      </motion.div>

      <div className="space-y-3">
        {mockReports.map((r) => (
          <motion.div key={r.id} variants={item} className="glass-card-hover p-5 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-foreground">{r.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                  {typeLabels[r.type]}
                </span>
                <span className="text-[11px] text-muted-foreground">{r.date}</span>
              </div>
            </div>
            {r.status === "ready" ? (
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
                <Download className="h-3.5 w-3.5" /> View
              </button>
            ) : (
              <span className="flex items-center gap-1.5 text-xs text-warning">
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Generating
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
