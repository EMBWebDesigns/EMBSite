"use client";

import React from 'react';
import { Folder, File } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileTreeItemProps {
  item: { name: string; type: 'folder' | 'file'; path?: string; children?: any[] };
  level?: number;
  onSelect: (path: string) => void;
  selectedFile: string | null;
}

const FileTreeItem = ({ item, level = 0, onSelect, selectedFile }: FileTreeItemProps) => (
  <button
    onClick={() => item.type === 'file' && item.path && onSelect(item.path)}
    disabled={item.type === 'folder'}
    className={cn(
      "w-full text-left flex items-center text-sm px-2 py-1.5 rounded-md",
      item.type === 'folder' ? 'cursor-default text-muted-foreground' : 'hover:bg-muted',
      selectedFile === item.path && 'bg-muted'
    )}
    style={{ paddingLeft: `${level * 1.5 + 0.5}rem` }}
  >
    {item.type === 'folder' ? <Folder className="h-4 w-4 mr-2 text-primary" /> : <File className="h-4 w-4 mr-2 text-muted-foreground" />}
    <span>{item.name}</span>
  </button>
);

interface FileTreeProps {
  tree: any[];
  onSelect: (path: string) => void;
  selectedFile: string | null;
  level?: number; // Added level prop here
}

export const FileTree = ({ tree, onSelect, selectedFile, level = 0 }: FileTreeProps) => {
  return (
    <div className="font-mono space-y-1">
      {tree.map(item => (
        <div key={item.name}>
          <FileTreeItem item={item} level={level} onSelect={onSelect} selectedFile={selectedFile} />
          {item.children && <FileTree tree={item.children} level={level + 1} onSelect={onSelect} selectedFile={selectedFile} />}
        </div>
      ))}
    </div>
  );
};