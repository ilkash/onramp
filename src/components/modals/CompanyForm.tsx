"use client";

import { useState } from "react";
import Checkbox from "../ui/CheckBox";
import PhoneInput from "../ui/PhoneInput";
import { ThemedText } from "../ui/ThemedText";

type CompanyErrors = Partial<
  Record<
    | "companyName"
    | "registrationNumber"
    | "country"
    | "contactPerson"
    | "email"
    | "phone",
    string
  >
>;

type Props = {
  value: {
    companyName: string;
    registrationNumber: string;
    country: string;
    contactPerson: string;
    email: string;
    phone: string;
  };
  onChange: (field: string, val: string) => void;
  onPhoneCodeChange?: (code: string) => void;
  initialPhone?: string;
  errors?: CompanyErrors;
};

export default function CompanyForm({
  value,
  onChange,
  onPhoneCodeChange,
  initialPhone,
  errors,
}: Props) {
  const [sendEmail, setSendEmail] = useState(true);
  return (
    <div>
      <h2 className="text-[var(--color-dark-red)] mb-[20px] text-[18px] font-mono font-medium">
        Company data
      </h2>

      <div className="mb-[15px] flex flex-col">
        <ThemedText type="formModal">Company name</ThemedText>
        <input
          value={value.companyName}
          onChange={(e) => onChange("companyName", e.target.value)}
          className={`border-b py-2 w-full outline-none ${errors?.companyName ? "border-[var(--color-red)]" : "border-[#262932]"}`}
        />
        {errors?.companyName && (
          <span className="text-[var(--color-red)] text-[11px] font-mono mt-1">
            {errors.companyName}
          </span>
        )}
      </div>

      <div className="mb-[15px] flex flex-col">
        <ThemedText type="formModal">Company Number</ThemedText>
        <input
          value={value.registrationNumber}
          onChange={(e) => onChange("registrationNumber", e.target.value)}
          placeholder="RT3454555444"
          className={`border-b py-2 w-full outline-none ${errors?.registrationNumber ? "border-[var(--color-red)]" : "border-[#262932]"}`}
        />
        {errors?.registrationNumber && (
          <span className="text-[var(--color-red)] text-[11px] font-mono mt-1">
            {errors.registrationNumber}
          </span>
        )}
      </div>

      <div className="mb-[15px] flex flex-col">
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

      <div className="mb-[15px] flex flex-col">
        <ThemedText type="formModal">Authorized Person</ThemedText>
        <input
          value={value.contactPerson}
          onChange={(e) => onChange("contactPerson", e.target.value)}
          placeholder="Steve Anderson"
          className={`border-b py-2 w-full outline-none ${errors?.contactPerson ? "border-[var(--color-red)]" : "border-[#262932]"}`}
        />
        {errors?.contactPerson && (
          <span className="text-[var(--color-red)] text-[11px] font-mono mt-1">
            {errors.contactPerson}
          </span>
        )}
      </div>

      <div className="mb-[15px] flex flex-col">
        <ThemedText type="formModal">E-mail</ThemedText>
        <input
          value={value.email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="coin.tradesal@gmail.com"
          className={`border-b py-2 w-full outline-none ${errors?.email ? "border-[var(--color-red)]" : "border-[#262932]"}`}
        />
        {errors?.email && (
          <span className="text-[var(--color-red)] text-[11px] font-mono mt-1">
            {errors.email}
          </span>
        )}
      </div>

      <div className="mb-[10px] flex flex-col">
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
