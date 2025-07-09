import React from 'react';
import Link from 'next/link';

export const MadeWithDyad = () => {
  return (
    <div className="flex justify-center py-4">
      <Link
        href="https://dyad.sh"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        Made with Dyad
      </Link>
    </div>
  );
};