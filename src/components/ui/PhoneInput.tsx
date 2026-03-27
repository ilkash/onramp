"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { availableCountries } from "@/constants/countries";

const phoneMasks: Record<string, string> = {
  "+39": "### #######",
  "+33": "# ## ## ## ##",
  "+44": "#### ######",
  "+34": "### ### ###",
  "+48": "### ### ###",
  "+358": "## ### ####",
};

function applyMask(digits: string, mask: string): string {
  let result = "";
  let di = 0;
  for (let i = 0; i < mask.length; i++) {
    if (di >= digits.length) break;
    if (mask[i] === "#") {
      result += digits[di++];
    } else {
      result += mask[i];
    }
  }
  return result;
}

function detectCountryByPhone(phone: string) {
  const sorted = [...availableCountries].sort(
    (a, b) => b.phoneCode.length - a.phoneCode.length,
  );
  return sorted.find((c) => phone.startsWith(c.phoneCode));
}

type Props = {
  value: string;
  onChange: (val: string) => void;
  onCountryChange?: (code: string) => void;
  error?: boolean;
  initialPhone?: string;
};

export default function PhoneInput({
  value,
  onChange,
  onCountryChange,
  error,
  initialPhone,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(availableCountries[0]);

  useEffect(() => {
    if (!initialPhone) return;
    const detected = detectCountryByPhone(initialPhone);
    if (detected) {
      setSelectedCountry(detected);
      onCountryChange?.(detected.phoneCode);
      const digits = initialPhone
        .replace(detected.phoneCode, "")
        .replace(/\D/g, "");
      const mask = phoneMasks[detected.phoneCode];
      onChange(mask ? applyMask(digits, mask) : digits);
    }
  }, [initialPhone]);
  useEffect(() => {
    if (!value) return;
    if (initialPhone) return;

    const detected = detectCountryByPhone(value);
    if (!detected) return;

    if (value.startsWith(detected.phoneCode)) {
      const digits = value.replace(detected.phoneCode, "").replace(/\D/g, "");

      if (detected.id !== selectedCountry.id) {
        setSelectedCountry(detected);
      }

      onCountryChange?.(detected.phoneCode);

      const mask = phoneMasks[detected.phoneCode];
      const masked = mask ? applyMask(digits, mask) : digits;

      if (masked !== value) {
        onChange(masked);
      }
    }
  }, []);
  const handleSelect = (countryId: string) => {
    const country = availableCountries.find((c) => c.id === countryId)!;
    setSelectedCountry(country);
    onCountryChange?.(country.phoneCode);
    onChange("");
    setOpen(false);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, ""); // тільки цифри
    const mask = phoneMasks[selectedCountry.phoneCode];
    onChange(mask ? applyMask(raw, mask) : raw);
  };

  const mask = phoneMasks[selectedCountry.phoneCode];
  const placeholder = mask
    ? mask.replace(/#/g, "0")
    : selectedCountry.phonePlaceholder;

  return (
    <div
      className={`relative flex items-center border-b ${error ? "border-[var(--color-red)]" : "border-black/60"}`}
    >
      <button
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
        <span
          className={`text-[12px] transition-transform ${open ? "rotate-180" : ""}`}
        >
          ▲
        </span>
        <span className="text-[14px]">{selectedCountry.phoneCode}</span>
      </button>

      <input
        value={value}
        onChange={handleInput}
        placeholder={placeholder}
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
              <span className="text-gray-400 text-[14px]">{c.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
