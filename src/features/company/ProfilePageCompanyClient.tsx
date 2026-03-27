"use client";

import { useEffect, useState } from "react";
import CompanyProfileForm from "@/components/CompanyProfileForm";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import { useAuthContext } from "@/context/AuthContext";
import Toast from "@/components/ui/Toast";

export default function CompanyProfilePage() {
  const { profile, fetchProfile, saveProfile } = useCompanyProfile();
  const { email } = useAuthContext();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (!email) return;
    fetchProfile(email);
  }, [email]);

  if (!email) return null;
  if (!profile) return null; // ← ось це було відсутнє

  return (
    <div className="flex justify-center">
      <div className="mt-[55px]">
        <CompanyProfileForm
          initialData={{
            companyName: profile.companyName || "",
            registrationNumber: profile.registrationNumber || "",
            country: profile.country || "",
            contactPerson: profile.contactPerson || "",
            phone: profile.phone || "",
            email,
            status: "active",
            kyc: true,
          }}
          onSave={async (form) => {
            const success = await saveProfile({
              email,
              phone: form.phone,
              country: form.country.toUpperCase(),
              companyName: form.companyName,
              registrationNumber: form.registrationNumber,
              contactPerson: form.contactPerson,
            });

            if (success) {
              setToast({ message: "Profile saved!", type: "success" });
            } else {
              setToast({ message: "Something went wrong", type: "error" });
            }
          }}
        />
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
