"use client";

import ReactMarkdown from "react-markdown";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Textarea } from "@/components/ui/textarea";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const MarkdownEditor = ({ value, onChange }: MarkdownEditorProps) => {
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-[500px] w-full rounded-lg border">
      <ResizablePanel defaultSize={50}>
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-full resize-none border-0 focus-visible:ring-0"
          placeholder="Write your post content here using Markdown..."
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="p-6 h-full overflow-y-auto">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            className="prose dark:prose-invert max-w-none"
          >
            {value || "Preview will appear here..."}
          </ReactMarkdown>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};