import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Target, BarChart3, Users } from "lucide-react";
import { mockMetrics, mockPerformanceData, mockPlatformBreakdown, mockNotifications } from "@/lib/mock-data";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function MetricCard({ label, value, change, trend, icon: Icon, prefix = "" }: {
  label: string; value: string; change: number; trend: "up" | "down"; icon: React.ElementType; prefix?: string;
}) {
  const isPositive = (trend === "up" && change > 0) || (trend === "down" && change < 0);
  return (
    <motion.div variants={item} className="glass-card-hover p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? "text-success" : "text-destructive"}`}>
          {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {Math.abs(change)}%
        </div>
      </div>
      <p className="text-2xl font-display font-bold text-foreground">{prefix}{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </motion.div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="glass-card p-3 text-xs">
        <p className="font-medium text-foreground mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }} className="flex justify-between gap-4">
            <span className="text-muted-foreground">{p.name}:</span>
            <span className="font-medium">{p.name === "CPA" ? `$${p.value}` : p.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-7xl mx-auto">
      <motion.div variants={item}>
        <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time overview of your marketing performance</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Return on Ad Spend" value={mockMetrics.roas.value.toFixed(1) + "x"} change={mockMetrics.roas.change} trend={mockMetrics.roas.trend} icon={BarChart3} />
        <MetricCard label="Cost per Acquisition" value={mockMetrics.cpa.value.toFixed(2)} change={mockMetrics.cpa.change} trend={mockMetrics.cpa.trend} icon={Target} prefix="$" />
        <MetricCard label="Total Ad Spend" value={(mockMetrics.spend.value / 1000).toFixed(1) + "K"} change={mockMetrics.spend.change} trend={mockMetrics.spend.trend} icon={DollarSign} prefix="$" />
        <MetricCard label="Conversions" value={mockMetrics.conversions.value.toLocaleString()} change={mockMetrics.conversions.change} trend={mockMetrics.conversions.trend} icon={Users} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div variants={item} className="glass-card p-5 lg:col-span-2">
          <h3 className="text-sm font-display font-semibold text-foreground mb-4">Performance Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={mockPerformanceData}>
              <defs>
                <linearGradient id="roasGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(187, 96%, 42%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(187, 96%, 42%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 25%, 16%)" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="roas" name="ROAS" stroke="hsl(187, 96%, 42%)" fill="url(#roasGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div variants={item} className="glass-card p-5">
          <h3 className="text-sm font-display font-semibold text-foreground mb-4">Platform Breakdown</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={mockPlatformBreakdown} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 25%, 16%)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} />
              <YAxis dataKey="platform" type="category" tick={{ fontSize: 12, fill: "hsl(215, 20%, 55%)" }} axisLine={false} tickLine={false} width={55} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="conversions" name="Conversions" fill="hsl(187, 96%, 42%)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div variants={item} className="glass-card p-5">
        <h3 className="text-sm font-display font-semibold text-foreground mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {mockNotifications.map((n) => (
            <div key={n.id} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
              <div className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${n.read ? "bg-muted-foreground/30" : "bg-primary"}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{n.message}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
