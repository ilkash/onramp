"use client";

import { useState } from "react";
import Image from "next/image";
import { availableCountries } from "@/constants/countries";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function PhoneInput({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(availableCountries[0]);

  const handleSelect = (countryId: string) => {
    const country = availableCountries.find((c) => c.id === countryId)!;
    setSelectedCountry(country);

    const digits = value.replace(/^\+\d+\s*/, "");
    onChange(country.phoneCode + " " + digits);
    setOpen(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;

    if (!raw.startsWith(selectedCountry.phoneCode)) {
      onChange(selectedCountry.phoneCode + " ");
      return;
    }

    onChange(raw);
  };

  return (
    <div className="relative flex items-center border-b border-black/60">
      {/* <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 py-[10px] pr-2 shrink-0"
      >
        <Image
          src={selectedCountry.flag}
          alt={selectedCountry.name}
          width={20}
          height={14}
        />
        <span className="text-[12px]">▲</span>
        <span className="text-[14px]">{selectedCountry.phoneCode}</span>
      </button> */}

      <input
        value={value}
        onChange={handleInput}
        placeholder={selectedCountry.phonePlaceholder}
        className="w-full outline-none py-[10px] text-[14px]"
      />

      {open && (
        <div className="absolute top-full left-0 z-50 bg-white border border-gray-200 shadow">
          {availableCountries.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => handleSelect(c.id)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 w-full text-left text-[14px]"
            >
              <Image src={c.flag} alt={c.name} width={20} height={14} />
              <span>{c.phoneCode}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
