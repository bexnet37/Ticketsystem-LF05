"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Shield, Zap, Code2, TerminalSquare, FileText, Component } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "OOP Architektur",
      desc: "Strikte Datenkapselung und 3-Schichten-Modell (GUI, Logic, Model)",
      icon: Component,
      color: "text-blue-500",
      href: "/architecture",
    },
    {
      title: "CLI & GUI",
      desc: "Nahtloser Wechsel zwischen CustomTkinter Oberfläche und Terminal.",
      icon: TerminalSquare,
      color: "text-purple-500",
      href: "/cli",
    },
    {
      title: "Algorithmen",
      desc: "Effiziente Sortier- und Suchfunktionen sowie Statistiken.",
      icon: Zap,
      color: "text-yellow-500",
      href: "/algorithms",
    },
  ];

  return (
    <div className="space-y-12 pt-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium text-sm border border-blue-500/20 mb-4">
          <Shield className="h-4 w-4" />
          <span>Python Ticket Management System 1.0</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white">
          Code Dokumentation <br/>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
            next generation.
          </span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Willkommen im interaktiven Developer Dashboard für das Ticketsystem LF05. 
          Entdecke UML-Diagramme, Datenstrukturen und den kompletten Source Code in Echtzeit.
        </p>
      </motion.div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
        {features.map((feature, i) => (
          <Link href={feature.href} key={feature.title}>
            <GlassCard title={feature.title} delay={0.2 + i * 0.1} className="h-full cursor-pointer hover:border-blue-500/30 transition-all">
              <div className="flex flex-col gap-4">
                <div className={`p-3 rounded-xl bg-slate-100 dark:bg-white/5 w-fit ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>

      {/* Stats or secondary info */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: "Python Files", val: "4" },
          { label: "Classes", val: "3" },
          { label: "Lines of Code", val: "1.2k+" },
          { label: "Dependencies", val: "3" },
        ].map((stat) => (
          <div key={stat.label} className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-black/20 text-center backdrop-blur-sm">
            <div className="text-3xl font-bold text-slate-900 dark:text-white mb-1">{stat.val}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
