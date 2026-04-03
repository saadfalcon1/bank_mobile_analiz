import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { TopBanksChart, GPvsASChart, CategoryCompareChart } from "@/components/DashboardCharts";
import { BankTable } from "@/components/BankTable";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MonthKey, months } from "@/data/bankData";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const Index = () => {
  const [month, setMonth] = useState<MonthKey>("march");

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Oy filtri va tema tugmasi */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Davr:</span>
          <div className="flex gap-1">
            {months.map((m) => (
              <button
                key={m.key}
                onClick={() => setMonth(m.key)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  month === m.key
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "glass-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>
        <ThemeToggle />
      </motion.div>

      <DashboardHeader month={month} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TopBanksChart month={month} />
        <GPvsASChart month={month} />
      </div>

      <div className="grid grid-cols-1">
        <CategoryCompareChart month={month} />
      </div>

      <div>
        <h2 className="text-xl font-bold text-foreground mb-3">Batafsil jadval</h2>
        <BankTable month={month} />
      </div>
    </div>
  );
};

export default Index;
