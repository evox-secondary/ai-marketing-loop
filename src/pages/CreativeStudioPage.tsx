import { motion } from "framer-motion";
import { useState } from "react";
import { Wand2, Upload, Send, Image, Video, Type, Sparkles, CheckCircle, Clock, X, ThumbsUp, ThumbsDown } from "lucide-react";

const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

type MediaType = "image" | "video" | "text";
type GeneratedAsset = {
  id: number;
  name: string;
  type: MediaType;
  prompt: string;
  status: "generating" | "ready" | "posted" | "rejected";
  platform: string;
  preview: string;
  createdAt: string;
};

const initialAssets: GeneratedAsset[] = [
  { id: 1, name: "Summer Promo Banner", type: "image", prompt: "Vibrant summer sale banner with tropical colors", status: "ready", platform: "Meta", preview: "🖼️", createdAt: "2 min ago" },
  { id: 2, name: "Product Demo Reel", type: "video", prompt: "30s product demo with kinetic typography", status: "posted", platform: "TikTok", preview: "🎬", createdAt: "1 hr ago" },
  { id: 3, name: "Search Ad Copy v4", type: "text", prompt: "High-converting search ad copy for summer collection", status: "ready", platform: "Google", preview: "📝", createdAt: "3 hrs ago" },
  { id: 4, name: "Carousel — Testimonials", type: "image", prompt: "Customer testimonial carousel with brand colors", status: "posted", platform: "Meta", preview: "🖼️", createdAt: "5 hrs ago" },
];

const platformOptions = ["Meta", "Google", "TikTok", "All Platforms"];
const typeIcons: Record<MediaType, React.ElementType> = { image: Image, video: Video, text: Type };

const statusConfig = {
  generating: { label: "Generating", color: "text-warning bg-warning/10", icon: Clock },
  ready: { label: "Ready", color: "text-primary bg-primary/10", icon: Sparkles },
  posted: { label: "Posted", color: "text-success bg-success/10", icon: CheckCircle },
  rejected: { label: "Rejected", color: "text-destructive bg-destructive/10", icon: X },
};

export default function CreativeStudioPage() {
  const [prompt, setPrompt] = useState("");
  const [selectedType, setSelectedType] = useState<MediaType>("image");
  const [selectedPlatform, setSelectedPlatform] = useState("Meta");
  const [assets, setAssets] = useState<GeneratedAsset[]>(initialAssets);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    const newAsset: GeneratedAsset = {
      id: Date.now(),
      name: prompt.slice(0, 30) + (prompt.length > 30 ? "..." : ""),
      type: selectedType,
      prompt,
      status: "generating",
      platform: selectedPlatform,
      preview: selectedType === "image" ? "🖼️" : selectedType === "video" ? "🎬" : "📝",
      createdAt: "Just now",
    };
    setAssets([newAsset, ...assets]);
    setPrompt("");

    // Simulate generation completing
    setTimeout(() => {
      setAssets((prev) =>
        prev.map((a) => (a.id === newAsset.id ? { ...a, status: "ready" as const } : a))
      );
    }, 3000);
  };

  const handlePost = (id: number) => {
    setAssets((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "posted" as const } : a))
    );
  };

  const handleReject = (id: number) => {
    setAssets((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "rejected" as const } : a))
    );
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-5xl mx-auto">
      <motion.div variants={item}>
        <h1 className="text-2xl font-display font-bold text-foreground">Creative Studio</h1>
        <p className="text-sm text-muted-foreground mt-1">Generate, review, and deploy ad creatives across platforms</p>
      </motion.div>

      {/* Generation Panel */}
      <motion.div variants={item} className="glass-card p-5 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <Wand2 className="h-4 w-4 text-primary" />
          <h3 className="font-display font-semibold text-foreground">Generate New Creative</h3>
        </div>

        {/* Type + Platform selectors */}
        <div className="flex flex-wrap gap-3">
          <div className="flex gap-1.5">
            {(["image", "video", "text"] as MediaType[]).map((t) => {
              const Icon = typeIcons[t];
              return (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedType === t
                      ? "bg-primary/15 text-primary border border-primary/30"
                      : "bg-secondary/50 text-muted-foreground hover:text-foreground border border-transparent"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              );
            })}
          </div>
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-secondary text-foreground text-xs border border-border focus:border-primary focus:outline-none transition-colors"
          >
            {platformOptions.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Prompt input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            placeholder="Describe the creative you want to generate..."
            className="flex-1 px-4 py-2.5 rounded-lg bg-secondary/50 text-foreground text-sm border border-border placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors"
          />
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Sparkles className="h-4 w-4" />
            Generate
          </button>
        </div>
      </motion.div>

      {/* Asset Grid */}
      <motion.div variants={item}>
        <h3 className="text-sm font-display font-semibold text-foreground mb-3">Generated Creatives</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {assets.map((asset) => {
            const s = statusConfig[asset.status];
            return (
              <motion.div
                key={asset.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card-hover p-4 space-y-3"
              >
                {/* Preview area */}
                <div className="flex items-center justify-center h-32 rounded-lg bg-secondary/30 border border-border/30 text-4xl">
                  {asset.status === "generating" ? (
                    <div className="flex flex-col items-center gap-2">
                      <Sparkles className="h-6 w-6 text-warning animate-pulse" />
                      <span className="text-xs text-muted-foreground">Generating...</span>
                    </div>
                  ) : (
                    asset.preview
                  )}
                </div>

                {/* Info */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{asset.name}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{asset.platform} • {asset.type} • {asset.createdAt}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium shrink-0 ${s.color}`}>
                    <s.icon className={`h-3 w-3 ${asset.status === "generating" ? "animate-spin" : ""}`} />
                    {s.label}
                  </span>
                </div>

                {/* Actions */}
                {asset.status === "ready" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePost(asset.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                    >
                      <Send className="h-3.5 w-3.5" /> Deploy
                    </button>
                    <button
                      onClick={() => handleReject(asset.id)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-destructive/10 text-destructive text-xs font-medium hover:bg-destructive/20 transition-colors"
                    >
                      <ThumbsDown className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
                {asset.status === "posted" && (
                  <div className="flex items-center gap-1.5 text-xs text-success">
                    <CheckCircle className="h-3.5 w-3.5" /> Live on {asset.platform}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
