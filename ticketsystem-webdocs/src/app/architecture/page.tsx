"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { MermaidViewer } from "@/components/MermaidViewer";

const umlClassDiagram = `
classDiagram
    class Ticket {
        -String ticket_id
        -String title
        -String text
        -String priority
        -String due_date
        -String assigned_to
        -String status
        +get_ticket_id() String
        +get_title() String
        +set_title(String)
        +to_list() List
    }
    
    class DataManager {
        -String csv_file
        -String employees_file
        +load_tickets() List~Ticket~
        +save_tickets(List~Ticket~)
        +search_tickets(String keyword) List~Ticket~
        +calculate_priority_stats() Dictionary
    }
    
    class TicketSystemGUI {
        -DataManager data_manager
        +setup_modern_gui()
        +save_ticket()
        +update_ticket_list()
        +run()
    }
    
    TicketSystemGUI --> DataManager : "benutzt (Dependency)"
    DataManager --> Ticket : "verwaltet (1 to N)"
`;

export default function ArchitecturePage() {
  return (
    <div className="space-y-8 pt-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-4xl font-bold tracking-tight">Software Architektur</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
          Das Projekt "Ticketsystem LF05" basiert auf einer strikten 3-Schichten-Architektur (MVC-ähnlich), 
          wobei die Daten streng gekapselt sind. Dies sorgt für hohe Wartbarkeit und Sicherheit.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard title="Die 3-Schichten-Architektur">
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold shrink-0">1</div>
              <div>
                <strong className="block text-slate-900 dark:text-white">Präsentationsschicht (GUI / View)</strong>
                Die Klasse <code>TicketSystemGUI</code> kümmert sich ausschließlich um die Darstellung via CustomTkinter. Sie hält keine Daten, sondern kommuniziert nur mit dem DataManager.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center font-bold shrink-0">2</div>
              <div>
                <strong className="block text-slate-900 dark:text-white">Logikschicht (Controller / Manager)</strong>
                Die Klasse <code>DataManager</code> ist das Gehirn. Sie übernimmt Berechnungen, Sortierungen und das Speichern/Laden von der Festplatte.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center font-bold shrink-0">3</div>
              <div>
                <strong className="block text-slate-900 dark:text-white">Datenmodellschicht (Model)</strong>
                Die Klasse <code>Ticket</code> speichert als rein passives Objekt die eigentlichen Daten im Arbeitsspeicher (mit streng privaten Attributen).
              </div>
            </li>
          </ul>
        </GlassCard>

        <GlassCard title="UML-Klassendiagramm">
          <p className="text-sm text-slate-500 mb-4">
            Interaktives Mermaid-Diagramm. Die Abhängigkeiten zeigen, wie die GUI den Manager aufruft, 
            und der Manager die Ticket-Objekte verwaltet.
          </p>
          <MermaidViewer chart={umlClassDiagram} />
        </GlassCard>
      </div>
    </div>
  );
}
