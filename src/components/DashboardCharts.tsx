import { getCombinedScores, MonthKey } from "@/data/bankData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, CartesianGrid, Cell } from "recharts";
import { motion } from "framer-motion";

const GPIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594z" fill="#EA4335"/>
    <path d="M14.584 12.023l3.543-3.521-10.9-6.192a1.49 1.49 0 0 0-1.588.074l8.945 9.639z" fill="#FBBC04"/>
    <path d="M14.584 12.023l-8.945 9.639a1.49 1.49 0 0 0 1.588.074l10.9-6.192-3.543-3.521z" fill="#34A853"/>
    <path d="M5.639 2.384A1.49 1.49 0 0 0 5.1 3.497v17.006a1.49 1.49 0 0 0 .539 1.113l8.945-9.639-8.945-9.593z" fill="#4285F4"/>
  </svg>
);

const ASIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" className="text-muted-foreground"/>
  </svg>
);

const BLUE_PALETTE = [
  "hsl(210, 90%, 55%)",
  "hsl(215, 85%, 50%)",
  "hsl(220, 80%, 52%)",
  "hsl(205, 88%, 48%)",
  "hsl(212, 82%, 56%)",
  "hsl(218, 78%, 54%)",
  "hsl(208, 86%, 46%)",
  "hsl(222, 75%, 58%)",
  "hsl(202, 90%, 44%)",
  "hsl(225, 72%, 60%)",
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card rounded-lg p-3 text-xs border border-border shadow-lg">
      <p className="font-semibold text-foreground mb-1">{label || payload[0]?.payload?.name}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: <span className="font-mono font-bold">{typeof p.value === 'number' ? p.value.toFixed(1) : p.value}</span>
        </p>
      ))}
    </div>
  );
};

export const TopBanksChart = ({ month }: { month: MonthKey }) => {
  const combined = getCombinedScores(month);
  const top10 = combined.slice(0, 10);

  return (
    <motion.div
      className="glass-card rounded-xl p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h3 className="text-lg font-bold text-foreground mb-4">TOP 10 bank</h3>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={top10} layout="vertical" margin={{ left: 10, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis type="number" domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
          <YAxis type="category" dataKey="name" width={140} tick={{ fill: "hsl(var(--foreground))", fontSize: 10 }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="finalScore" name="Yakuniy ball" radius={[0, 6, 6, 0]}>
            {top10.map((_entry, i) => (
              <Cell key={i} fill={BLUE_PALETTE[i]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export const GPvsASChart = ({ month }: { month: MonthKey }) => {
  const combined = getCombinedScores(month);
  const chartData = combined
    .filter(b => b.gpScore > 0 && b.asScore > 0)
    .sort((a, b) => b.finalScore - a.finalScore)
    .slice(0, 10)
    .map(b => ({
      name: b.name,
      fullName: b.name,
      gp: Number(b.gpScore.toFixed(1)),
      as: Number(b.asScore.toFixed(1)),
    }));

  return (
    <motion.div
      className="glass-card rounded-xl p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
         Platformalar kesimida qiyosiy tahlil
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ bottom: 80, left: 5, right: 5, top: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            type="category"
            dataKey="name"
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 9 }}
            angle={-45}
            textAnchor="end"
            interval={0}
            height={80}
          />
          <YAxis
            type="number"
            domain={[0, 100]}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
          />
          <Tooltip content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const data = payload[0]?.payload;
            return (
              <div className="bg-card rounded-lg p-3 text-xs border border-border shadow-lg">
                <p className="font-semibold text-foreground mb-1">{data?.fullName}</p>
                <p style={{ color: "hsl(210, 90%, 55%)" }}>
                  Google Play: <span className="font-mono font-bold">{data?.gp}</span>
                </p>
                <p style={{ color: "hsl(280, 65%, 55%)" }}>
                  App Store: <span className="font-mono font-bold">{data?.as}</span>
                </p>
              </div>
            );
          }} />
          <Bar dataKey="gp" name="Google Play" fill="hsl(210, 90%, 55%)" radius={[4, 4, 0, 0]} barSize={16} />
          <Bar dataKey="as" name="App Store" fill="hsl(280, 65%, 55%)" radius={[4, 4, 0, 0]} barSize={16} />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-6 mt-2 text-sm">
        <span className="flex items-center gap-1.5">
          <GPIcon className="w-4 h-4" />
          Google Play
        </span>
        <span className="flex items-center gap-1.5">
          <ASIcon className="w-4 h-4" />
          App Store
        </span>
      </div>
    </motion.div>
  );
};

export const CategoryCompareChart = ({ month }: { month: MonthKey }) => {
  const combined = getCombinedScores(month);
  const xususiy = combined.filter(b => b.category === "Xususiy bank");
  const davlat = combined.filter(b => b.category === "Davlat banki");

  const avgXususiy = xususiy.reduce((s, b) => s + b.finalScore, 0) / (xususiy.length || 1);
  const avgDavlat = davlat.reduce((s, b) => s + b.finalScore, 0) / (davlat.length || 1);

  const avgGPX = xususiy.reduce((s, b) => s + b.gpScore, 0) / (xususiy.length || 1);
  const avgGPD = davlat.reduce((s, b) => s + b.gpScore, 0) / (davlat.length || 1);
  const avgASX = xususiy.reduce((s, b) => s + b.asScore, 0) / (xususiy.length || 1);
  const avgASD = davlat.reduce((s, b) => s + b.asScore, 0) / (davlat.length || 1);
  const avgActX = xususiy.reduce((s, b) => s + b.activityScore, 0) / (xususiy.length || 1);
  const avgActD = davlat.reduce((s, b) => s + b.activityScore, 0) / (davlat.length || 1);

  const radarData = [
    { metric: "Google Play", xususiy: avgGPX, davlat: avgGPD },
    { metric: "App Store", xususiy: avgASX, davlat: avgASD },
    { metric: "Faollik", xususiy: avgActX, davlat: avgActD },
    { metric: "Yakuniy ball", xususiy: avgXususiy, davlat: avgDavlat },
  ];

  return (
    <motion.div
      className="glass-card rounded-xl p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h3 className="text-lg font-bold text-foreground mb-4">Davlat va xususiy banklarning qiyosiy tahlili</h3>
      <ResponsiveContainer width="100%" height={280}>
        <RadarChart data={radarData}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis dataKey="metric" tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }} />
          <PolarRadiusAxis domain={[0, 100]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
          <Radar name="Davlat" dataKey="davlat" stroke="hsl(160, 70%, 45%)" fill="hsl(160, 70%, 45%)" fillOpacity={0.2} />
          <Radar name="Xususiy" dataKey="xususiy" stroke="hsl(210, 90%, 55%)" fill="hsl(210, 90%, 55%)" fillOpacity={0.2} />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-6 mt-2 text-sm">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full" style={{ background: "hsl(160, 70%, 45%)" }} /> Davlat</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full" style={{ background: "hsl(210, 90%, 55%)" }} /> Xususiy</span>
      </div>
    </motion.div>
  );
};
