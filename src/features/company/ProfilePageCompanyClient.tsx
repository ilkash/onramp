"use client";

import { useEffect } from "react";
import CompanyProfileForm from "@/components/CompanyProfileForm";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import { useAuthContext } from "@/context/AuthContext";

export default function CompanyProfilePage() {
  const { profile, fetchProfile, saveProfile } = useCompanyProfile();
  const { email } = useAuthContext();

  useEffect(() => {
    if (!email) return;
    fetchProfile(email);
  }, [email]);

  if (!email) return null;

  return (
    <div className="flex justify-center">
      <div className="mt-[55px]">
        <CompanyProfileForm
          initialData={{
            companyName: profile?.companyName || "",
            registrationNumber: profile?.registrationNumber || "",
            country: profile?.country || "",
            contactPerson: profile?.contactPerson || "",
            phone: profile?.phone || "",
            email: email,
            status: "active",
            kyc: true,
          }}
          onSave={(form) => {
            saveProfile({
              email: email,
              phone: form.phone,
              country: form.country.toUpperCase(),
              companyName: form.companyName,
              registrationNumber: form.registrationNumber,
              contactPerson: form.contactPerson,
            });
          }}
        />
      </div>
    </div>
  );
}
