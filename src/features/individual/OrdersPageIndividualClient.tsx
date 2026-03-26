"use client";

import { useEffect, useState } from "react";
import Table from "@/components/ui/Table/Table";
import TopBarAction from "@/components/ui/TopBarAction";
import Pagination from "@/components/ui/Pagination";
import { useIndividualOrders } from "@/hooks/useIndividualOrders";
import CopyHash from "@/components/ui/CopyHash";

const columns = [
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
  { key: "pay", label: "You pay, EURO", width: "140px" },
  { key: "receive", label: "You receive", width: "120px" },
  { key: "method", label: "Payment method", width: "160px" },
  {
    key: "hash",
    label: "Transaction HASH",
    width: "200px",
    render: (value: unknown) => <CopyHash value={String(value)} />,
  },
  { key: "type", label: "Type", width: "100px" },
  { key: "status", label: "Status", width: "120px" },
  { key: "actions", label: "Actions", width: "80px", filterable: false },
];

export default function OrdersPageIndividualClient() {
  const { orders, fetchOrders } = useIndividualOrders();

  useEffect(() => {
    fetchOrders();
  }, []);
  const mappedData = orders.map((item) => ({
    accountId: item.userId,
    transactionId: item.id,
    date: new Date(item.createdAt).toLocaleString(),

    pay: item.fiatAmount,
    receive: `${item.cryptoAmount} ${item.pair.cryptoAsset.symbol}`,

    method: item.paymentMethod,
    hash: item.depositAddress,

    type: item.paymentMethod,
    status: item.status,
  }));
  const PAGE_SIZE = 2;

  const [visibleCount, setVisibleCount] = useState(2);
  const [page, setPage] = useState(1);

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
