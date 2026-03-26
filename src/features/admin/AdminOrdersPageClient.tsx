"use client";

import { useEffect, useState } from "react";
import Table, { Column } from "@/components/ui/Table/Table";
import TopBarAction from "@/components/ui/TopBarAction";
import Pagination from "@/components/ui/Pagination";

import { useAdminOrders } from "@/hooks/useAdminOrders";
import CopyHash from "@/components/ui/CopyHash";

const columns: Column[] = [
  {
    key: "accountId",
    label: "Account ID",
    width: "170px",
    render: (value: unknown) => {
      const str = String(value);
      return str.length > 13 ? str.slice(0, 13) + "..." : str;
    },
  },
  {
    key: "transactionId",
    label: "Transaction ID",
    width: "160px",
    render: (value: unknown) => {
      const str = String(value);
      return str.length > 13 ? str.slice(0, 13) + "..." : str;
    },
  },
  { key: "date", label: "Time and date", width: "180px" },
  { key: "pay", label: "Pay,€", width: "140px" },
  { key: "receive", label: "You receive", width: "120px" },
  { key: "method", label: "Payment method", width: "160px" },
  {
    key: "hash",
    label: "Transaction HASH",
    width: "200px",
    render: (value) => <CopyHash value={String(value)} />,
  },
  { key: "type", label: "Type", width: "100px" },
  { key: "status", label: "Status", width: "120px" },
  { key: "actions", label: "Actions", width: "80px", filterable: false },
];

export default function AdminOrdersPageClient() {
  const PAGE_SIZE = 5;

  const { orders, fetchOrders } = useAdminOrders();

  const [visibleCount, setVisibleCount] = useState(2);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, []);

  const mappedData = orders.map((o) => ({
    accountId: o.userId,
    transactionId: o.id,
    date: new Date(o.createdAt).toLocaleString(),
    pay: o.fiatAmount,
    receive: `${o.cryptoAmount} ${o.pair.cryptoAsset.symbol}`,
    method: o.paymentMethod,
    hash: o.depositAddress,
    type: o.network.label,
    status: o.status,
  }));

  const totalPages = Math.ceil(mappedData.length / PAGE_SIZE);

  const isShowAll = visibleCount >= mappedData.length;

  const visibleData = isShowAll
    ? mappedData
    : mappedData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="w-full px-1 2xl:px-5">
      <div className="w-full">
        <TopBarAction
          onRefresh={() => {
            setVisibleCount(PAGE_SIZE);
            setPage(1);
          }}
          onExport={() => console.log("export")}
          showCreateButton
        />
      </div>

      <div className="w-full">
        <Table columns={columns} data={visibleData} />
      </div>

      <div className="w-full">
        <Pagination
          page={page}
          totalPages={totalPages}
          onChange={setPage}
          totalItems={mappedData.length}
          visibleItems={visibleCount}
          onShowAll={() => {
            setVisibleCount(mappedData.length);
            setPage(1);
          }}
        />
      </div>
    </div>
  );
}
