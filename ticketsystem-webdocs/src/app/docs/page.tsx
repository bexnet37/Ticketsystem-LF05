import fs from "fs";
import path from "path";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { GlassCard } from "@/components/GlassCard";
import { FileText } from "lucide-react";

export default function DocsPage() {
  // Read the markdown file directly from the file system.
  // We assume the Next.js root is inside 'Ticketsystem LF05/ticketsystem-webdocs'
  // So the root project folder is one level up: '..'
  const docsPath = path.join(process.cwd(), "..", "Dokumentation.md");
  let content = "";
  
  try {
    content = fs.readFileSync(docsPath, "utf-8");
  } catch (error) {
    content = "# Dokumentation nicht gefunden\n\nBitte stelle sicher, dass die Datei `Dokumentation.md` im Hauptordner des Projekts liegt.";
  }

  return (
    <div className="space-y-8 pt-8">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium text-sm border border-blue-500/20">
          <FileText className="h-4 w-4" />
          <span>Automatisch generiert aus lokaler Datei</span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Code Dokumentation</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl">
          Diese Seite liest die zentrale <code>Dokumentation.md</code> eures Projekts in Echtzeit aus dem Dateisystem und rendert sie als hochauflösendes Web-Dokument.
        </p>
      </div>

      <GlassCard title="Dokumentation.md" className="max-w-5xl">
        {/* We wrap the markdown in a container with full width */}
        <div className="w-full">
          <MarkdownRenderer content={content} />
        </div>
      </GlassCard>
    </div>
  );
}
