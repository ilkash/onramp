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
    try {
      if (!profile) {
        const created = await individualService.createProfile(
          form as CreateIndividualProfilePayload,
        );
        setProfile(created);
      } else {
        const updated = await individualService.updateProfile(
          profile.id,
          form as UpdateIndividualProfilePayload,
        );
        console.log("updated phone:", updated.phone);
        setProfile((prev) => ({
          ...prev!,
          ...updated,
          email: prev!.email,
        }));
      }
      return true;
    } catch {
      return false;
    }
  };

  return {
    profile,
    loading,
    fetchProfile,
    saveProfile,
  };
};
