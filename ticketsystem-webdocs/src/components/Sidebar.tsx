"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutDashboard, Component, GitMerge, Users, FileText, Settings, Terminal } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Architektur", href: "/architecture", icon: Component },
  { name: "UML Diagramme", href: "/uml", icon: Component },
  { name: "Algorithmen", href: "/algorithms", icon: GitMerge },
  { name: "Team", href: "/team", icon: Users },
  { name: "Code Dokumentation", href: "/docs", icon: FileText },
  { name: "CLI Modus", href: "/cli", icon: Terminal },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-full glass border-r border-slate-200 dark:border-white/10 flex flex-col relative z-10 hidden md:flex">
      <div className="p-6 flex items-center justify-between">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
          TicketSystem
        </h1>
        <ThemeToggle />
      </div>

      <nav className="flex-1 px-4 mt-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} className="block relative">
              {isActive && (
                <motion.div
                  layoutId="active-nav-indicator"
                  className="absolute inset-0 bg-blue-500/10 dark:bg-blue-500/20 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {isActive && (
                <motion.div
                  layoutId="active-nav-border"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <div
                className={`relative px-4 py-3 flex items-center gap-3 rounded-xl transition-colors ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 font-medium"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              >
                <item.icon className={`h-5 w-5 ${isActive ? "text-blue-500" : ""}`} />
                {item.name}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-6">
        <div className="glass rounded-xl p-4 text-sm text-center text-slate-500 dark:text-slate-400">
          <p>Ticketsystem LF05</p>
          <p className="text-xs mt-1">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
