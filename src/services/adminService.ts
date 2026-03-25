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
      "/auth/resend-code",
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
