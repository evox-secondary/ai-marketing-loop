// Mock data for the entire application

export const mockMetrics = {
  roas: { value: 4.2, change: 12.5, trend: "up" as const },
  cpa: { value: 18.40, change: -8.3, trend: "down" as const },
  spend: { value: 24500, change: 5.2, trend: "up" as const },
  conversions: { value: 1332, change: 15.1, trend: "up" as const },
};

export const mockPerformanceData = [
  { date: "Mon", roas: 3.8, cpa: 20.1, spend: 3200, conversions: 160 },
  { date: "Tue", roas: 4.0, cpa: 19.5, spend: 3400, conversions: 175 },
  { date: "Wed", roas: 3.6, cpa: 21.2, spend: 3100, conversions: 148 },
  { date: "Thu", roas: 4.5, cpa: 17.8, spend: 3800, conversions: 215 },
  { date: "Fri", roas: 4.2, cpa: 18.4, spend: 3600, conversions: 196 },
  { date: "Sat", roas: 4.8, cpa: 16.9, spend: 3900, conversions: 231 },
  { date: "Sun", roas: 4.1, cpa: 19.0, spend: 3500, conversions: 207 },
];

export const mockPlatformBreakdown = [
  { platform: "Meta", spend: 12500, conversions: 680, roas: 4.5 },
  { platform: "Google", spend: 8200, conversions: 420, roas: 3.8 },
  { platform: "TikTok", spend: 3800, conversions: 232, roas: 4.1 },
];

export const mockAnalystTriggers = [
  { id: 1, type: "fatigue", message: "Ad fatigue detected on 'Blue Background' video", platform: "Meta", severity: "high", time: "2 min ago" },
  { id: 2, type: "opportunity", message: "Rising CTR on Lookalike Audience 3%", platform: "Meta", severity: "medium", time: "15 min ago" },
  { id: 3, type: "anomaly", message: "CPA spike on Brand Search campaign", platform: "Google", severity: "high", time: "32 min ago" },
  { id: 4, type: "trend", message: "Weekend engagement up 23% on TikTok", platform: "TikTok", severity: "low", time: "1 hr ago" },
  { id: 5, type: "fatigue", message: "Creative rotation needed — CTR below 1%", platform: "Google", severity: "medium", time: "2 hrs ago" },
];

export const mockCreativeAssets = [
  { id: 1, name: "Summer Sale V3", type: "video", status: "deployed", platform: "Meta", performance: "high", thumbnail: "🎬" },
  { id: 2, name: "Product Carousel B", type: "image", status: "pending_review", platform: "Meta", performance: "pending", thumbnail: "🖼️" },
  { id: 3, name: "UGC Style Testimonial", type: "video", status: "deployed", platform: "TikTok", performance: "medium", thumbnail: "🎬" },
  { id: 4, name: "Dynamic Search Ad", type: "text", status: "deployed", platform: "Google", performance: "high", thumbnail: "📝" },
  { id: 5, name: "Brand Story 30s", type: "video", status: "generating", platform: "TikTok", performance: "pending", thumbnail: "🎬" },
];

export const mockBudgetActions = [
  { id: 1, action: "Budget increased by 10%", campaign: "Summer Sale — Lookalikes", platform: "Meta", amount: "+$320/day", time: "5 min ago" },
  { id: 2, action: "Bid adjusted to $12.50", campaign: "Brand Search", platform: "Google", amount: "$12.50 CPC", time: "22 min ago" },
  { id: 3, action: "Campaign paused — CPA limit hit", campaign: "Cold Audience Test", platform: "Meta", amount: "$0", time: "1 hr ago" },
  { id: 4, action: "Budget reallocated", campaign: "Retargeting — Visitors", platform: "TikTok", amount: "+$150/day", time: "3 hrs ago" },
];

export const mockReports = [
  { id: 1, title: "Weekly Performance Summary", date: "Feb 28, 2026", type: "weekly", status: "ready" },
  { id: 2, title: "Creative Performance Analysis", date: "Feb 27, 2026", type: "creative", status: "ready" },
  { id: 3, title: "Budget Optimization Report", date: "Feb 26, 2026", type: "budget", status: "ready" },
  { id: 4, title: "Platform Comparison Q1", date: "Feb 25, 2026", type: "quarterly", status: "generating" },
];

export const mockNotifications = [
  { id: 1, message: "New creatives deployed on Meta", time: "2 min ago", read: false },
  { id: 2, message: "Budget increased on winning campaign", time: "15 min ago", read: false },
  { id: 3, message: "Weekly report ready for review", time: "1 hr ago", read: true },
  { id: 4, message: "Ad fatigue alert — action taken", time: "2 hrs ago", read: true },
];

export const mockAgentStatuses = {
  analyst: { status: "active" as const, lastAction: "Scanning ad performance data", uptime: "99.8%" },
  creative: { status: "generating" as const, lastAction: "Generating 3 new ad variations", uptime: "99.5%" },
  mediaBuyer: { status: "active" as const, lastAction: "Optimizing bid strategies", uptime: "99.9%" },
  accountManager: { status: "idle" as const, lastAction: "Compiled weekly report", uptime: "99.7%" },
};
