# Ticketsystem LF05

![Ticketsystem LF05](ticketsystem-webdocs/public/bilder%20diagramme/Bild%20(1).png)

Ein modernes, leichtgewichtiges Ticket-Management-System, das speziell für Unternehmen und Support-Teams entwickelt wurde. Dieses Projekt wurde nach den Prinzipien der **Objektorientierten Programmierung (OOP)** in Python entwickelt und nutzt eine 3-Schichten-Architektur (MVC/GUI-Data-Model). 

Zusätzlich beinhaltet das Repository eine voll funktionsfähige, interaktive **Web-Dokumentation** basierend auf Next.js 16 und TailwindCSS v4, welche die Architektur, Algorithmen und das Entwicklerteam präsentiert.

---

## 🌟 Kernfeatures

- **GUI & CLI:** Volle Kontrolle durch eine moderne grafische Oberfläche (Tkinter + CustomTkinter) oder eine blitzschnelle Kommandozeile (`cli.py`).
- **Objektorientiert (OOP):** Saubere Datenkapselung durch Getter/Setter-Methoden und strikte Trennung von Logik (`DataManager`) und UI.
- **CSV-Persistenz:** Keine externe Datenbank nötig. Alle Tickets, Mitarbeiter, Firmen und Support-Historien werden in CSV-Dateien gespeichert.
- **Fuzzy-Search:** Smarte Suchfunktion, die in Echtzeit Titel, Beschreibungen, IDs, Prioritäten und Mitarbeiter durchsucht.
- **Statistiken & Sortierung:** Prioritäten-Tracking, Sortierfunktionen auf Spalten-Ebene und visuelle Fälligkeitswarnungen (z.B. farbige Überfälligkeit).
- **Web-Docs:** Eine "Silicon Valley"-style Präsentations-Website, um die Systemarchitektur visuell greifbar zu machen.

---

## 📂 Projektstruktur

Dieses Repository enthält den vollständigen Quellcode:

- `main.py` - Das Herzstück des Systems (Enthält die `Ticket` Klasse, `DataManager` und `TicketSystemGUI`).
- `cli.py` - Die Kommandozeilen-Version, ideal für SSH- oder Serverumgebungen.
- `test_ticket_system.py` - Modultests (Unit Tests), um die Integrität der Berechnungslogik zu verifizieren.
- `*.csv` Dateien - Die lokalen Datenbankspeicher für Tickets, Mitarbeiter und Firmen.
- `ticketsystem-webdocs/` - Der Quellcode für die Next.js Web-Dokumentations-Plattform.

---

## 🚀 Installation & Start

### Python Ticket System
1. **Voraussetzungen:** Python 3.10+
2. **Abhängigkeiten installieren:**
   \`\`\`bash
   pip install customtkinter tkcalendar
   \`\`\`
3. **App starten:**
   - **Als GUI:** `python main.py`
   - **Als CLI:** `python cli.py`

### Web-Dokumentation (Next.js)
Die Web-Dokumentation wurde mit React/Next.js erstellt.
1. **Voraussetzungen:** Node.js (v18+)
2. **Setup:**
   \`\`\`bash
   cd ticketsystem-webdocs
   npm install
   npm run dev
   \`\`\`
3. Öffne `http://localhost:3000` in deinem Browser.

---

## 🧠 Architektur (3-Schichten-Modell)

Das Projekt nutzt strikte OOP-Regeln:
1. **Daten-Klasse (`Ticket`):** Speichert die Attribute privat (`__ticket_id`) und gewährt nur über Getter/Setter-Methoden kontrollierten Zugriff.
2. **Logik-Schicht (`DataManager`):** Verarbeitet die Daten, führt Suchalgorithmen durch, berechnet Statistiken und serialisiert die Objekte für die CSV-Speicherung.
3. **Präsentations-Schicht (`TicketSystemGUI` / `CLI`):** Übernimmt die Ein- und Ausgaben. Sie enthält keinerlei Datenlogik, sondern ruft nur Methoden des `DataManagers` auf.

---

## 👨‍💻 Das Team (Ticketsystem LF05)

Entwickelt von:
- **Bennet** (Lead Architektur & UI)
- **Jason** (Data Management & Testing)
- **Timothy** (Dokumentation & UML)

---

## 📜 Lizenz

Dieses Projekt steht unter der **MIT License**. Es ist Open Source und darf frei verwendet, kopiert, modifiziert und kommerziell genutzt werden. Siehe [LICENSE](LICENSE) Datei für weitere Details.
