"use client";

import { useEffect, useState } from "react";
import StatusSuccessIcon from "./ui/icons/StatusSuccessIcon";
import { ThemedText } from "./ui/ThemedText";
import Button from "./ui/Button";

type CompanyFormValues = {
  companyName: string;
  registrationNumber: string;
  country: string;
  contactPerson: string;
  phone: string;
  email: string;
  confirm: boolean;
};

type Props = {
  initialData?: {
    companyName?: string;
    registrationNumber?: string;
    country?: string;
    contactPerson?: string;
    phone?: string;
    email?: string;
    status?: "active" | "inactive";
    kyc?: boolean;
  };
  onSave?: (form: CompanyFormValues) => void;
};

export default function CompanyProfileForm({ initialData, onSave }: Props) {
  const [form, setForm] = useState<CompanyFormValues>({
    companyName: "",
    registrationNumber: "",
    country: "",
    contactPerson: "",
    phone: "",
    email: "",
    confirm: true,
  });

  useEffect(() => {
    if (!initialData) return;

    setForm({
      companyName: initialData.companyName ?? "",
      registrationNumber: initialData.registrationNumber ?? "",
      country: initialData.country ?? "",
      contactPerson: initialData.contactPerson ?? "",
      phone: initialData.phone ?? "",
      email: initialData.email ?? "",
      confirm: true,
    });
  }, [initialData]);

  const handleChange = (
    key: keyof CompanyFormValues,
    value: string | boolean,
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    if (!form.confirm) return;

    onSave?.({
      ...form,
      companyName: form.companyName.trim(),
      registrationNumber: form.registrationNumber.trim(),
      contactPerson: form.contactPerson.trim(),
      country: form.country.toUpperCase(),
    });
  };

  return (
    <div className="min-w-[600px] w-full">
      <div className="flex items-center justify-between mb-[28px]">
        <div className="flex items-center gap-4">
          <span className="text-[14px] font-mono uppercase">
            ACCOUNT STATUS
          </span>

          <div className="bg-[var(--color-green)] text-white px-5 py-1 rounded-full text-[14px] font-semibold">
            {initialData?.status === "inactive" ? "Inactive" : "Active"}
          </div>
        </div>

        <div className="flex items-center gap-2 text-[14px] font-mono">
          {initialData?.kyc && <StatusSuccessIcon />}
          <span>KYC Status</span>
        </div>
      </div>

      <div className="mb-[20px]">
        <ThemedText type="input_individual">Company name</ThemedText>
        <input
          value={form.companyName}
          onChange={(e) => handleChange("companyName", e.target.value)}
          className="w-full border-b border-black/60 py-[10px]"
        />
      </div>

      <div className="mb-[20px]">
        <ThemedText type="input_individual">Company number</ThemedText>
        <input
          value={form.registrationNumber}
          onChange={(e) => handleChange("registrationNumber", e.target.value)}
          className="w-full border-b border-black/60 py-[10px]"
        />
      </div>

      <div className="mb-[20px]">
        <ThemedText type="input_individual">Country</ThemedText>
        <select
          value={form.country}
          onChange={(e) => handleChange("country", e.target.value)}
          className="w-full border-b border-black/60 py-[10px] cursor-pointer"
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

      <div className="mb-[20px]">
        <ThemedText type="input_individual">Authorized person</ThemedText>
        <input
          value={form.contactPerson}
          onChange={(e) => handleChange("contactPerson", e.target.value)}
          className="w-full border-b border-black/60 py-[10px]"
        />
      </div>

      <div className="mb-[20px]">
        <ThemedText type="input_individual">Email</ThemedText>
        <input
          value={form.email}
          disabled
          className="w-full border-b border-black/60 py-[10px]"
        />
      </div>

      <div className="mb-[20px]">
        <ThemedText type="input_individual">Phone number</ThemedText>
        <input
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="w-full border-b border-black/60 py-[10px]"
        />
      </div>

      <div className="flex items-center gap-3 mb-[70px]">
        <div
          onClick={() => handleChange("confirm", !form.confirm)}
          className="w-[20px] h-[20px] bg-red-600 flex items-center justify-center cursor-pointer"
        >
          {form.confirm && <span className="text-white">✓</span>}
        </div>

        <span className="text-[12px] text-[#E60A14] font-mono">
          I certify that the provided information is true and correct
        </span>
      </div>

      <div className="flex justify-center">
        <Button
          styleType="confirm"
          onClick={handleSave}
          className="flex items-center justify-center text-[24px] text-black font-mono font-semibold cursor-pointer transition-transform hover:scale-105 "
        >
          [SAVE]
        </Button>
      </div>
    </div>
  );
}
