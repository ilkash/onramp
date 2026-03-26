"use client";

import { ThemedText } from "../ui/ThemedText";

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
};

export default function CompanyForm({ value, onChange }: Props) {
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
          className="border-b py-2 w-full outline-none"
        />
      </div>

      <div className="mb-[15px] flex flex-col">
        <ThemedText type="formModal">Company Number</ThemedText>
        <input
          value={value.registrationNumber}
          onChange={(e) => onChange("registrationNumber", e.target.value)}
          placeholder="RT3454555444"
          className="border-b py-2 w-full outline-none"
        />
      </div>

      <div className="mb-[15px] flex flex-col">
        <ThemedText type="formModal">Country</ThemedText>
        <select
          value={value.country}
          onChange={(e) => onChange("country", e.target.value)}
          className="border-b border-[#262932] py-2 text-[14px] bg-transparent cursor-pointer outline-none"
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
      </div>

      <div className="mb-[15px] flex flex-col">
        <ThemedText type="formModal">Authorized Person</ThemedText>
        <input
          value={value.contactPerson}
          onChange={(e) => onChange("contactPerson", e.target.value)}
          placeholder="Steve Anderson"
          className="border-b py-2 w-full outline-none"
        />
      </div>

      <div className="mb-[15px] flex flex-col">
        <ThemedText type="formModal">E-mail</ThemedText>
        <input
          value={value.email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="coin.tradesal@gmail.com"
          className="border-b py-2 w-full outline-none"
        />
      </div>

      <div className="mb-[10px] flex flex-col">
        <ThemedText type="formModal">Phone number</ThemedText>
        <input
          value={value.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="+39 344 5146586"
          className="border-b py-2 w-full outline-none"
        />
      </div>

      <div className="flex items-center gap-2 text-[var(--color-dark-red)] text-[12px] font-mono font-medium">
        <input type="checkbox" defaultChecked />
        <span>An invitation email will be send to the email indicated.</span>
      </div>
    </div>
  );
}
