"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-500 hover:prose-a:text-blue-600 prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
