"use client";

import { useEffect, useState } from "react";
import StatusSuccessIcon from "./ui/icons/StatusSuccessIcon";
import { ThemedText } from "./ui/ThemedText";
import Button from "./ui/Button";
import PhoneInput from "./ui/PhoneInput";
import { availableCountries } from "@/constants/countries";
import Checkbox from "./ui/CheckBox";

type ProfileFormValues = {
  firstName: string;
  lastName: string;
  country: string;
  phone: string;
  email: string;
  confirm: boolean;
};

type FormErrors = Partial<
  Record<"firstName" | "lastName" | "country" | "phone", string>
>;

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
  const [ready, setReady] = useState(false);
  const [form, setForm] = useState<ProfileFormValues>({
    firstName: "",
    lastName: "",
    country: "",
    phone: "",
    email: "",
    confirm: true,
  });
  const [phoneCode, setPhoneCode] = useState("+39");
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (!initialData) return;

    const rawPhone = initialData.phone ?? "";
    const detected = availableCountries
      .sort((a, b) => b.phoneCode.length - a.phoneCode.length)
      .find((c) => rawPhone.startsWith(c.phoneCode));

    const phoneDigits = detected
      ? rawPhone.replace(detected.phoneCode, "").replace(/\D/g, "")
      : rawPhone;

    if (detected) setPhoneCode(detected.phoneCode);

    setForm({
      firstName: initialData.firstName ?? "",
      lastName: initialData.lastName ?? "",
      country: initialData.country ?? "",
      phone: phoneDigits,
      email: initialData.email ?? "",
      confirm: true,
    });
    setReady(true);
  }, [initialData]);

  const handleChange = (
    key: keyof ProfileFormValues,
    value: string | boolean,
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const clearError = (key: keyof FormErrors) => {
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validatePhone = (phone: string) =>
    /^\d{6,14}$/.test(phone.replace(/\s/g, ""));

  const handleSave = () => {
    if (!form.confirm) return;

    const newErrors: FormErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.country) newErrors.country = "Country is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (!validatePhone(form.phone))
      newErrors.phone = "Invalid phone number";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const phone = form.phone.startsWith("+")
      ? form.phone.replace(/\s/g, "")
      : (phoneCode + form.phone).replace(/\s/g, "");

    onSave?.({
      ...form,
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      country: form.country.toUpperCase(),
      phone,
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
            onChange={(e) => {
              handleChange("firstName", e.target.value);
              clearError("firstName");
            }}
            className={`w-full border-b outline-none py-[10px] text-[14px] ${errors.firstName ? "border-[var(--color-red)]" : "border-black/60"}`}
          />
          {errors.firstName && (
            <span className="text-[var(--color-red)] text-[11px] font-mono">
              {errors.firstName}
            </span>
          )}
        </div>
        <div>
          <ThemedText type="input_individual">Last name</ThemedText>
          <input
            value={form.lastName}
            onChange={(e) => {
              handleChange("lastName", e.target.value);
              clearError("lastName");
            }}
            className={`w-full border-b outline-none py-[10px] text-[14px] ${errors.lastName ? "border-[var(--color-red)]" : "border-black/60"}`}
          />
          {errors.lastName && (
            <span className="text-[var(--color-red)] text-[11px] font-mono">
              {errors.lastName}
            </span>
          )}
        </div>
      </div>

      <div className="mb-[20px]">
        <ThemedText type="input_individual">Country</ThemedText>
        <select
          value={form.country}
          onChange={(e) => {
            handleChange("country", e.target.value);
            clearError("country");
          }}
          className={`w-full border-b outline-none py-[10px] text-[14px] bg-transparent cursor-pointer ${errors.country ? "border-[var(--color-red)]" : "border-black/60"}`}
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
        {errors.country && (
          <span className="text-[var(--color-red)] text-[11px] font-mono">
            {errors.country}
          </span>
        )}
      </div>

      <div className="mb-[20px]">
        <ThemedText type="input_individual">Your phone number</ThemedText>
        {ready && (
          <PhoneInput
            value={form.phone}
            onChange={(val) => {
              handleChange("phone", val);
              clearError("phone");
            }}
            onCountryChange={(code) => {
              setPhoneCode(code);
              handleChange("phone", "");
            }}
            initialPhone={initialData?.phone}
            error={!!errors.phone}
          />
        )}
        {errors.phone && (
          <span className="text-[var(--color-red)] text-[11px] font-mono">
            {errors.phone}
          </span>
        )}
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
        <Checkbox
          checked={form.confirm}
          onChange={(val) => handleChange("confirm", val)}
        />
        <span className="text-[12px] text-[#E60A14] font-mono font-medium">
          I certify that the provided information is true and correct
        </span>
      </div>

      <div className="flex justify-center">
        <Button
          styleType="confirm"
          onClick={handleSave}
          className="flex items-center justify-center text-[24px] text-black font-mono font-semibold cursor-pointer transition-transform hover:scale-105"
        >
          [SAVE]
        </Button>
      </div>
    </div>
  );
}
