import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Sidebar } from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TicketSystem WebDocs | Ticketsystem LF05",
  description: "Interaktive Dokumentations-Plattform für das Ticket Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen overflow-hidden flex bg-slate-50 dark:bg-[#09090b]`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
            <div className="absolute top-0 left-0 w-full h-[500px] bg-blue-500/10 dark:bg-blue-500/5 blur-[100px] rounded-full -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-full h-[500px] bg-purple-500/10 dark:bg-purple-500/5 blur-[100px] rounded-full translate-y-1/2 pointer-events-none" />
            
            <div className="max-w-6xl mx-auto relative z-10 pb-20">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
