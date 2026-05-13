"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import Image from "next/image";

export default function UMLPage() {
  return (
    <div className="space-y-8 pt-8 pb-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-4xl font-bold tracking-tight">System Diagramme</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
          Hier findest du alle für die Schulabgabe geforderten Diagramme. Diese veranschaulichen 
          die Architektur, den Ablauf und die Anwendungsfälle des Ticket-Management-Systems.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <GlassCard title="1. Klassendiagramm">
          <p className="mb-4 text-sm text-slate-500">
            Zeigt die statische Struktur des Systems und die Beziehungen der drei Hauptklassen (TicketSystem, FileManager, Ticket).
          </p>
          <div className="relative w-full h-[500px] bg-white rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 p-4 flex items-center justify-center">
            <Image 
              src="/bilder diagramme/Bild (1).png" 
              alt="Klassendiagramm" 
              fill
              className="object-contain"
            />
          </div>
        </GlassCard>

        <GlassCard title="2. Programmablaufplan (Aktivitätsdiagramm)">
          <p className="mb-4 text-sm text-slate-500">
            Visualisiert den Ablauf bei der Interaktion mit der GUI, vom Starten bis zum Speichern eines Tickets.
          </p>
          <div className="relative w-full h-[600px] bg-white rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 p-4 flex items-center justify-center">
            <Image 
              src="/bilder diagramme/Bild (2).png" 
              alt="Programmablaufplan" 
              fill
              className="object-contain"
            />
          </div>
        </GlassCard>

        <GlassCard title="3. Anwendungsfalldiagramm (Use Case)">
          <p className="mb-4 text-sm text-slate-500">
            Zeigt die Akteure (Kunde, Admin, 1st-Level-Support, Führungsebene) und ihre Berechtigungen im System.
          </p>
          <div className="relative w-full h-[600px] bg-white rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 p-4 flex items-center justify-center">
            <Image 
              src="/bilder diagramme/Bild (4).png" 
              alt="Anwendungsfalldiagramm" 
              fill
              className="object-contain"
            />
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
