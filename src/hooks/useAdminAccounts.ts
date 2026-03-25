import { useState } from "react";
import { adminAccountService } from "@/services/adminService";
import { Account } from "@/types/adminTypes";

export const useAdminAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      const data = await adminAccountService.getAccounts();
      setAccounts(data);
    } catch (e) {
      console.error("Accounts error", e);
    } finally {
      setLoading(false);
    }
  };

  return {
    accounts,
    loading,
    fetchAccounts,
  };
};
