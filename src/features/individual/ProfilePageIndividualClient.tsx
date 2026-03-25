"use client";

import { useEffect } from "react";
import IndividualProfileForm from "@/components/IndividualProfileForm";
import { useIndividualProfile } from "@/hooks/useIndividualProfile";
import { useAuthContext } from "@/context/AuthContext";

export default function ProfilePageIndividualClient() {
  const { profile, fetchProfile, saveProfile } = useIndividualProfile();
  const { email } = useAuthContext();

  useEffect(() => {
    if (!email) return;
    fetchProfile(email);
  }, [email]);

  if (!email) return null;
  if (!profile) return null;

  const fullName = profile.fullName || "";
  const [firstName = "", lastName = ""] = fullName.split(" ");

  return (
    <div className="flex justify-center">
      <div className="mt-[55px]">
        <IndividualProfileForm
          initialData={{
            firstName,
            lastName,
            country: profile.country || "",
            phone: profile.phone || "",
            email: email,
            status: "active",
            kyc: true,
          }}
          onSave={(form) => {
            saveProfile({
              email: email,
              phone: form.phone,
              country: form.country.toUpperCase(),
              fullName: `${form.firstName} ${form.lastName}`.trim(),
            });
          }}
        />
      </div>
    </div>
  );
}
