import { useState } from "react";
import { companyService } from "@/services/companyService";
import {
  CompanyProfile,
  CreateCompanyProfilePayload,
  UpdateCompanyProfilePayload,
} from "@/types/companyTypes";

type FormPayload = {
  email: string;
  phone: string;
  companyName: string;
  registrationNumber: string;
  country: string;
  contactPerson: string;
};

export const useCompanyProfile = () => {
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async (email: string) => {
    try {
      setLoading(true);

      const data = await companyService.getProfilesByEmail(email);

      if (data.length > 0) {
        setProfile(data[0]);
      } else {
        setProfile(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async (form: FormPayload) => {
    if (!profile) {
      const created = await companyService.createProfile(
        form as CreateCompanyProfilePayload,
      );
      setProfile(created);
      return;
    }

    const updated = await companyService.updateProfile(
      profile.id,
      form as UpdateCompanyProfilePayload,
    );

    setProfile((prev) => ({
      ...prev!,
      ...updated,
      email: prev!.email,
    }));
  };

  return {
    profile,
    loading,
    fetchProfile,
    saveProfile,
  };
};
