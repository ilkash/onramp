import { api } from "@/api/axios";
import {
  Account,
  AdminLoginPayload,
  AdminLoginResponse,
  AdminVerifyPayload,
  Order,
} from "@/types/adminTypes";

export const adminService = {
  login: async (data: AdminLoginPayload): Promise<AdminLoginResponse> => {
    const res = await api.post<AdminLoginResponse>("/admin/login", data);
    return res.data;
  },
  logout: async () => {
    const res = await api.post("/admin/logout");
    return res.data;
  },
  verify: async (data: AdminVerifyPayload, token: string) => {
    const res = await api.post("/admin/verify-code", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  },
  resendCode: async (token: string) => {
    const res = await api.post(
      "/admin/resend-code",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  },
};
export const adminAccountService = {
  getAccounts: async (): Promise<Account[]> => {
    const res = await api.get("/admin/accounts");
    return res.data;
  },
};
export const adminOrderService = {
  getOrders: async (): Promise<Order[]> => {
    const res = await api.get("/admin/orders");
    return res.data;
  },
};
export const adminClientService = {
  createIndividual: async (data: {
    email: string;
    phone: string;
    fullName: string;
    country: string;
  }) => {
    const res = await api.post("/admin/clients/individual", data);
    return res.data;
  },

  createCompany: async (data: {
    email: string;
    phone: string;
    companyName: string;
    registrationNumber: string;
    country: string;
    contactPerson: string;
  }) => {
    const res = await api.post("/admin/clients/company", data);
    return res.data;
  },
  updateIndividual: async (
    userId: string,
    data: {
      email: string;
      phone: string;
      fullName: string;
      country: string;
    },
  ) => {
    const res = await api.patch(`/admin/clients/individual/${userId}`, data);
    return res.data;
  },

  updateCompany: async (
    userId: string,
    data: {
      email: string;
      phone: string;
      companyName: string;
      registrationNumber: string;
      country: string;
      contactPerson: string;
    },
  ) => {
    const res = await api.patch(`/admin/clients/company/${userId}`, data);
    return res.data;
  },
};
