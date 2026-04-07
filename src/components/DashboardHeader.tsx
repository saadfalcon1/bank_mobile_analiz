import { motion } from "framer-motion";
import { getCombinedScores, getGPData, getASData, MonthKey } from "@/data/bankData";
import { Download, Trophy, Users, Building2 } from "lucide-react";
import logo from "@/components/image/logo.png";

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

export const DashboardHeader = ({ month }: { month: MonthKey }) => {
  const combined = getCombinedScores(month);
  const gpData = getGPData(month);
  const asData = getASData(month);

  const topDownloads = [...gpData].sort((a, b) => b.lastMonthDownloads - a.lastMonthDownloads)[0];
  const topBank = combined[0];

  const totalGPRaters = gpData.reduce((s, b) => s + b.totalRaters, 0);
  const totalASRaters = asData.reduce((s, b) => s + b.totalRaters, 0);
  const totalRaters = totalGPRaters + totalASRaters;

  const stats = [
    {
      icon: Building2,
      label: "Banklar soni",
      value: combined.length.toString(),
      sub: null,
    },
    {
      icon: Users,
      label: "Jami baholagan foydalanuvchilar",
      value: totalRaters.toLocaleString(),
      sub: (
        <span className="flex items-center justify-center gap-4 flex-wrap text-base">
          <span className="inline-flex items-center gap-1.5"><GPIcon className="w-5 h-5" /> {totalGPRaters.toLocaleString()}</span>
          <span className="inline-flex items-center gap-1.5"><ASIcon className="w-5 h-5" /> {totalASRaters.toLocaleString()}</span>
        </span>
      ),
    },
    {
      icon: Download,
      label: "Oylik yuklab olishlar yetakchisi",
      value: topDownloads?.name || "—",
      sub: topDownloads ? <span className="text-base font-mono">{topDownloads.lastMonthDownloads.toLocaleString()}</span> : null,
    },
    {
      icon: Trophy,
      label: "Eng yuqori ball",
      value: topBank?.name || "—",
      sub: topBank ? <span className="text-base font-mono">{topBank.finalScore.toFixed(1)}</span> : null,
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <div className="flex items-center gap-4">
          <img
            src={logo}
            alt="Reyting Agentligi"
            className="h-16 w-auto object-contain flex-shrink-0"
          />
          <h1 className="text-4xl font-bold gradient-text-primary tracking-tight">
            Tijorat banklarining mobil ilovalari tahlili
          </h1>
        </div>
        <p className="text-base text-muted-foreground">
          Google Play va App Store ma'lumotlari asosida
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="glass-card rounded-xl p-5 glow-primary"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * i }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <stat.icon className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
            <p className="text-3xl font-bold text-foreground text-center">{stat.value}</p>
            {stat.sub && (
              <div className="text-base text-muted-foreground font-mono mt-2 text-center">{stat.sub}</div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};