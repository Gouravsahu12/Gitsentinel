"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";

interface RepoRiskMeterProps {
  score: number;
  level: string;
  confidence: number;
}

export default function RepoRiskMeter({ score, level, confidence }: RepoRiskMeterProps) {
  const isHigh = level === 'High Risk';
  const isModerate = level === 'Moderate Risk';
  
  const riskColor = isHigh ? 'text-destructive' : isModerate ? 'text-amber-500' : 'text-secondary';
  const riskBg = isHigh ? 'bg-destructive/10' : isModerate ? 'bg-amber-500/10' : 'bg-secondary/10';
  const Icon = isHigh ? ShieldX : isModerate ? ShieldAlert : ShieldCheck;

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <motion.div 
            animate={{ 
              boxShadow: [
                `0 0 20px ${isHigh ? 'rgba(239, 68, 68, 0.2)' : 'rgba(58, 203, 224, 0.2)'}`,
                `0 0 50px ${isHigh ? 'rgba(239, 68, 68, 0.5)' : 'rgba(58, 203, 224, 0.5)'}`,
                `0 0 20px ${isHigh ? 'rgba(239, 68, 68, 0.2)' : 'rgba(58, 203, 224, 0.2)'}`
              ],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className={`p-6 rounded-[2rem] ${riskBg} border border-white/10 relative overflow-hidden`}
          >
            {/* Visual Continuity with Scanner Orb */}
            <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-white to-transparent" />
            <Icon className={`h-12 w-12 ${riskColor} relative z-10`} />
          </motion.div>
          <div>
            <h2 className={`text-4xl font-bold font-headline leading-none tracking-tighter ${riskColor}`}>{level}</h2>
            <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-[0.4em] font-headline opacity-60">Audit Integrity Level</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-6xl font-bold font-headline tracking-tighter ${riskColor} tabular-nums`}>
            {score}<span className="text-lg text-muted-foreground opacity-30">/100</span>
          </div>
          <Badge variant="outline" className="mt-2 border-white/10 text-[9px] font-mono tracking-[0.2em] px-3 bg-white/5">
            CONFIDENCE: {confidence}%
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-[10px] uppercase font-headline tracking-[0.3em] text-muted-foreground/40">
          <span>SAFE_BASELINE</span>
          <span>ELEVATED_ANOMALIES</span>
          <span>CRITICAL_DANGER</span>
        </div>
        <div className="relative h-4 w-full bg-white/5 rounded-full overflow-hidden p-1 border border-white/5 shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 2, ease: "easeOut" }}
            className={`h-full rounded-full ${isHigh ? 'bg-destructive shadow-[0_0_20px_rgba(239,68,68,0.5)]' : isModerate ? 'bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.5)]' : 'bg-secondary shadow-[0_0_20px_rgba(58,203,224,0.5)]'}`} 
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-10">
        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5 group hover:bg-white/10 transition-all cursor-default">
          <span className="text-[10px] text-muted-foreground uppercase font-headline tracking-widest mb-2 block">THREAT DENSITY</span>
          <div className="text-2xl font-bold font-headline tracking-tight text-white">
            {score > 70 ? 'CRITICAL' : score > 30 ? 'ELEVATED' : 'NOMINAL'}
          </div>
        </div>
        <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5 group hover:bg-white/10 transition-all cursor-default">
          <span className="text-[10px] text-muted-foreground uppercase font-headline tracking-widest mb-2 block">SYSTEM TRUST</span>
          <div className="text-2xl font-bold font-headline tracking-tight text-secondary neon-text-secondary">
            {100 - score}%
          </div>
        </div>
      </div>
    </div>
  );
}
