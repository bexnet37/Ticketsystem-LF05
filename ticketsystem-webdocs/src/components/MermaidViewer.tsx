"use client";

import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";
import { useTheme } from "next-themes";

interface MermaidViewerProps {
  chart: string;
}

export function MermaidViewer({ chart }: MermaidViewerProps) {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: theme === "dark" ? "dark" : "default",
      securityLevel: "loose",
      fontFamily: "var(--font-geist-sans), Arial, sans-serif",
    });

    if (containerRef.current) {
      mermaid.render("mermaid-svg", chart).then((result) => {
        if (containerRef.current) {
          containerRef.current.innerHTML = result.svg;
        }
      });
    }
  }, [chart, theme]);

  return (
    <div 
      className="flex justify-center items-center w-full overflow-x-auto p-4 bg-white/5 dark:bg-black/20 rounded-xl border border-slate-200 dark:border-white/10"
      ref={containerRef} 
    />
  );
}
