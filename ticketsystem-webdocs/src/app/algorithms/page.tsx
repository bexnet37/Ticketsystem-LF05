"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";

const searchTicketsAlgo = `+-------------------------------------------------------------------+
| Funktion: search_tickets(keyword)                                 |
+-------------------------------------------------------------------+
| tickets = lade alle Tickets aus der CSV (load_tickets)            |
+-------------------------------------------------------------------+
| result = erstelle leere Liste                                     |
+-------------------------------------------------------------------+
| WIEDERHOLE FÜR jedes Ticket 't' in der Liste 'tickets':           |
| +---------------------------------------------------------------+ |
| | IF (keyword in t.title) ODER (keyword in t.text)              | |
| | +-------------------------------+-----------------------------+ |
| | |             TRUE              |            FALSE            | |
| | +-------------------------------+-----------------------------+ |
| | | Füge 't' zur Liste 'result'   | Nichts tun                  | |
| | | hinzu (result.append)         |                             | |
| +-------------------------------+-------------------------------+ |
+-------------------------------------------------------------------+
| RÜCKGABE der Liste 'result' an die aufrufende Funktion            |
+-------------------------------------------------------------------+`;

const priorityStatsAlgo = `+-------------------------------------------------------------------+
| Funktion: calculate_priority_stats()                              |
+-------------------------------------------------------------------+
| tickets = lade alle Tickets aus der CSV                           |
+-------------------------------------------------------------------+
| stats = {"Hoch": 0, "Mittel": 0, "Niedrig": 0} (Wörterbuch)       |
+-------------------------------------------------------------------+
| WIEDERHOLE FÜR jedes Ticket 't' in der Liste 'tickets':           |
| +---------------------------------------------------------------+ |
| | prio = lese Priorität von 't' aus (t.get_priority)            | |
| | +-----------------------------------------------------------+ | |
| | | IF prio existiert bereits im Wörterbuch 'stats'           | | |
| | | +-----------------------------+---------------------------+ | | |
| | | |             TRUE            |           FALSE           | | | |
| | | +-----------------------------+---------------------------+ | | |
| | | | Erhöhe den Zähler für     | Erstelle neuen Eintrag  | | | |
| | | | 'prio' um 1               | für 'prio' mit Wert 1   | | | |
| | | | (stats[prio] += 1)          | (stats[prio] = 1)         | | | |
| | | +-----------------------------+---------------------------+ | | |
| +---------------------------------------------------------------+ |
+-------------------------------------------------------------------+
| RÜCKGABE des Wörterbuchs 'stats'                                  |
+-------------------------------------------------------------------+`;

export default function AlgorithmsPage() {
  return (
    <div className="space-y-8 pt-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-4xl font-bold tracking-tight">Algorithmen & Logik</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
          Hier dokumentieren wir die Kern-Algorithmen der Logikschicht anhand von Struktogrammen (Nassi-Shneiderman).
          Diese visuellen Repräsentationen zeigen die Schleifen und Bedingungen im Python-Code.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8">
        <GlassCard title="1. Such-Algorithmus (search_tickets)">
          <p className="mb-4 text-sm text-slate-500">
            Iteriert über alle Tickets und prüft, ob der Suchbegriff im Titel oder in der Beschreibung vorkommt.
          </p>
          <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
            <pre className="text-sm text-green-400 font-mono whitespace-pre">{searchTicketsAlgo}</pre>
          </div>
        </GlassCard>

        <GlassCard title="2. Statistik-Algorithmus (calculate_priority_stats)">
          <p className="mb-4 text-sm text-slate-500">
            Nutzt ein Dictionary (Wörterbuch), um dynamisch zu zählen, wie viele Tickets welche Priorität besitzen.
          </p>
          <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
            <pre className="text-sm text-blue-400 font-mono whitespace-pre">{priorityStatsAlgo}</pre>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
