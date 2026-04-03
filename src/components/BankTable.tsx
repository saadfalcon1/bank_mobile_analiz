import { useState } from "react";
import { getCombinedScores, CombinedBankScore, MonthKey } from "@/data/bankData";
import { ScoreBar } from "./ScoreBar";
import { BankDetailModal } from "./BankDetailModal";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

const GPIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none">
    <path d="M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594z" fill="#EA4335"/>
    <path d="M14.584 12.023l3.543-3.521-10.9-6.192a1.49 1.49 0 0 0-1.588.074l8.945 9.639z" fill="#FBBC04"/>
    <path d="M14.584 12.023l-8.945 9.639a1.49 1.49 0 0 0 1.588.074l10.9-6.192-3.543-3.521z" fill="#34A853"/>
    <path d="M5.639 2.384A1.49 1.49 0 0 0 5.1 3.497v17.006a1.49 1.49 0 0 0 .539 1.113l8.945-9.639-8.945-9.593z" fill="#4285F4"/>
  </svg>
);

const ASIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" className="text-muted-foreground"/>
  </svg>
);

type SortKey = "finalScore" | "gpScore" | "asScore" | "activityScore" | "name";

export const BankTable = ({ month }: { month: MonthKey }) => {
  const [selectedBank, setSelectedBank] = useState<CombinedBankScore | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("finalScore");
  const [sortAsc, setSortAsc] = useState(false);

  const data = getCombinedScores(month).sort((a, b) => {
    const mul = sortAsc ? 1 : -1;
    if (sortKey === "name") return mul * a.name.localeCompare(b.name);
    return mul * ((a[sortKey] as number) - (b[sortKey] as number));
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(false); }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return null;
    return sortAsc ? <ChevronUp className="w-3 h-3 inline" /> : <ChevronDown className="w-3 h-3 inline" />;
  };

  return (
    <>
      <motion.div
        className="glass-card rounded-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 text-xs text-muted-foreground font-medium w-10">№</th>
                <th
                  className="text-left p-3 text-xs text-muted-foreground font-medium cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort("name")}
                >
                  Bank nomi <SortIcon col="name" />
                </th>
                <th className="text-left p-3 text-xs text-muted-foreground font-medium">Turi</th>
                <th
                  className="text-center p-3 text-xs text-muted-foreground font-medium cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort("gpScore")}
                >
                  <span className="inline-flex items-center gap-1">
                    <GPIcon />
                    Google Play <SortIcon col="gpScore" />
                  </span>
                </th>
                <th
                  className="text-center p-3 text-xs text-muted-foreground font-medium cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort("asScore")}
                >
                  <span className="inline-flex items-center gap-1">
                    <ASIcon />
                    App Store <SortIcon col="asScore" />
                  </span>
                </th>
                <th
                  className="text-center p-3 text-xs text-muted-foreground font-medium cursor-pointer hover:text-foreground transition-colors"
                  onClick={() => handleSort("activityScore")}
                >
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                    Faollik <SortIcon col="activityScore" />
                  </span>
                </th>
                <th
                  className="text-center p-3 text-xs text-muted-foreground font-medium cursor-pointer hover:text-foreground transition-colors min-w-[160px]"
                  onClick={() => handleSort("finalScore")}
                >
                  Yakuniy ball <SortIcon col="finalScore" />
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((bank, i) => (
                <motion.tr
                  key={bank.name}
                  className="border-b border-border/50 cursor-pointer hover:bg-secondary/50 transition-colors"
                  onClick={() => setSelectedBank(bank)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.02 * i }}
                >
                  <td className="p-3 font-mono text-xs text-muted-foreground">
                    {i + 1}
                  </td>
                  <td className="p-3 font-semibold text-foreground text-xs">
                    {bank.name}
                  </td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      bank.category === "Davlat banki" ? "bg-accent/15 text-accent" : "bg-primary/15 text-primary"
                    }`}>
                      {bank.category === "Davlat banki" ? "Davlat" : "Xususiy"}
                    </span>
                  </td>
                  <td className="p-3 text-center font-mono text-xs font-semibold text-foreground">
                    {bank.gpScore > 0 ? bank.gpScore.toFixed(1) : "—"}
                  </td>
                  <td className="p-3 text-center font-mono text-xs font-semibold text-foreground">
                    {bank.asScore > 0 ? bank.asScore.toFixed(1) : "—"}
                  </td>
                  <td className="p-3 text-center font-mono text-xs font-semibold text-amber-400">
                    {bank.activityScore > 0 ? bank.activityScore.toFixed(1) : "—"}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <ScoreBar score={bank.finalScore} delay={0.02 * i} />
                      <span className="font-mono text-xs font-bold text-foreground w-10 text-right">
                        {bank.finalScore.toFixed(1)}
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <BankDetailModal bank={selectedBank} open={!!selectedBank} onClose={() => setSelectedBank(null)} />
    </>
  );
};
