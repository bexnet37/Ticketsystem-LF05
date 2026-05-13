"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Terminal } from "lucide-react";

export default function CliPage() {
  const cliOutput = `==============================
Ticket Management System - CLI
==============================
1. Alle Tickets anzeigen
2. Ticket suchen
3. Neues Ticket einfuegen
4. Ticket aendern
5. Ticket loeschen
6. Statistik anzeigen
0. Programm beenden
==============================
Bitte waehlen Sie eine Option: `;

  return (
    <div className="space-y-8 pt-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-4xl font-bold tracking-tight">CLI Modus</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
          Neben der modernen grafischen Oberfläche bietet unser System eine leichtgewichtige 
          Kommandozeilen-Schnittstelle (CLI). Sie nutzt exakt dieselbe Logikschicht (DataManager).
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard title="Warum ein CLI?">
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <Terminal className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Geschwindigkeit:</strong> Erfahrene Administratoren können Tickets via Tastatur 
                schneller verwalten als per Maus.
              </p>
            </li>
            <li className="flex items-start gap-3">
              <Terminal className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Server-Umgebungen:</strong> Das CLI funktioniert auch auf Linux-Servern ohne 
                grafische Oberfläche (z.B. per SSH).
              </p>
            </li>
            <li className="flex items-start gap-3">
              <Terminal className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
              <p className="text-slate-700 dark:text-slate-300">
                <strong>Architektur-Beweis:</strong> Da CLI und GUI denselben <code>DataManager</code> 
                benutzen, beweist dies die erfolgreiche Entkopplung von View und Model.
              </p>
            </li>
          </ul>
        </GlassCard>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative h-full bg-black rounded-2xl p-6 ring-1 ring-white/10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs text-slate-500 ml-2 font-mono">cli.py</span>
            </div>
            <pre className="text-green-400 font-mono text-sm leading-relaxed whitespace-pre-wrap">
              {cliOutput}
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
              >
                _
              </motion.span>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
