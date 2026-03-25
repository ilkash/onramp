"use client";

import { useState } from "react";
import { adminService } from "@/services/adminService";
import { AxiosError } from "axios";

export function useAdminAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendCode = async (email: string) => {
    try {
      setLoading(true);
      setError("");

      const data = await adminService.login({ email });

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
      setError("");

      await adminService.verify({ code }, token);

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
  const resendCode = async (token: string) => {
    try {
      setLoading(true);
      await adminService.resendCode(token);
      return true;
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        setError(e.response?.data?.message || "Error");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    try {
      setLoading(true);
      setError("");

      await adminService.logout();

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
    resendCode,
    logout,
    loading,
    error,
  };
}
