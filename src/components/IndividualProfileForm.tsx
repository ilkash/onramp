"use client";

import { useEffect, useState } from "react";
import StatusSuccessIcon from "./ui/icons/StatusSuccessIcon";
import { ThemedText } from "./ui/ThemedText";
import Button from "./ui/Button";
import PhoneInput from "./ui/PhoneInput";

type ProfileFormValues = {
  firstName: string;
  lastName: string;
  country: string;
  phone: string;
  email: string;
  confirm: boolean;
};

type Props = {
  initialData?: {
    firstName?: string;
    lastName?: string;
    country?: string;
    phone?: string;
    email?: string;
    status?: "active" | "inactive";
    kyc?: boolean;
  };
  onSave?: (form: ProfileFormValues) => void;
};

export default function IndividualProfileForm({ initialData, onSave }: Props) {
  const [form, setForm] = useState<ProfileFormValues>({
    firstName: "",
    lastName: "",
    country: "",
    phone: "",
    email: "",
    confirm: true,
  });

  useEffect(() => {
    if (!initialData) return;

    setForm({
      firstName: initialData.firstName ?? "",
      lastName: initialData.lastName ?? "",
      country: initialData.country ?? "",
      phone: initialData.phone ?? "",
      email: initialData.email ?? "",
      confirm: true,
    });
  }, [initialData]);

  const handleChange = (
    key: keyof ProfileFormValues,
    value: string | boolean,
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    if (!form.confirm) return;

    const cleanedFirstName = form.firstName.trim();
    const cleanedLastName = form.lastName.trim();

    onSave?.({
      ...form,
      firstName: cleanedFirstName,
      lastName: cleanedLastName,
      country: form.country.toUpperCase(),
      phone: form.phone.replace(/\s+/g, ""),
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

      <div className="grid grid-cols-[270px_270px] gap-[60px] mb-[30px]">
        <div>
          <ThemedText type="input_individual">First name</ThemedText>
          <input
            value={form.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            className="w-full border-b border-black/60 outline-none py-[10px] text-[14px]"
          />
        </div>

        <div>
          <ThemedText type="input_individual">Last name</ThemedText>
          <input
            value={form.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            className="w-full border-b border-black/60 outline-none py-[10px] text-[14px]"
          />
        </div>
      </div>

      <div className="mb-[20px]">
        <ThemedText type="input_individual">Country</ThemedText>

        <select
          value={form.country}
          onChange={(e) => handleChange("country", e.target.value)}
          className="w-full border-b border-black/60 outline-none py-[10px] text-[14px] bg-transparent"
        >
          <option value="" disabled>
            Select country
          </option>
          <option value="ITALY">Italy</option>
          <option value="UKRAINE">Ukraine</option>
          <option value="POLAND">Poland</option>
        </select>
      </div>

      <div className="mb-[20px]">
        <ThemedText type="input_individual">Your phone number</ThemedText>
        <PhoneInput
          value={form.phone}
          onChange={(val) => handleChange("phone", val)}
        />
      </div>

      <div className="mb-2">
        <ThemedText type="input_individual">Your email</ThemedText>

        <input
          value={form.email}
          disabled
          className="w-full border-b border-black/60 outline-none py-[10px] text-[14px] text-black/70"
        />
      </div>

      <div className="flex items-center gap-3 mb-[70px]">
        <div
          onClick={() => handleChange("confirm", !form.confirm)}
          className="w-[20px] h-[20px] bg-red-600 flex items-center justify-center cursor-pointer"
        >
          {form.confirm && <span className="text-white text-[12px]">✓</span>}
        </div>

        <span className="text-[12px] text-[#E60A14] font-mono font-medium">
          I certify that the provided information is true and correct
        </span>
      </div>

      <div className="flex justify-center">
        <Button
          styleType="confirm"
          onClick={handleSave}
          disabled={!form.confirm}
        >
          [SAVE]
        </Button>
      </div>
    </div>
  );
}
