import { motion } from "framer-motion";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Target, Eye, MousePointer, Lightbulb, ArrowRight, Filter } from "lucide-react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

type Platform = "all" | "meta" | "google";

const unifiedAds = [
  { id: 1, name: "Summer Sale — Lookalikes", platform: "Meta", campaign: "Prospecting", status: "active", spend: 1240, impressions: 85200, clicks: 2130, ctr: 2.5, cpa: 14.2, roas: 5.1, trend: "up" as const },
  { id: 2, name: "Brand Search — Exact Match", platform: "Google", campaign: "Brand", status: "active", spend: 890, impressions: 12400, clicks: 3100, ctr: 25.0, cpa: 8.5, roas: 6.2, trend: "up" as const },
  { id: 3, name: "Retargeting — Cart Abandon", platform: "Meta", campaign: "Retargeting", status: "active", spend: 620, impressions: 34100, clicks: 1020, ctr: 3.0, cpa: 18.6, roas: 3.8, trend: "down" as const },
  { id: 4, name: "Shopping — Summer Collection", platform: "Google", campaign: "Shopping", status: "active", spend: 1560, impressions: 45600, clicks: 1825, ctr: 4.0, cpa: 21.3, roas: 3.4, trend: "down" as const },
  { id: 5, name: "Dynamic Product Ads", platform: "Meta", campaign: "DPA", status: "active", spend: 980, impressions: 62300, clicks: 1870, ctr: 3.0, cpa: 15.8, roas: 4.5, trend: "up" as const },
  { id: 6, name: "Performance Max — All", platform: "Google", campaign: "PMAX", status: "paused", spend: 340, impressions: 8900, clicks: 445, ctr: 5.0, cpa: 28.1, roas: 2.1, trend: "down" as const },
];

const comparisonData = [
  { metric: "ROAS", meta: 4.5, google: 3.8 },
  { metric: "CTR %", meta: 2.8, google: 8.5 },
  { metric: "CPA $", meta: 16.2, google: 19.3 },
  { metric: "Conv Rate %", meta: 3.2, google: 4.1 },
];

const trendData = [
  { day: "Mon", metaSpend: 3200, googleSpend: 2100, metaROAS: 4.2, googleROAS: 3.6 },
  { day: "Tue", metaSpend: 3400, googleSpend: 2300, metaROAS: 4.5, googleROAS: 3.9 },
  { day: "Wed", metaSpend: 3100, googleSpend: 2000, metaROAS: 4.0, googleROAS: 3.5 },
  { day: "Thu", metaSpend: 3800, googleSpend: 2500, metaROAS: 4.8, googleROAS: 4.0 },
  { day: "Fri", metaSpend: 3600, googleSpend: 2400, metaROAS: 4.6, googleROAS: 3.8 },
  { day: "Sat", metaSpend: 3900, googleSpend: 2200, metaROAS: 5.0, googleROAS: 3.7 },
  { day: "Sun", metaSpend: 3500, googleSpend: 2000, metaROAS: 4.3, googleROAS: 3.6 },
];

const recommendations = [
  { id: 1, type: "scale", title: "Scale 'Summer Sale — Lookalikes'", description: "This ad set has maintained 5.1x ROAS for 5 consecutive days. Recommend increasing budget by 15% to capture more conversions.", impact: "high", platform: "Meta" },
  { id: 2, type: "pause", title: "Pause Performance Max — All", description: "CPA at $28.10 exceeds your $25 limit. Creative fatigue detected with declining CTR over 3 days.", impact: "high", platform: "Google" },
  { id: 3, type: "creative", title: "Refresh Cart Abandon creatives", description: "CTR dropped 18% week-over-week. Suggest testing new urgency-based copy and updated product images.", impact: "medium", platform: "Meta" },
  { id: 4, type: "budget", title: "Shift budget from Google Shopping to Brand", description: "Brand Search delivers 6.2x ROAS vs Shopping's 3.4x. Reallocating $200/day could improve overall efficiency.", impact: "medium", platform: "Google" },
  { id: 5, type: "opportunity", title: "Weekend engagement spike on Meta", description: "Engagement rises 23% on weekends. Consider dayparting or increased weekend budgets for Meta campaigns.", impact: "low", platform: "Meta" },
];

const impactColors = {
  high: "bg-destructive/10 text-destructive border-destructive/20",
  medium: "bg-warning/10 text-warning border-warning/20",
  low: "bg-success/10 text-success border-success/20",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="glass-card p-3 text-xs">
        <p className="font-medium text-foreground mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }} className="flex justify-between gap-4">
            <span className="text-muted-foreground">{p.name}:</span>
            <span className="font-medium">{typeof p.value === "number" && p.name.includes("$") ? `$${p.value}` : p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdsManagerPage() {
  const [platformFilter, setPlatformFilter] = useState<Platform>("all");

  const filteredAds = unifiedAds.filter(
    (ad) => platformFilter === "all" || ad.platform.toLowerCase() === platformFilter
  );

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-7xl mx-auto">
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Ads Manager</h1>
          <p className="text-sm text-muted-foreground mt-1">Unified view of Google & Meta ads with live recommendations</p>
        </div>
        <div className="flex gap-1.5">
          {([["all", "All Platforms"], ["meta", "📘 Meta"], ["google", "🔍 Google"]] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setPlatformFilter(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                platformFilter === key
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground border border-transparent"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Platform Comparison Charts */}
      {platformFilter === "all" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <motion.div variants={item} className="glass-card p-5">
            <h3 className="text-sm font-display font-semibold text-foreground mb-4">Platform Comparison</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 25%, 16%)" />
                <XAxis dataKey="metric" tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="meta" name="📘 Meta" fill="hsl(217, 91%, 60%)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="google" name="🔍 Google" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div variants={item} className="glass-card p-5">
            <h3 className="text-sm font-display font-semibold text-foreground mb-4">ROAS Trend by Platform</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 25%, 16%)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="metaROAS" name="Meta ROAS" stroke="hsl(217, 91%, 60%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="googleROAS" name="Google ROAS" stroke="hsl(142, 71%, 45%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      )}

      {/* Live Recommendations */}
      <motion.div variants={item} className="glass-card p-5">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-4 w-4 text-warning" />
          <h3 className="text-sm font-display font-semibold text-foreground">Live Recommendations</h3>
          <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-warning/10 text-warning font-medium animate-pulse-glow">
            AI-Powered
          </span>
        </div>
        <div className="space-y-3">
          {recommendations
            .filter((r) => platformFilter === "all" || r.platform.toLowerCase() === platformFilter)
            .map((rec) => (
              <div key={rec.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className={`text-[10px] px-2 py-0.5 rounded-full font-medium border shrink-0 mt-0.5 ${impactColors[rec.impact as keyof typeof impactColors]}`}>
                  {rec.impact}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{rec.title}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{rec.description}</p>
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors shrink-0">
                  Apply <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            ))}
        </div>
      </motion.div>

      {/* Unified Ad Table */}
      <motion.div variants={item} className="glass-card p-5 overflow-x-auto">
        <h3 className="text-sm font-display font-semibold text-foreground mb-4">All Campaigns</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[11px] text-muted-foreground uppercase tracking-wider">
              <th className="pb-3 pr-4">Campaign</th>
              <th className="pb-3 pr-4">Platform</th>
              <th className="pb-3 pr-4 text-right">Spend</th>
              <th className="pb-3 pr-4 text-right">Impressions</th>
              <th className="pb-3 pr-4 text-right">CTR</th>
              <th className="pb-3 pr-4 text-right">CPA</th>
              <th className="pb-3 text-right">ROAS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {filteredAds.map((ad) => (
              <tr key={ad.id} className="hover:bg-secondary/20 transition-colors">
                <td className="py-3 pr-4">
                  <div>
                    <p className="font-medium text-foreground">{ad.name}</p>
                    <p className="text-[11px] text-muted-foreground">{ad.campaign}</p>
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                    {ad.platform === "Meta" ? "📘" : "🔍"} {ad.platform}
                  </span>
                </td>
                <td className="py-3 pr-4 text-right font-mono text-foreground">${ad.spend.toLocaleString()}</td>
                <td className="py-3 pr-4 text-right text-muted-foreground">{ad.impressions.toLocaleString()}</td>
                <td className="py-3 pr-4 text-right text-muted-foreground">{ad.ctr}%</td>
                <td className="py-3 pr-4 text-right font-mono text-foreground">${ad.cpa}</td>
                <td className="py-3 text-right">
                  <span className={`inline-flex items-center gap-1 font-medium ${ad.trend === "up" ? "text-success" : "text-destructive"}`}>
                    {ad.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {ad.roas}x
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}
