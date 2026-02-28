import { motion } from "framer-motion";
import { useState } from "react";
import { Settings, Link2, Upload, Palette, Bell as BellIcon, DollarSign, Shield } from "lucide-react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const platforms = [
  { name: "Meta Ads", connected: true, icon: "📘" },
  { name: "Google Ads", connected: true, icon: "🔍" },
  { name: "TikTok Ads", connected: false, icon: "🎵" },
  { name: "HubSpot CRM", connected: false, icon: "🟠" },
];

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <motion.div variants={item} className="glass-card p-5 space-y-4">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <h3 className="font-display font-semibold text-foreground">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}

export default function SettingsPage() {
  const [cpaLimit, setCpaLimit] = useState("25");
  const [reportFreq, setReportFreq] = useState("weekly");

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-4xl mx-auto">
      <motion.div variants={item}>
        <h1 className="text-2xl font-display font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Configure your accounts, brand, and preferences</p>
      </motion.div>

      {/* Connected Accounts */}
      <Section title="Connected Accounts" icon={Link2}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {platforms.map((p) => (
            <div key={p.name} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
              <span className="text-xl">{p.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{p.name}</p>
              </div>
              <button className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                p.connected
                  ? "bg-success/10 text-success"
                  : "bg-primary/10 text-primary hover:bg-primary/20"
              }`}>
                {p.connected ? "Connected" : "Connect"}
              </button>
            </div>
          ))}
        </div>
      </Section>

      {/* Brand Core */}
      <Section title="Brand Core" icon={Palette}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {["Logo", "Product Photos", "Brand Fonts"].map((label) => (
            <button key={label} className="flex flex-col items-center gap-2 p-6 rounded-lg border border-dashed border-border/50 hover:border-primary/30 transition-colors group">
              <Upload className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
            </button>
          ))}
        </div>
      </Section>

      {/* Preferences */}
      <Section title="Preferences" icon={Settings}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">CPA Limit</p>
              <p className="text-xs text-muted-foreground">Maximum cost per acquisition</p>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="number"
                value={cpaLimit}
                onChange={(e) => setCpaLimit(e.target.value)}
                className="w-20 px-3 py-1.5 rounded-lg bg-secondary text-foreground text-sm border border-border focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Report Frequency</p>
              <p className="text-xs text-muted-foreground">How often to receive reports</p>
            </div>
            <select
              value={reportFreq}
              onChange={(e) => setReportFreq(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-secondary text-foreground text-sm border border-border focus:border-primary focus:outline-none transition-colors"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>
      </Section>
    </motion.div>
  );
}
