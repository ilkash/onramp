"use client";

import { useState } from "react";
import Image from "next/image";
import { availableCountries } from "@/constants/countries";

type Props = {
  value: string;
  onChange: (countryId: string, phoneCode: string) => void;
};

export default function CountrySelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const selected = availableCountries.find((c) => c.id === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="border-b border-[#262932] py-2 text-[14px] flex items-center gap-2 w-full text-left"
      >
        {selected ? (
          <>
            <Image
              src={selected.flag}
              alt={selected.name}
              width={20}
              height={14}
            />
            <span>{selected.name}</span>
          </>
        ) : (
          <span className="text-gray-400">Select country</span>
        )}
      </button>

      {open && (
        <div className="absolute top-full left-0 z-50 bg-white border border-gray-200 shadow w-full">
          {availableCountries.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                onChange(c.id, c.phoneCode);
                setOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full text-left text-[14px]"
            >
              <Image src={c.flag} alt={c.name} width={20} height={14} />
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
