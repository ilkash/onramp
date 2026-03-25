import { api } from "@/api/axios";
import {
  CompanyProfile,
  CreateCompanyProfilePayload,
  UpdateCompanyProfilePayload,
} from "@/types/companyTypes";

export const companyService = {
  getProfilesByEmail: async (email: string): Promise<CompanyProfile[]> => {
    const res = await api.get("/registrations", {
      params: {
        email,
        userType: "COMPANY",
      },
    });

    return res.data;
  },

  createProfile: async (
    data: CreateCompanyProfilePayload,
  ): Promise<CompanyProfile> => {
    const res = await api.post("/registrations/company", data);
    return res.data;
  },

  updateProfile: async (
    id: string,
    data: UpdateCompanyProfilePayload,
  ): Promise<CompanyProfile> => {
    const res = await api.patch(`/registrations/${id}`, data);
    return res.data;
  },
};
