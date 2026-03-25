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

      <button onClick={handleCopy} className="group">
        {/*
         */}
        {/* </div> */}
        <CopyIcon />
      </button>
    </div>
  );
}
