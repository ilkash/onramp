"use client";

import { useState } from "react";
import CopyIcon from "./icons/CopyIcon";

type Props = {
  value: string;
};

export default function CopyHash({ value }: Props) {
  const [copied, setCopied] = useState(false);

  const short = `${value.slice(0, 12)}...`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-center gap-2">
      <span
        className={`text-[14px] ${copied ? "text-[#E60A14]" : "text-black"}`}
      >
        {short}
      </span>

      <button
        onClick={handleCopy}
        className="group cursor-pointer  transition-transform hover:scale-105"
      >
        {copied ? (
          <svg
            className="w-4 h-4 text-[#E60A14]"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            viewBox="0 0 24 24"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          // 📋 COPY ICON
          <CopyIcon />
        )}
      </button>
    </div>
  );
}
