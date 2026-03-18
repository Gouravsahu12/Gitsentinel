"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Shield, Users, GitBranch, History, ChevronRight, AlertTriangle, CheckCircle2, Share2, Download } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import RepoRiskMeter from "@/components/dashboard/RepoRiskMeter";
import AnomaliesTimeline from "@/components/dashboard/AnomaliesTimeline";
import ContributionNetworkWrapper from "@/components/dashboard/ContributionNetworkWrapper";
import type { RepoAnalysisData } from "@/lib/mock-data";
import type { AnalyzeRepositoryOutput } from "@/ai/flows/analyze-repository-behavior";

interface RepoDashboardContentProps {
  owner: string;
  name: string;
  rawData: RepoAnalysisData;
  analysis: AnalyzeRepositoryOutput;
}

export default function RepoDashboardContent({ owner, name, rawData, analysis }: RepoDashboardContentProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen p-4 md:p-10 space-y-10 bg-[#050608] selection:bg-primary/30"
    >
      {/* Immersive Header */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 glass-panel p-8 rounded-[2.5rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32" />
        <div className="flex items-center gap-6 relative z-10">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="p-5 bg-white/5 rounded-2xl border border-white/10 shadow-inner"
          >
            <Github className="h-10 w-10 text-white" />
          </motion.div>
          <div>
            <div className="flex items-center gap-3 text-sm font-mono text-muted-foreground mb-2">
              <span className="hover:text-primary transition-colors cursor-pointer">{owner}</span>
              <ChevronRight className="h-4 w-4 text-white/20" />
              <span className="text-white font-bold tracking-tight uppercase">{name}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter text-white">
              ANALYTICAL <span className="text-secondary italic">CORE</span>
            </h1>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 relative z-10">
          <Link href="/">
            <Button variant="outline" className="h-12 px-6 rounded-xl border-white/10 glass-card font-headline text-xs tracking-widest">
              NEW SCAN
            </Button>
          </Link>
          <Button variant="outline" className="h-12 w-12 p-0 rounded-xl border-white/10 glass-card">
            <Share2 className="h-5 w-5" />
          </Button>
          <Button className="h-12 px-8 rounded-xl bg-primary glow-primary font-headline text-xs tracking-widest">
            <Download className="h-4 w-4 mr-2" /> EXPORT REPORT
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Core - Visualization & Metrics */}
        <div className="lg:col-span-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Activity Baseline", value: rawData.last90DaysMetrics.averageCommitsPerDay, sub: `vs ${rawData.baselines.avgCommitFrequency} avg`, icon: History, color: "text-secondary" },
              { label: "New Trust Nodes", value: rawData.last90DaysMetrics.newContributors, sub: "New contributors (90d)", icon: Users, color: "text-primary" },
              { label: "Anomaly Density", value: rawData.sensitiveChanges.length, sub: "High-risk signals detected", icon: Shield, color: "text-white" }
            ].map((stat, i) => (stat.label === "Activity Baseline" ? (
              <motion.div 
                key={i} 
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-panel p-6 rounded-3xl border-none shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-headline uppercase text-muted-foreground tracking-[0.2em]">{stat.label}</span>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold font-headline text-white mb-2">
                  {stat.value} <span className="text-xs font-normal text-muted-foreground">{stat.sub}</span>
                </div>
                <Badge variant="outline" className={`border-none ${rawData.last90DaysMetrics.averageCommitsPerDay > rawData.baselines.avgCommitFrequency * 2 ? 'bg-destructive/10 text-destructive' : 'bg-secondary/10 text-secondary'} rounded-lg px-3 py-1 text-[9px] font-headline tracking-widest`}>
                  {rawData.last90DaysMetrics.averageCommitsPerDay > rawData.baselines.avgCommitFrequency * 2 ? 'ANOMALOUS_BURST' : 'NOMINAL_FLOW'}
                </Badge>
              </motion.div>
            ) : (
              <motion.div 
                key={i} 
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-panel p-6 rounded-3xl border-none shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-headline uppercase text-muted-foreground tracking-[0.2em]">{stat.label}</span>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold font-headline text-white mb-1">{stat.value}</div>
                <p className="text-[10px] text-muted-foreground tracking-tight">{stat.sub}</p>
              </motion.div>
            )))}
          </div>

          <Card className="glass-panel border-none rounded-[2.5rem] overflow-hidden shadow-2xl">
            <CardHeader className="p-8">
              <CardTitle className="flex items-center gap-3 text-2xl font-headline tracking-tighter">
                <GitBranch className="h-7 w-7 text-secondary" />
                CONTRIBUTOR TOPOLOGY
              </CardTitle>
              <CardDescription className="text-muted-foreground/60 text-sm italic">Deep graph visualization of neural interactions between ecosystem participants.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 border-t border-white/5">
              <ContributionNetworkWrapper />
            </CardContent>
          </Card>

          <Card className="glass-panel border-none rounded-[2.5rem] shadow-2xl">
            <CardHeader className="p-8">
              <CardTitle className="flex items-center gap-3 text-2xl font-headline tracking-tighter">
                <AlertTriangle className="h-7 w-7 text-primary" />
                SIGNAL LOG
              </CardTitle>
              <CardDescription className="text-muted-foreground/60 text-sm italic">Sequential audit of detected behavioral anomalies across the repository lifecycle.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <AnomaliesTimeline events={analysis.suspiciousEventsTimeline} />
            </CardContent>
          </Card>
        </div>

        {/* Right Rail - Risk Assessment & Intelligence */}
        <div className="lg:col-span-4 space-y-10">
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
            <Card className="glass-panel border-none p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-gradient-to-b from-card/60 to-card/20">
              <RepoRiskMeter 
                score={analysis.overallRiskScore} 
                level={analysis.riskLevel} 
                confidence={analysis.confidenceScore} 
              />
            </Card>
          </motion.div>

          <Card className="glass-panel border-none rounded-[2.5rem] shadow-2xl">
            <CardHeader className="p-8">
              <CardTitle className="text-xl font-headline flex items-center gap-3 tracking-tighter">
                <Users className="h-6 w-6 text-primary" />
                NODE TRUST MATRIX
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0 space-y-6">
              {rawData.contributors.map((c, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-12 w-12 border-2 border-white/10">
                        <AvatarImage src={`https://picsum.photos/seed/${c.username}/100/100`} />
                        <AvatarFallback className="bg-muted text-lg">{c.username[0]}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background ${c.trustScore > 80 ? 'bg-secondary' : 'bg-amber-500'}`} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white mb-1">{c.username}</div>
                      <div className="text-[10px] text-muted-foreground font-mono tracking-tighter">{c.historySummary}</div>
                    </div>
                  </div>
                  <div className={`text-xl font-bold font-headline ${c.trustScore > 80 ? 'text-secondary neon-text-secondary' : c.trustScore > 40 ? 'text-amber-500' : 'text-destructive'}`}>
                    {c.trustScore}%
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass-panel border-none rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <CheckCircle2 className="h-24 w-24 text-secondary" />
            </div>
            <CardHeader className="p-8">
              <CardTitle className="text-xl font-headline flex items-center gap-3 tracking-tighter text-secondary">
                <CheckCircle2 className="h-6 w-6" />
                RECOMMENDED ACTIONS
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <ul className="space-y-4">
                {analysis.recommendedActions.map((action, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-start gap-4 text-sm text-muted-foreground group leading-relaxed"
                  >
                    <span className="h-6 w-6 rounded-lg bg-white/5 flex items-center justify-center text-[10px] text-white font-mono shrink-0 group-hover:bg-secondary group-hover:text-black transition-colors border border-white/10">
                      0{i + 1}
                    </span>
                    {action}
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
