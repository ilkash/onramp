import { useState } from "react";
import { individualService } from "@/services/individualService";
import {
  IndividualProfile,
  CreateIndividualProfilePayload,
  UpdateIndividualProfilePayload,
} from "@/types/individualTypes";

type FormPayload = {
  email: string;
  phone: string;
  fullName: string;
  country: string;
};

export const useIndividualProfile = () => {
  const [profile, setProfile] = useState<IndividualProfile | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async (email: string) => {
    try {
      setLoading(true);

      const data = await individualService.getProfilesByEmail(email);
      // const found = data.find((item) => item.email === email) || null;

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
      const created = await individualService.createProfile(
        form as CreateIndividualProfilePayload,
      );
      setProfile(created);
      return;
    }

    const updated = await individualService.updateProfile(
      profile.id,
      form as UpdateIndividualProfilePayload,
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
