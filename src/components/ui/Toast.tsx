"use client";

import { useEffect } from "react";

type Props = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

export default function Toast({ message, type, onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`
  fixed top-6 left-1/2 -translate-x-1/2 z-[9999]
  flex items-center gap-3
  px-6 py-5 bg-white shadow-lg
  border-l-4 font-mono text-[16px]
  ${type === "success" ? "border-[var(--color-green)]" : "border-[var(--color-red)]"}
`}
    >
      <span
        className={`text-[18px] font-bold ${type === "success" ? "text-[var(--color-green)]" : "text-[var(--color-red)]"}`}
      >
        {type === "success" ? "✓" : "✕"}
      </span>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 text-black/40 hover:text-black">
        ✕
      </button>
    </div>
  );
}
