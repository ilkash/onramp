"use client";

import { ThemedText } from "../ui/ThemedText";

type Props = {
  value: {
    fullName: string;
    country: string;
    phone: string;
    email: string;
  };
  onChange: (field: string, val: string) => void;
};

export default function IndividualForm({ value, onChange }: Props) {
  return (
    <div>
      <h2 className="text-[var(--color-dark-red)] mb-6 font-mono text-[18px] font-medium">
        Personal data
      </h2>

      <div className="grid grid-cols-2 gap-[40px] mb-[20px]">
        <div className="flex flex-col">
          <ThemedText type="formModal">Full name</ThemedText>
          <input
            value={value.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
            className="border-b border-[#262932] py-2 text-[14px]"
          />
        </div>
        <div className="flex flex-col">
          <ThemedText type="formModal">Country</ThemedText>
          <input
            value={value.country}
            onChange={(e) => onChange("country", e.target.value)}
            placeholder="Italy"
            className="border-b border-[#262932] py-2 text-[14px]"
          />
        </div>
      </div>

      <div className="mb-[20px] flex flex-col">
        <ThemedText type="formModal">Phone number</ThemedText>
        <input
          value={value.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="+39 344 5146586"
          className="border-b border-[#262932] py-2 w-full text-[14px]"
        />
      </div>

      <div className="mb-[10px] flex flex-col">
        <ThemedText type="formModal">E-mail</ThemedText>
        <input
          value={value.email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="coin.tradesal@gmail.com"
          className="border-b border-[#262932] py-2 w-full text-[14px]"
        />
      </div>

      <div className="flex items-center gap-2 text-[var(--color-dark-red)] text-[12px] font-mono font-medium">
        <input type="checkbox" defaultChecked />
        <span>An invitation email will be send to the email indicated.</span>
      </div>
    </div>
  );
}
