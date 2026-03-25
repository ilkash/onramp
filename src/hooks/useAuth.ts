import { useState } from "react";
import { authService } from "@/services/authService";
import { AxiosError } from "axios";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendCode = async (
    email: string,
    userType: "INDIVIDUAL" | "COMPANY",
  ) => {
    try {
      setLoading(true);
      setError(null);

      const data = await authService.login(email, userType);

      return data;
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        setError(e.response?.data?.message || "Error");
      } else {
        setError("Unexpected error");
      }

      return null;
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async (code: string, token: string) => {
    try {
      setLoading(true);
      setError(null);

      await authService.verify(code, token);

      return true;
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        setError(e.response?.data?.message || "Error");
      } else {
        setError("Unexpected error");
      }

      return null;
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    try {
      setLoading(true);
      setError(null);

      await authService.logout();

      return true;
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        setError(e.response?.data?.message || "Error");
      } else {
        setError("Unexpected error");
      }

      return false;
    } finally {
      setLoading(false);
    }
  };
  return {
    sendCode,
    verifyCode,
    logout,
    loading,
    error,
  };
};
