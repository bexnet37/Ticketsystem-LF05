# Ticket-Management-System: Verwaltet Support-Tickets mit Tkinter-GUI und CSV-Speicher
# Nutzt Klassen mit Datenkapselung für sichere Daten und wartbaren Code

import tkinter as tk
from tkinter import messagebox, filedialog, ttk
import customtkinter as ctk
from tkcalendar import Calendar
import csv
import os
import random
from datetime import datetime

# CustomTkinter initialisieren
ctk.set_appearance_mode("dark")
ctk.set_default_color_theme("blue")

class Ticket:
    def __init__(self, ticket_id, title, text, priority, due_date, assigned_to, request_date, reporter, company, status,
                 escalation_level, ticket_type, comments, department, progress, support_history):
        self.__ticket_id = ticket_id
        self.__title = title
        self.__text = text
        self.__priority = priority
        self.__due_date = due_date
        self.__assigned_to = assigned_to
        self.__request_date = request_date
        self.__reporter = reporter
        self.__company = company
        self.__status = status
        self.__escalation_level = escalation_level
        self.__ticket_type = ticket_type
        self.__comments = comments
        self.__department = department
        self.__progress = progress
        self.__support_history = support_history

    def get_ticket_id(self): return self.__ticket_id
    def get_title(self): return self.__title
    def get_text(self): return self.__text
    def get_priority(self): return self.__priority
    def get_due_date(self): return self.__due_date
    def get_assigned_to(self): return self.__assigned_to
    def get_request_date(self): return self.__request_date
    def get_reporter(self): return self.__reporter
    def get_company(self): return self.__company
    def get_status(self): return self.__status
    def get_escalation_level(self): return self.__escalation_level
    def get_ticket_type(self): return self.__ticket_type
    def get_comments(self): return self.__comments
    def get_department(self): return self.__department
    def get_progress(self): return self.__progress
    def get_support_history(self): return self.__support_history

    def set_title(self, title): self.__title = title
    def set_text(self, text): self.__text = text
    def set_priority(self, priority): self.__priority = priority
    def set_due_date(self, due_date): self.__due_date = due_date
    def set_assigned_to(self, assigned_to): self.__assigned_to = assigned_to
    def set_request_date(self, request_date): self.__request_date = request_date
    def set_reporter(self, reporter): self.__reporter = reporter
    def set_company(self, company): self.__company = company
    def set_status(self, status): self.__status = status
    def set_escalation_level(self, escalation_level): self.__escalation_level = escalation_level
    def set_ticket_type(self, ticket_type): self.__ticket_type = ticket_type
    def set_comments(self, comments): self.__comments = comments
    def set_department(self, department): self.__department = department
    def set_progress(self, progress): self.__progress = progress
    def set_support_history(self, support_history): self.__support_history = support_history

    def to_list(self):
        return [self.__ticket_id, self.__title, self.__text, self.__priority, self.__due_date, self.__assigned_to,
                self.__request_date, self.__reporter, self.__company, self.__status, self.__escalation_level,
                self.__ticket_type, self.__comments, self.__department, self.__progress, self.__support_history]


class DataManager:
    def __init__(self):
        self.__csv_file = "tickets.csv"
        self.__employees_file = "employees.csv"
        self.__reporters_file = "reporters.csv"
        self.__companies_file = "companies.csv"
        self.__status_options = ["Gesichtet", "In Bearbeitung", "Fertig", "Abgebrochen", "Wartend", "Überprüfung"]
        self.__ticket_types = ["Fehler", "Eskalation", "Wartung", "Support", "Verbesserung"]
        self.__departments = ["IT", "HR", "Finanzen", "Sales", "Support"]

    def load_employees(self):
        if os.path.exists(self.__employees_file):
            with open(self.__employees_file, "r", encoding="utf-8") as file:
                return [row[0] for row in csv.reader(file) if row]
        return ["Monitoring API"]

    def save_employee(self, employee):
        if not employee: return
        employees = self.load_employees()
        if employee not in employees:
            employees.append(employee)
            with open(self.__employees_file, "w", newline="", encoding="utf-8") as file:
                writer = csv.writer(file)
                for emp in employees:
                    writer.writerow([emp])

    def delete_employee(self, employee):
        if not employee or employee == "Nicht zugewiesen": return
        employees = self.load_employees()
        if employee in employees:
            employees.remove(employee)
            with open(self.__employees_file, "w", newline="", encoding="utf-8") as file:
                writer = csv.writer(file)
                for emp in employees:
                    writer.writerow([emp])

    def load_reporters(self):
        if os.path.exists(self.__reporters_file):
            with open(self.__reporters_file, "r", encoding="utf-8") as file:
                return {row[0]: row[1] for row in csv.reader(file) if len(row) >= 2}
        return {}

    def save_reporter(self, reporter, info=""):
        if not reporter: return
        reporters = self.load_reporters()
        reporters[reporter] = info
        with open(self.__reporters_file, "w", newline="", encoding="utf-8") as file:
            writer = csv.writer(file)
            for name, inf in reporters.items():
                writer.writerow([name, inf])

    def delete_reporter(self, reporter):
        if not reporter: return
        reporters = self.load_reporters()
        if reporter in reporters:
            del reporters[reporter]
            with open(self.__reporters_file, "w", newline="", encoding="utf-8") as file:
                writer = csv.writer(file)
                for name, inf in reporters.items():
                    writer.writerow([name, inf])

    def load_companies(self):
        if os.path.exists(self.__companies_file):
            with open(self.__companies_file, "r", encoding="utf-8") as file:
                return [row[0] for row in csv.reader(file) if row]
        return []

    def save_company(self, company):
        if not company: return
        companies = self.load_companies()
        if company not in companies:
            companies.append(company)
            with open(self.__companies_file, "w", newline="", encoding="utf-8") as file:
                writer = csv.writer(file)
                for comp in companies:
                    writer.writerow([comp])

    def delete_company(self, company):
        if not company: return
        companies = self.load_companies()
        if company in companies:
            companies.remove(company)
            with open(self.__companies_file, "w", newline="", encoding="utf-8") as file:
                writer = csv.writer(file)
                for comp in companies:
                    writer.writerow([comp])

    def generate_ticket_id(self):
        return random.randint(1000, 9999)

    def set_csv_file(self, file_path):
        self.__csv_file = file_path

    def load_tickets(self, file_path=None):
        file_path = file_path or self.__csv_file
        if os.path.exists(file_path):
            with open(file_path, "r", encoding="utf-8") as file:
                return [Ticket(*row) for row in csv.reader(file) if len(row) >= 16]
        return []

    def save_tickets(self, tickets, file_path=None):
        file_path = file_path or self.__csv_file
        with open(file_path, "w", newline="", encoding="utf-8") as file:
            writer = csv.writer(file)
            writer.writerows([ticket.to_list() for ticket in tickets])

    def search_tickets(self, keyword):
        tickets = self.load_tickets()
        result = []
        kw = keyword.lower()
        for t in tickets:
            if (kw in str(t.get_ticket_id()).lower() or 
                kw in t.get_title().lower() or 
                kw in t.get_text().lower() or
                kw in t.get_priority().lower() or
                kw in str(t.get_assigned_to()).lower()):
                result.append(t)
        return result

    def calculate_priority_stats(self):
        tickets = self.load_tickets()
        stats = {"Hoch": 0, "Mittel": 0, "Niedrig": 0}
        for t in tickets:
            prio = t.get_priority()
            if prio in stats:
                stats[prio] += 1
            else:
                stats[prio] = 1 
        return stats

    def get_status_options(self): return self.__status_options
    def get_ticket_types(self): return self.__ticket_types
    def get_departments(self): return self.__departments
    def set_csv_file(self, file_path): self.__csv_file = file_path


class TicketSystemGUI:
    def __init__(self, data_manager):
        self.data_manager = data_manager
        self.root = ctk.CTk()
        self.root.title("Ticket System")
        self.root.geometry("1550x920")
        self.root.minsize(1200, 700)

        # Treeview styling (ttk is still used for the table)
        self.style = ttk.Style()
        self.style.theme_use("clam")
        self.style.configure("Treeview", background="#2b2b2b", foreground="#ffffff", fieldbackground="#2b2b2b", borderwidth=0, rowheight=25)
        self.style.configure("Treeview.Heading", background="#1f538d", foreground="#ffffff", borderwidth=0, font=("Segoe UI", 10, "bold"))
        self.style.map("Treeview", background=[("selected", "#1f538d")], foreground=[("selected", "#ffffff")])

        # Variablen
        self.priority_var = ctk.StringVar(value="Mittel")
        self.assigned_var = ctk.StringVar(value="Nicht zugewiesen")
        self.reporter_var = ctk.StringVar(value="")
        self.company_var = ctk.StringVar(value="")
        self.status_var = ctk.StringVar(value=self.data_manager.get_status_options()[0])
        self.escalation_var = ctk.StringVar(value="Level 1")
        self.ticket_type_var = ctk.StringVar(value=self.data_manager.get_ticket_types()[0])
        self.department_var = ctk.StringVar(value=self.data_manager.get_departments()[0])
        self.progress_var = ctk.StringVar(value="0%")

        self.setup_modern_gui()

    def setup_modern_gui(self):
        # Header
        header = ctk.CTkFrame(self.root, height=60, corner_radius=0)
        header.pack(fill=tk.X, side=tk.TOP)
        ctk.CTkLabel(header, text="Ticket Management System", font=("Segoe UI", 24, "bold")).pack(side=tk.LEFT, padx=20, pady=15)
        
        ctk.CTkButton(header, text="Exportieren", command=self.export_tickets, fg_color="#2b8a3e", hover_color="#236e32").pack(side=tk.RIGHT, padx=10)
        ctk.CTkButton(header, text="Laden", command=self.load_tickets).pack(side=tk.RIGHT, padx=10)

        # PanedWindow für Layout - CustomTkinter doesn't have a native paned window, so wir nutzen tk.PanedWindow
        content_frame = ctk.CTkFrame(self.root, fg_color="transparent")
        content_frame.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)
        
        self.paned = tk.PanedWindow(content_frame, orient=tk.HORIZONTAL, sashwidth=6, bg="#2b2b2b", bd=0)
        self.paned.pack(fill=tk.BOTH, expand=True)

        # === Linke Spalte: Eingabefelder (vollständig scrollbar mit CTkScrollableFrame) ===
        left_wrapper = tk.Frame(self.paned, bg="#2b2b2b")
        self.paned.add(left_wrapper, minsize=300, width=350)
        self.left_pane = ctk.CTkScrollableFrame(left_wrapper, label_text="Neues / Bearbeitetes Ticket")
        self.left_pane.pack(fill=tk.BOTH, expand=True)

        # === Mittlere Spalte: Ticket-Liste ===
        middle_wrapper = tk.Frame(self.paned, bg="#2b2b2b")
        self.paned.add(middle_wrapper, minsize=400, width=800)
        self.middle_pane = ctk.CTkFrame(middle_wrapper)
        self.middle_pane.pack(fill=tk.BOTH, expand=True)
        ctk.CTkLabel(self.middle_pane, text="Tickets", font=("Segoe UI", 14, "bold")).pack(pady=5)

        # === Rechte Spalte: Ticket-Details ===
        right_wrapper = tk.Frame(self.paned, bg="#2b2b2b")
        self.paned.add(right_wrapper, minsize=200, width=350)
        self.right_pane = ctk.CTkScrollableFrame(right_wrapper, label_text="Ticket-Details")
        self.right_pane.pack(fill=tk.BOTH, expand=True)

        self.create_form(self.left_pane)
        self.create_ticket_list(self.middle_pane)
        self.create_detail_view(self.right_pane)

        self.update_ticket_list(self.data_manager.load_tickets())

    def create_form(self, parent):
        row = 0
        def add_row(label_text, widget):
            nonlocal row
            ctk.CTkLabel(parent, text=label_text).grid(row=row, column=0, sticky="w", pady=4, padx=5)
            if widget:
                widget.grid(row=row, column=1, pady=4, padx=5, sticky="ew")
            row += 1

        self.entry_ticket_id = ctk.CTkEntry(parent)
        add_row("Ticket ID:", self.entry_ticket_id)

        self.entry_title = ctk.CTkEntry(parent)
        add_row("Titel:", self.entry_title)

        self.entry_text = ctk.CTkTextbox(parent, height=100)
        add_row("Beschreibung:", self.entry_text)

        self.priority_menu = ctk.CTkOptionMenu(parent, variable=self.priority_var, values=["Hoch", "Mittel", "Niedrig"])
        add_row("Prioritaet:", self.priority_menu)

        due_frame = ctk.CTkFrame(parent, fg_color="transparent")
        self.entry_due = ctk.CTkEntry(due_frame, width=250)
        self.entry_due.bind("<Key>", lambda e: "break") # Blockiert Texteingabe
        self.entry_due.bind("<Button-1>", lambda e: self.open_calendar()) # Öffnet Kalender bei Klick
        
        btn_due = ctk.CTkButton(due_frame, text="Kalender", width=60, command=self.open_calendar)
        btn_due.pack(side=tk.RIGHT, padx=(5,0))
        self.entry_due.pack(side=tk.LEFT, fill=tk.X, expand=True)
        add_row("Faellig bis:", due_frame)

        req_frame = ctk.CTkFrame(parent, fg_color="transparent")
        self.entry_request_date = ctk.CTkEntry(req_frame, width=250)
        self.entry_request_date.bind("<Key>", lambda e: "break") # Blockiert Texteingabe
        self.entry_request_date.bind("<Button-1>", lambda e: self.open_request_date_calendar()) # Öffnet Kalender bei Klick
        
        btn_req = ctk.CTkButton(req_frame, text="Kalender", width=60, command=self.open_request_date_calendar)
        btn_req.pack(side=tk.RIGHT, padx=(5,0))
        self.entry_request_date.pack(side=tk.LEFT, fill=tk.X, expand=True)
        add_row("Erstelldatum:", req_frame)

        assigned_frame = ctk.CTkFrame(parent, fg_color="transparent")
        self.assigned_menu = ctk.CTkOptionMenu(assigned_frame, variable=self.assigned_var, values=["Nicht zugewiesen"])
        self.assigned_menu.pack(side=tk.LEFT, fill=tk.X, expand=True)
        self.entry_new_employee = ctk.CTkEntry(assigned_frame, width=100, placeholder_text="Neu")
        self.entry_new_employee.pack(side=tk.LEFT, padx=5)
        ctk.CTkButton(assigned_frame, text="+", width=30, command=self.add_employee).pack(side=tk.LEFT, padx=2)
        ctk.CTkButton(assigned_frame, text="-", width=30, command=self.delete_employee).pack(side=tk.LEFT, padx=2)
        add_row("Zugewiesen an:", assigned_frame)

        reporter_frame = ctk.CTkFrame(parent, fg_color="transparent")
        self.reporter_menu = ctk.CTkOptionMenu(reporter_frame, variable=self.reporter_var, values=[""], command=self.on_reporter_selected)
        self.reporter_menu.pack(side=tk.LEFT, fill=tk.X, expand=True)
        self.entry_new_reporter = ctk.CTkEntry(reporter_frame, width=100, placeholder_text="Neu")
        self.entry_new_reporter.pack(side=tk.LEFT, padx=5)
        ctk.CTkButton(reporter_frame, text="+", width=30, command=self.add_reporter).pack(side=tk.LEFT, padx=2)
        ctk.CTkButton(reporter_frame, text="-", width=30, command=self.delete_reporter).pack(side=tk.LEFT, padx=2)
        add_row("Meldender:", reporter_frame)

        company_frame = ctk.CTkFrame(parent, fg_color="transparent")
        self.company_menu = ctk.CTkOptionMenu(company_frame, variable=self.company_var, values=[""])
        self.company_menu.pack(side=tk.LEFT, fill=tk.X, expand=True)
        self.entry_new_company = ctk.CTkEntry(company_frame, width=100, placeholder_text="Neu")
        self.entry_new_company.pack(side=tk.LEFT, padx=5)
        ctk.CTkButton(company_frame, text="+", width=30, command=self.add_company).pack(side=tk.LEFT, padx=2)
        ctk.CTkButton(company_frame, text="-", width=30, command=self.delete_company).pack(side=tk.LEFT, padx=2)
        add_row("Unternehmen:", company_frame)

        status_menu = ctk.CTkOptionMenu(parent, variable=self.status_var, values=self.data_manager.get_status_options())
        add_row("Status:", status_menu)

        escalation_menu = ctk.CTkOptionMenu(parent, variable=self.escalation_var, values=["Level 1", "Level 2", "Level 3"])
        add_row("Eskalationsstufe:", escalation_menu)

        ticket_type_menu = ctk.CTkOptionMenu(parent, variable=self.ticket_type_var, values=self.data_manager.get_ticket_types())
        add_row("Ticket-Typ:", ticket_type_menu)

        department_menu = ctk.CTkOptionMenu(parent, variable=self.department_var, values=self.data_manager.get_departments())
        add_row("Abteilung:", department_menu)

        progress_menu = ctk.CTkOptionMenu(parent, variable=self.progress_var, values=["0%", "25%", "50%", "75%", "100%"])
        add_row("Fortschritt:", progress_menu)

        self.entry_support_history = ctk.CTkTextbox(parent, height=80)
        add_row("Support Historie:", self.entry_support_history)

        self.entry_comments = ctk.CTkTextbox(parent, height=80)
        add_row("Kommentare:", self.entry_comments)

        self.entry_reporter_info = ctk.CTkTextbox(parent, height=60)
        add_row("Kontaktdaten:", self.entry_reporter_info)

        btn_frame = ctk.CTkFrame(parent, fg_color="transparent")
        btn_frame.grid(row=row, column=0, columnspan=2, pady=15)
        
        ctk.CTkButton(btn_frame, text="Ticket speichern", command=self.save_ticket, fg_color="#1f538d", hover_color="#14375d").pack(side=tk.LEFT, padx=5, pady=5)
        ctk.CTkButton(btn_frame, text="Leeren", command=self.clear_entries, fg_color="#7a7a7a", hover_color="#5a5a5a").pack(side=tk.LEFT, padx=5, pady=5)
        ctk.CTkButton(btn_frame, text="Loeschen", command=self.delete_ticket, fg_color="#c92a2a", hover_color="#8c1c1c").pack(side=tk.LEFT, padx=5, pady=5)

        parent.columnconfigure(1, weight=1)

        self.update_assigned_menu()
        self.update_reporter_menu()
        self.update_company_menu()

    def on_reporter_selected(self, choice):
        self.update_reporter_info()

    def create_ticket_list(self, parent):
        columns = ("ID", "Titel", "Prioritaet", "Faellig bis", "Status", "Abteilung", "Fortschritt")
        
        tree_frame = ctk.CTkFrame(parent)
        tree_frame.pack(fill=tk.BOTH, expand=True)

        self.ticket_list = ttk.Treeview(tree_frame, columns=columns, show="headings", height=25)

        for col in columns:
            self.ticket_list.heading(col, text=col, command=lambda c=col: self.sort_tickets(c))
            self.ticket_list.column(col, width=120 if col != "Titel" else 250, minwidth=80)

        v_scroll = ttk.Scrollbar(tree_frame, orient="vertical", command=self.ticket_list.yview)
        h_scroll = ttk.Scrollbar(tree_frame, orient="horizontal", command=self.ticket_list.xview)
        self.ticket_list.configure(yscrollcommand=v_scroll.set, xscrollcommand=h_scroll.set)

        self.ticket_list.grid(row=0, column=0, sticky="nsew")
        v_scroll.grid(row=0, column=1, sticky="ns")
        h_scroll.grid(row=1, column=0, sticky="ew")

        tree_frame.rowconfigure(0, weight=1)
        tree_frame.columnconfigure(0, weight=1)

        self.ticket_list.bind("<<TreeviewSelect>>", self.display_ticket)

        self.ticket_list.tag_configure("overdue", background="#c92a2a", foreground="white")
        self.ticket_list.tag_configure("due_today", background="#e67700", foreground="white")
        self.ticket_list.tag_configure("on_time", background="#2b8a3e", foreground="white")

    def create_detail_view(self, parent):
        self.detail_text = ctk.CTkTextbox(parent, wrap="word", state="disabled")
        self.detail_text.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)

    def update_assigned_menu(self):
        values = ["Nicht zugewiesen"] + self.data_manager.load_employees()
        self.assigned_menu.configure(values=values)

    def update_reporter_menu(self):
        reporters = list(self.data_manager.load_reporters().keys())
        values = reporters if reporters else [""]
        self.reporter_menu.configure(values=values)

    def update_company_menu(self):
        companies = self.data_manager.load_companies()
        values = [""] + companies if companies else [""]
        self.company_menu.configure(values=values)

    def update_reporter_info(self):
        reporter = self.reporter_var.get()
        reporters = self.data_manager.load_reporters()
        self.entry_reporter_info.delete("1.0", tk.END)
        if reporter in reporters:
            self.entry_reporter_info.insert("1.0", reporters[reporter])

    def save_ticket(self):
        ticket_id = self.entry_ticket_id.get().strip()
        if not ticket_id:
            ticket_id = str(self.data_manager.generate_ticket_id())
            self.entry_ticket_id.delete(0, tk.END)
            self.entry_ticket_id.insert(0, ticket_id)

        title = self.entry_title.get().strip()
        text = self.entry_text.get("1.0", tk.END).strip()
        priority = self.priority_var.get()
        due_date = self.entry_due.get().strip()
        assigned_to = self.assigned_var.get() if self.assigned_var.get() != "Nicht zugewiesen" else ""
        request_date = self.entry_request_date.get().strip() or datetime.now().strftime("%Y-%m-%d")
        reporter = self.reporter_var.get().strip()
        company = self.company_var.get().strip()
        status = self.status_var.get()
        escalation_level = self.escalation_var.get()
        ticket_type = self.ticket_type_var.get()
        comments = self.entry_comments.get("1.0", tk.END).strip()
        department = self.department_var.get()
        progress = self.progress_var.get()
        support_history = self.entry_support_history.get("1.0", tk.END).strip()

        if not title or not text or not due_date or not reporter:
            messagebox.showwarning("Fehlende Daten", "Bitte die Pflichtfelder (Titel, Text, Faellig bis, Meldender) ausfuellen!")
            return

        tickets = self.data_manager.load_tickets()
        ticket = Ticket(ticket_id, title, text, priority, due_date, assigned_to, request_date, reporter, company,
                        status, escalation_level, ticket_type, comments, department, progress, support_history)

        for i, t in enumerate(tickets):
            if t.get_ticket_id() == ticket_id:
                tickets[i] = ticket
                break
        else:
            tickets.append(ticket)

        self.data_manager.save_tickets(tickets)
        self.update_ticket_list(tickets)
        self.clear_entries()
        messagebox.showinfo("Erfolg", "Ticket erfolgreich gespeichert!")

    def update_ticket_list(self, tickets):
        for item in self.ticket_list.get_children():
            self.ticket_list.delete(item)
        for ticket in tickets:
            status_display = ticket.get_status()
            iid = self.ticket_list.insert("", "end", values=(
                ticket.get_ticket_id(), ticket.get_title(), ticket.get_priority(),
                ticket.get_due_date(), status_display, ticket.get_department(), ticket.get_progress()
            ))
            self.colorize_ticket(ticket.get_due_date(), iid)

    def colorize_ticket(self, due_date, item):
        try:
            due = datetime.strptime(due_date, "%Y-%m-%d")
            now = datetime.now()
            if due < now:
                self.ticket_list.item(item, tags=("overdue",))
            elif due.date() == now.date():
                self.ticket_list.item(item, tags=("due_today",))
            else:
                self.ticket_list.item(item, tags=("on_time",))
        except:
            pass

    def display_ticket(self, event):
        sel = self.ticket_list.selection()
        if not sel: return
        values = self.ticket_list.item(sel[0])['values']
        ticket_id = values[0]

        for ticket in self.data_manager.load_tickets():
            if ticket.get_ticket_id() == str(ticket_id):
                self.clear_entries()
                self.entry_ticket_id.insert(0, ticket.get_ticket_id())
                self.entry_title.insert(0, ticket.get_title())
                self.entry_text.delete("1.0", tk.END)
                self.entry_text.insert("1.0", ticket.get_text())
                self.priority_var.set(ticket.get_priority())
                self.entry_due.delete(0, tk.END)
                self.entry_due.insert(0, ticket.get_due_date())
                self.entry_request_date.delete(0, tk.END)
                self.entry_request_date.insert(0, ticket.get_request_date())
                self.assigned_var.set(ticket.get_assigned_to() or "Nicht zugewiesen")
                self.reporter_var.set(ticket.get_reporter())
                self.company_var.set(ticket.get_company())
                self.status_var.set(ticket.get_status())
                self.escalation_var.set(ticket.get_escalation_level())
                self.ticket_type_var.set(ticket.get_ticket_type())
                self.department_var.set(ticket.get_department())
                self.progress_var.set(ticket.get_progress())
                self.entry_comments.delete("1.0", tk.END)
                self.entry_comments.insert("1.0", ticket.get_comments())
                self.entry_support_history.delete("1.0", tk.END)
                self.entry_support_history.insert("1.0", ticket.get_support_history())
                self.update_reporter_info()

                self.detail_text.configure(state="normal")
                self.detail_text.delete("1.0", tk.END)
                self.detail_text.insert("1.0", f"Ticket {ticket.get_ticket_id()}\n\n{ticket.get_text()}\n\nSupport-Historie:\n{ticket.get_support_history()}")
                self.detail_text.configure(state="disabled")
                break

    def clear_entries(self):
        self.entry_ticket_id.delete(0, tk.END)
        self.entry_title.delete(0, tk.END)
        self.entry_text.delete("1.0", tk.END)
        self.entry_due.delete(0, tk.END)
        self.entry_request_date.delete(0, tk.END)
        self.assigned_var.set("Nicht zugewiesen")
        self.reporter_var.set("")
        self.company_var.set("")
        self.status_var.set(self.data_manager.get_status_options()[0])
        self.escalation_var.set("Level 1")
        self.ticket_type_var.set(self.data_manager.get_ticket_types()[0])
        self.department_var.set(self.data_manager.get_departments()[0])
        self.progress_var.set("0%")
        self.entry_comments.delete("1.0", tk.END)
        self.entry_support_history.delete("1.0", tk.END)
        self.entry_reporter_info.delete("1.0", tk.END)

    def delete_ticket(self):
        sel = self.ticket_list.selection()
        if not sel:
            messagebox.showwarning("Kein Ticket ausgewaehlt", "Bitte waehlen Sie ein Ticket zum Loeschen aus.")
            return
        ticket_id = self.ticket_list.item(sel[0])['values'][0]
        tickets = [t for t in self.data_manager.load_tickets() if t.get_ticket_id() != str(ticket_id)]
        self.data_manager.save_tickets(tickets)
        self.update_ticket_list(tickets)
        self.clear_entries()

    def sort_tickets(self, column):
        tickets = self.data_manager.load_tickets()
        if column == "ID":
            tickets.sort(key=lambda x: int(x.get_ticket_id()))
        elif column == "Titel":
            tickets.sort(key=lambda x: x.get_title().lower())
        elif column == "Prioritaet":
            tickets.sort(key=lambda x: x.get_priority())
        elif column == "Faellig bis":
            tickets.sort(key=lambda x: x.get_due_date())
        elif column == "Status":
            tickets.sort(key=lambda x: x.get_status())
        elif column == "Abteilung":
            tickets.sort(key=lambda x: x.get_department())
        elif column == "Fortschritt":
            tickets.sort(key=lambda x: x.get_progress())
        self.data_manager.save_tickets(tickets)
        self.update_ticket_list(tickets)

    def export_tickets(self):
        path = filedialog.asksaveasfilename(defaultextension=".csv", filetypes=[("CSV files", "*.csv")])
        if not path: return
        tickets = self.data_manager.load_tickets()
        with open(path, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow(["Ticket ID", "Titel", "Text", "Prioritaet", "Faellig bis", "Zugewiesen an", "Erstellungsdatum",
                             "Meldender", "Unternehmen", "Status", "Eskalationsstufe", "Ticket-Typ", "Kommentare",
                             "Abteilung", "Fortschritt", "Support Historie"])
            writer.writerows([t.to_list() for t in tickets])
        messagebox.showinfo("Export", "Tickets wurden erfolgreich exportiert!")

    def load_tickets(self):
        path = filedialog.askopenfilename(filetypes=[("CSV files", "*.csv")])
        if not path: return
        self.data_manager.set_csv_file(path)
        self.update_ticket_list(self.data_manager.load_tickets(path))

    def open_calendar(self):
        if hasattr(self, "cal_window") and self.cal_window is not None and self.cal_window.winfo_exists():
            self.cal_window.focus()
            return
            
        self.cal_window = ctk.CTkToplevel(self.root)
        self.cal_window.title("Kalender")
        self.cal_window.attributes('-topmost', True)
        self.cal_window.grab_set()
        
        cal = Calendar(self.cal_window, selectmode="day", date_pattern="y-mm-dd")
        cal.pack(padx=10, pady=10)
        ctk.CTkButton(self.cal_window, text="Auswaehlen", command=lambda: [self.entry_due.delete(0, tk.END), self.entry_due.insert(0, cal.get_date()), self.cal_window.destroy()]).pack(pady=5)

    def open_request_date_calendar(self):
        if hasattr(self, "cal_window") and self.cal_window is not None and self.cal_window.winfo_exists():
            self.cal_window.focus()
            return
            
        self.cal_window = ctk.CTkToplevel(self.root)
        self.cal_window.title("Kalender")
        self.cal_window.attributes('-topmost', True)
        self.cal_window.grab_set()
        
        cal = Calendar(self.cal_window, selectmode="day", date_pattern="y-mm-dd")
        cal.selection_set(datetime.now())
        cal.pack(padx=10, pady=10)
        ctk.CTkButton(self.cal_window, text="Auswaehlen", command=lambda: [self.entry_request_date.delete(0, tk.END), self.entry_request_date.insert(0, cal.get_date()), self.cal_window.destroy()]).pack(pady=5)

    def add_employee(self):
        emp = self.entry_new_employee.get().strip()
        if emp:
            self.data_manager.save_employee(emp)
            self.entry_new_employee.delete(0, tk.END)
            self.update_assigned_menu()

    def delete_employee(self):
        emp = self.assigned_var.get()
        self.data_manager.delete_employee(emp)
        self.assigned_var.set("Nicht zugewiesen")
        self.update_assigned_menu()

    def add_reporter(self):
        rep = self.entry_new_reporter.get().strip()
        info = self.entry_reporter_info.get("1.0", tk.END).strip()
        if rep:
            self.data_manager.save_reporter(rep, info)
            self.entry_new_reporter.delete(0, tk.END)
            self.update_reporter_menu()

    def delete_reporter(self):
        rep = self.reporter_var.get()
        self.data_manager.delete_reporter(rep)
        self.reporter_var.set("")
        self.update_reporter_menu()
        self.update_reporter_info()

    def add_company(self):
        comp = self.entry_new_company.get().strip()
        if comp:
            self.data_manager.save_company(comp)
            self.entry_new_company.delete(0, tk.END)
            self.update_company_menu()

    def delete_company(self):
        comp = self.company_var.get()
        self.data_manager.delete_company(comp)
        self.company_var.set("")
        self.update_company_menu()

    def run(self):
        self.root.mainloop()


if __name__ == "__main__":
    data_manager = DataManager()
    app = TicketSystemGUI(data_manager)
    app.run()

