"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { Globe, Mail, Code2, Layout, Database } from "lucide-react";
import Image from "next/image";

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Bennet",
      role: "Lead Developer & UI/UX",
      bio: "Verantwortlich für die Architektur des Ticket-Systems, die Entwicklung der CustomTkinter GUI und die nahtlose Integration der Datenverwaltung. Fokus auf Clean Code und moderne UI/UX.",
      icon: Layout,
      skills: ["Python", "Tkinter/CustomTkinter", "Software Architektur", "UI/UX Design"],
      imagePlaceholder: "B",
      imagePath: "/Bennet.jpg"
    },
    {
      name: "Jason",
      role: "Backend & Logic Developer",
      bio: "Mastermind hinter der Datenstruktur. Zuständig für das nahtlose Lesen und Schreiben der CSV-Dateien, die Entwicklung der Sortier- und Suchalgorithmen sowie die Anbindung des CLI.",
      icon: Database,
      skills: ["Python", "Data Management", "Algorithms", "CLI Development"],
      imagePlaceholder: "J",
      imagePath: "/jason.jpeg"
    },
    {
      name: "Timmothy",
      role: "Testing & Documentation",
      bio: "Der Qualitäts-Garant des Projekts. Verantwortlich für das Aufsetzen der Unit-Tests in pytest, die Erstellung der finalen Dokumentation und das Feilen an der perfekten Projektpräsentation.",
      icon: Code2,
      skills: ["Python", "Unit Testing", "Documentation", "Quality Assurance"],
      imagePlaceholder: "T",
      imagePath: "/timmothy.jpeg"
    }
  ];

  return (
    <div className="space-y-12 pt-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Das Team hinter Ticketsystem LF05</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Ein Projekt ist immer nur so gut wie die Entwickler dahinter. 
          Hier präsentieren wir die Köpfe, die das Ticket Management System realisiert haben.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <GlassCard title="" className="relative overflow-hidden group h-full flex flex-col">
              {/* Background gradient effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col flex-1">
                {/* Profile Image Placeholder */}
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 p-1 mb-6 shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center border-4 border-slate-900 overflow-hidden relative">
                    <Image src={member.imagePath} alt={member.name} fill className="object-cover" />
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{member.name}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mt-1">{member.role}</p>
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 text-center flex-1">
                  {member.bio}
                </p>

                <div className="mt-auto">
                  <div className="flex items-center gap-2 mb-3 justify-center">
                    <member.icon className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Kernkompetenzen</span>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links (Optional) */}
                <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-white/10">
                  <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <Globe className="w-5 h-5" />
                  </button>
                  <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
