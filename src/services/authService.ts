import { api } from "@/api/axios";

export const authService = {
  login: async (email: string, userType: "INDIVIDUAL" | "COMPANY") => {
    const { data } = await api.post("/auth/login", {
      email,
      userType,
    });

    return data;
  },

  verify: async (code: string, token: string) => {
    const { data } = await api.post(
      "/auth/verify-code",
      { code },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data;
  },

  resend: async (token: string) => {
    const { data } = await api.post(
      "/auth/resend-code",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  },
  logout: async () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    const { data } = await api.post(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data;
  },
};
