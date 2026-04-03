import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScoreGauge } from "./ScoreGauge";
import { CombinedBankScore } from "@/data/bankData";
import { motion } from "framer-motion";
import { Users, Star, Download, MessageSquare } from "lucide-react";

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

interface BankDetailModalProps {
  bank: CombinedBankScore | null;
  open: boolean;
  onClose: () => void;
}

const StatCard = ({ icon: Icon, label, value }: { icon: any; label: string; value: string | number }) => (
  <div className="glass-card rounded-lg p-3 flex items-center gap-3">
    <div className="p-2 rounded-md bg-primary/10">
      <Icon className="w-4 h-4 text-primary" />
    </div>
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold font-mono text-foreground">{typeof value === "number" ? value.toLocaleString() : value}</p>
    </div>
  </div>
);

const RatingBar = ({ stars, count, total, delay }: { stars: number; count: number; total: number; delay: number }) => (
  <div className="flex items-center gap-2 text-xs">
    <span className="w-3 text-muted-foreground font-mono">{stars}</span>
    <Star className="w-3 h-3 text-accent fill-accent" />
    <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-accent"
        initial={{ width: 0 }}
        animate={{ width: `${total > 0 ? (count / total) * 100 : 0}%` }}
        transition={{ duration: 0.6, delay }}
      />
    </div>
    <span className="w-16 text-right text-muted-foreground font-mono">{count.toLocaleString()}</span>
  </div>
);

export const BankDetailModal = ({ bank, open, onClose }: BankDetailModalProps) => {
  if (!bank) return null;

  const gp = bank.gpData;
  const as = bank.asData;

  const gpRatings = gp ? [gp.ratings.five, gp.ratings.four, gp.ratings.three, gp.ratings.two, gp.ratings.one] : [];
  const asRatings = as ? [as.rating5, as.rating4, as.rating3, as.rating2, as.rating1] : [];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span className="text-xl font-bold text-foreground">{bank.name}</span>
            <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
              {bank.category}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex justify-center gap-6 py-4 flex-wrap">
          <ScoreGauge score={bank.gpScore} label={<span className="inline-flex items-center gap-1"><GPIcon className="w-4 h-4" /> Google Play</span>} delay={0.1} />
          <ScoreGauge score={bank.asScore} label={<span className="inline-flex items-center gap-1"><ASIcon className="w-4 h-4" /> App Store</span>} delay={0.2} />
          <ScoreGauge score={bank.activityScore} label="Faollik" delay={0.3} />
          <ScoreGauge score={bank.finalScore} label="Yakuniy ball" delay={0.4} />
        </div>

        {gp && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground">
              <GPIcon className="w-4 h-4" />
              Google Play
              <span className="text-xs text-muted-foreground font-mono">— {gp.appId}</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <StatCard icon={Users} label="Jami baholovchilar" value={gp.totalRaters} />
              <StatCard icon={Users} label="Oylik baholovchilar" value={gp.lastMonthRaters} />
              <StatCard icon={Star} label="Google Playdagi baho" value={gp.averageRating} />
              <StatCard icon={MessageSquare} label="Oylik izohlar" value={gp.lastMonthComments} />
              <StatCard icon={Download} label="Oylik yuklab olishlar" value={gp.lastMonthDownloads} />
            </div>
            <div className="glass-card rounded-lg p-3 space-y-1.5">
              <p className="text-xs text-muted-foreground mb-2">Baholar taqsimoti</p>
              {gpRatings.map((count, i) => (
                <RatingBar key={i} stars={5 - i} count={count} total={gp.totalRaters} delay={0.1 * i} />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="glass-card rounded-lg p-2 text-center">
                <p className="text-xs text-muted-foreground">Gorizontal ball</p>
                <p className="text-sm font-bold font-mono text-foreground">{gp.horizontalScore}</p>
              </div>
              <div className="glass-card rounded-lg p-2 text-center">
              <p className="text-xs text-muted-foreground">Vertikal ball</p>
                <p className="text-sm font-bold font-mono text-foreground">{gp.verticalScorePercent}</p>
              </div>
              <div className="glass-card rounded-lg p-2 text-center">
                <p className="text-xs text-muted-foreground">Faollik ball</p>
                <p className="text-sm font-bold font-mono text-foreground">{gp.activityScore}</p>
              </div>
            </div>
          </div>
        )}

        {as && (
          <div className="space-y-3 mt-4">
            <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground">
              <ASIcon className="w-4 h-4" />
              App Store
              <span className="text-xs text-muted-foreground font-mono">— {as.appId}</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <StatCard icon={Users} label="Jami baholovchilar" value={as.totalRaters} />
              <StatCard icon={Users} label="Oylik baholovchilar" value={as.lastMonthRaters} />
              <StatCard icon={Star} label="App Storedagi baho" value={as.averageRating} />
              <StatCard icon={MessageSquare} label="Oylik izohlar" value={as.lastMonthReviews} />
              <StatCard icon={Download} label="Oylik yuklab olishlar" value={as.lastMonthDownloads} />
            </div>
            <div className="glass-card rounded-lg p-3 space-y-1.5">
              <p className="text-xs text-muted-foreground mb-2">Baholar taqsimoti</p>
              {asRatings.map((count, i) => (
                <RatingBar key={i} stars={5 - i} count={count} total={as.totalRaters} delay={0.1 * i} />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="glass-card rounded-lg p-2 text-center">
                <p className="text-xs text-muted-foreground">Gorizontal ball</p>
                <p className="text-sm font-bold font-mono text-foreground">{as.horizontalScore}</p>
              </div>
              <div className="glass-card rounded-lg p-2 text-center">
              <p className="text-xs text-muted-foreground">Vertikal ball</p>
                <p className="text-sm font-bold font-mono text-foreground">{as.verticalScorePercent}</p>
              </div>
              <div className="glass-card rounded-lg p-2 text-center">
                <p className="text-xs text-muted-foreground">Faollik ball</p>
                <p className="text-sm font-bold font-mono text-foreground">{as.activityScore}</p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
