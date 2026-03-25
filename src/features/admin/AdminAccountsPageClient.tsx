"use client";

import { useEffect, useState } from "react";
import Table from "@/components/ui/Table/Table";
import TopBarAction from "@/components/ui/TopBarAction";
import Pagination from "@/components/ui/Pagination";
import { useAdminAccounts } from "@/hooks/useAdminAccounts";

const columns = [
  { key: "id", label: "Account ID", className: "" },
  { key: "registration", label: "Registration", className: "" },
  { key: "email", label: "E-mail", className: "" },
  { key: "name", label: "Name", className: "" },
  { key: "country", label: "Country", className: "" },
  { key: "total", label: "Total", className: "" },
  { key: "type", label: "Type", className: "" },
  { key: "kyc", label: "KYC", filterable: false },
  { key: "status", label: "Status" },
  { key: "actions", label: "Actions", filterable: false },
];

export default function AdminAccountsPageClient() {
  const PAGE_SIZE = 5;

  const { accounts, fetchAccounts } = useAdminAccounts();

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const mappedData = accounts.map((item) => ({
    id: item.id,
    registration: new Date(item.createdAt).toLocaleDateString(),
    email: item.email,
    name: item.name || "-",
    country: item.country || "-",
    total: item.totalSum,
    type: item.types?.join(", ") || "-",
    kyc: true,
    status: "active",
  }));

  const totalPages = Math.ceil(mappedData.length / PAGE_SIZE);

  const isShowAll = visibleCount >= mappedData.length;

  const visibleData = isShowAll
    ? mappedData
    : mappedData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="w-full px-2 2xl:px-6">
      <TopBarAction
        onRefresh={() => {
          fetchAccounts();
          setVisibleCount(PAGE_SIZE);
          setPage(1);
        }}
        onExport={() => console.log("export accounts")}
        showCreateButton
      />

      <Table columns={columns} data={visibleData} />

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
  );
}
