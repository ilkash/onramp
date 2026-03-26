import { useState } from "react";
import { adminClientService } from "@/services/adminService";
import { AxiosError } from "axios";

export const useAdminCreateClient = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createIndividual = async (data: {
    email: string;
    phone: string;
    fullName: string;
    country: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      await adminClientService.createIndividual(data);
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

  const createCompany = async (data: {
    email: string;
    phone: string;
    companyName: string;
    registrationNumber: string;
    country: string;
    contactPerson: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      await adminClientService.createCompany(data);
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
  const updateIndividual = async (
    userId: string,
    data: {
      email: string;
      phone: string;
      fullName: string;
      country: string;
    },
  ) => {
    try {
      setLoading(true);
      setError(null);
      await adminClientService.updateIndividual(userId, data);
      return true;
    } catch (e: unknown) {
      if (e instanceof AxiosError)
        setError(e.response?.data?.message || "Error");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateCompany = async (
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
    try {
      setLoading(true);
      setError(null);
      await adminClientService.updateCompany(userId, data);
      return true;
    } catch (e: unknown) {
      if (e instanceof AxiosError)
        setError(e.response?.data?.message || "Error");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createIndividual,
    createCompany,
    updateIndividual,
    updateCompany,
    loading,
    error,
  };
};
