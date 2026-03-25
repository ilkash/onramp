import { useState } from "react";
import { adminOrderService } from "@/services/adminService";
import { Order } from "@/types/adminTypes";

export const useAdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await adminOrderService.getOrders();
      setOrders(data);
    } catch (e) {
      console.error("Orders error", e);
    } finally {
      setLoading(false);
    }
  };

  return {
    orders,
    loading,
    fetchOrders,
  };
};
