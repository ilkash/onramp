"use client";

import { useEffect, useState } from "react";
import IndividualProfileForm from "@/components/IndividualProfileForm";
import { useIndividualProfile } from "@/hooks/useIndividualProfile";
import { useAuthContext } from "@/context/AuthContext";
import Toast from "@/components/ui/Toast";

export default function ProfilePageIndividualClient() {
  const { profile, fetchProfile, saveProfile } = useIndividualProfile();
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
  if (!profile) return null;

  const fullName = profile.fullName || "";
  const parts = fullName.trim().split(/[\s+]+/);
  const firstName = parts[0] ?? "";
  const lastName = parts.slice(1).join(" ");

  return (
    <div className="flex justify-center">
      <div className="mt-[55px]">
        <IndividualProfileForm
          initialData={{
            firstName,
            lastName,
            country: profile.country || "",
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
              fullName: `${form.firstName} ${form.lastName}`.trim(),
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
