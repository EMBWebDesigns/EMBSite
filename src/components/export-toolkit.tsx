"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Folder, File } from "lucide-react";
import { toast } from "sonner";

const fileTree = [
  { name: "src", type: "folder", children: [
    { name: "app", type: "folder", children: [
      { name: "page.tsx", type: "file" },
      { name: "layout.tsx", type: "file" },
    ]},
    { name: "components", type: "folder", children: [
      { name: "ui", type: "folder", children: [
        { name: "button.tsx", type: "file" },
      ]},
      { name: "header.tsx", type: "file" },
    ]},
    { name: "lib", type: "folder", children: [
      { name: "utils.ts", type: "file" },
    ]},
  ]},
  { name: "package.json", type: "file" },
  { name: "tailwind.config.ts", type: "file" },
];

const FileTreeItem = ({ item, level = 0 }: { item: any; level?: number }) => (
  <div style={{ paddingLeft: `${level * 1.5}rem` }} className="flex items-center text-sm">
    {item.type === 'folder' ? <Folder className="h-4 w-4 mr-2 text-primary" /> : <File className="h-4 w-4 mr-2 text-muted-foreground" />}
    <span>{item.name}</span>
  </div>
);

const RenderFileTree = ({ tree, level = 0 }: { tree: any[]; level?: number }) => (
  <>
    {tree.map(item => (
      <div key={item.name}>
        <FileTreeItem item={item} level={level} />
        {item.children && <RenderFileTree tree={item.children} level={level + 1} />}
      </div>
    ))}
  </>
);

export const ExportToolkit = () => {
  const handleDownload = () => {
    toast.success("Export Initiated!", {
      description: "Your project ZIP file will be ready for download shortly.",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Project File Structure</CardTitle>
        </CardHeader>
        <CardContent className="font-mono bg-background/50 p-4 rounded-lg space-y-1">
          <RenderFileTree tree={fileTree} />
        </CardContent>
      </Card>
      <div className="flex flex-col items-center justify-center space-y-4">
        <Download className="h-16 w-16 text-primary" />
        <h3 className="text-xl font-semibold">Ready to Export?</h3>
        <p className="text-muted-foreground text-center max-w-xs">
          Download the complete project as a clean, production-ready Next.js template.
        </p>
        <Button size="lg" onClick={handleDownload}>
          <Download className="mr-2 h-5 w-5" />
          Download Project (.zip)
        </Button>
      </div>
    </div>
  );
};