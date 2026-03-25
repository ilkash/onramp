import { useState } from "react";
import { individualOrderService } from "@/services/individualService";
import { IndividualOrder } from "@/types/individualTypes";

export const useIndividualOrders = () => {
  const [orders, setOrders] = useState<IndividualOrder[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await individualOrderService.getOrders();
      setOrders(data);
    } catch (e) {
      console.error("Individual orders error", e);
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
