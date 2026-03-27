"use client";

import { useState } from "react";
import Checkbox from "../ui/CheckBox";
import PhoneInput from "../ui/PhoneInput";
import { ThemedText } from "../ui/ThemedText";

type Props = {
  value: {
    fullName: string;
    country: string;
    phone: string;
    email: string;
  };
  onChange: (field: string, val: string) => void;
  onPhoneCodeChange?: (code: string) => void;
  initialPhone?: string;
  errors?: Partial<Record<"fullName" | "country" | "phone" | "email", string>>;
};

export default function IndividualForm({
  value,
  onChange,
  onPhoneCodeChange,
  errors,
  initialPhone,
}: Props) {
  const [sendEmail, setSendEmail] = useState(true);
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
            className={`border-b py-2 text-[14px] outline-none ${errors?.fullName ? "border-[var(--color-red)]" : "border-[#262932]"}`}
          />
          {errors?.fullName && (
            <span className="text-[var(--color-red)] text-[11px] font-mono mt-1">
              {errors.fullName}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <ThemedText type="formModal">Country</ThemedText>
          <select
            value={value.country}
            onChange={(e) => onChange("country", e.target.value)}
            className={`border-b py-2 text-[14px] bg-transparent cursor-pointer outline-none ${errors?.country ? "border-[var(--color-red)]" : "border-[#262932]"}`}
          >
            <option value="" disabled>
              Select country
            </option>
            <option value="ITALY">Italy</option>
            <option value="FRANCE">France</option>
            <option value="GREAT_BRITAIN">Great Britain</option>
            <option value="SPAIN">Spain</option>
            <option value="POLAND">Poland</option>
            <option value="FINLAND">Finland</option>
          </select>
          {errors?.country && (
            <span className="text-[var(--color-red)] text-[11px] font-mono mt-1">
              {errors.country}
            </span>
          )}
        </div>
      </div>

      <div className="mb-[20px] flex flex-col">
        <ThemedText type="formModal">Phone number</ThemedText>
        <PhoneInput
          value={value.phone}
          onChange={(val) => onChange("phone", val)}
          onCountryChange={onPhoneCodeChange}
          initialPhone={initialPhone}
          error={!!errors?.phone}
        />
        {errors?.phone && (
          <span className="text-[var(--color-red)] text-[11px] font-mono mt-1">
            {errors.phone}
          </span>
        )}
      </div>

      <div className="mb-[10px] flex flex-col">
        <ThemedText type="formModal">E-mail</ThemedText>
        <input
          value={value.email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="coin.tradesal@gmail.com"
          className={`border-b py-2 w-full text-[14px] outline-none ${errors?.email ? "border-[var(--color-red)]" : "border-[#262932]"}`}
        />
        {errors?.email && (
          <span className="text-[var(--color-red)] text-[11px] font-mono mt-1">
            {errors.email}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 text-[var(--color-dark-red)] text-[12px] font-mono font-medium">
        <Checkbox checked={sendEmail} onChange={setSendEmail} />
        <span>
          An Invitation email will be send to the email indicated. Client will
          be required to set up the pasword when first enter.
        </span>
      </div>
    </div>
  );
}
