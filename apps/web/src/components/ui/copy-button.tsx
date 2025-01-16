'use client';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, CopyIcon } from 'lucide-react';

type CopyButtonProps = {
  textToCopy: string;
  buttonLabel?: string;
  copiedLabel?: string;
  className?: string;
  size?: number;
};

const CopyButton = ({ textToCopy, buttonLabel = 'Copy', copiedLabel = 'Copied!', className, size = 12 }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return (
    <button
      className={cn('z-50', className)}
      onClick={handleCopy}
    >
      {isCopied ?
        <div className="flex items-center justify-center gap-1">
          <span>
          {copiedLabel}
          </span>
          <Check style={{ width: size, height: size }} />
        </div>
        :
        <div className="flex items-center justify-center gap-1">
          <span>
          {buttonLabel}
          </span>
          <CopyIcon style={{ width: size, height: size }} />
        </div>}
    </button>
  );
};

export default CopyButton;
