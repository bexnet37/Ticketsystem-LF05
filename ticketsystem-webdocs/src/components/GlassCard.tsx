"use client";

import { motion } from "framer-motion";

interface GlassCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function GlassCard({ title, children, className = "", delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`glass rounded-2xl p-6 shadow-xl ${className}`}
    >
      <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400">
        {title}
      </h3>
      <div className="text-slate-700 dark:text-slate-300">
        {children}
      </div>
    </motion.div>
  );
}
