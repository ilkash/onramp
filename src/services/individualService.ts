import { api } from "@/api/axios";
import {
  CreateIndividualProfilePayload,
  IndividualOrder,
  IndividualProfile,
  UpdateIndividualProfilePayload,
} from "@/types/individualTypes";

export const individualOrderService = {
  getOrders: async (): Promise<IndividualOrder[]> => {
    const res = await api.get("/transactions");
    return res.data;
  },
};
export const individualService = {
  getProfilesByEmail: async (email: string): Promise<IndividualProfile[]> => {
    const res = await api.get("/registrations", {
      params: {
        email,
        userType: "INDIVIDUAL",
      },
    });

    return res.data;
  },

  createProfile: async (
    data: CreateIndividualProfilePayload,
  ): Promise<IndividualProfile> => {
    const res = await api.post("/registrations/individual", data);
    return res.data;
  },

  updateProfile: async (
    id: string,
    data: UpdateIndividualProfilePayload,
  ): Promise<IndividualProfile> => {
    const res = await api.patch(`/registrations/${id}`, data);
    return res.data;
  },
};
