"use client";

import { useEffect, useState } from "react";
import Table, { TableRow } from "@/components/ui/Table/Table";
import TopBarAction from "@/components/ui/TopBarAction";
import Pagination from "@/components/ui/Pagination";
import { useAdminAccounts } from "@/hooks/useAdminAccounts";
import CreateClientModal from "@/components/modals/CreateClientModal";
import EditIcon from "@/components/ui/icons/EditIcon";

export default function AdminAccountsPageClient() {
  const [editModal, setEditModal] = useState<{
    open: boolean;
    data?: Parameters<typeof CreateClientModal>[0]["editData"];
  }>({ open: false });
  const columns = [
    {
      key: "id",
      label: "Account ID",
      className: "",
      render: (value: unknown) => {
        const str = String(value);
        return str.length > 13 ? str.slice(0, 13) + "..." : str;
      },
    },
    { key: "registration", label: "Registration", className: "" },
    { key: "email", label: "E-mail", className: "" },
    { key: "name", label: "Name", className: "" },
    { key: "country", label: "Country", className: "" },
    { key: "total", label: "Total", className: "" },
    { key: "type", label: "Type", className: "" },
    { key: "kyc", label: "KYC", filterable: false },
    { key: "status", label: "Status" },
    {
      key: "actions",
      label: "Actions",
      filterable: false,
      render: (_: unknown, row: TableRow) => (
        <button
          onClick={() => {
            const account = accounts.find((a) => a.id === row.id);
            if (!account?.registration) return;
            setEditModal({
              open: true,
              data: {
                userId: account.id,
                userType: account.registration.userType,
                individual:
                  account.registration.userType === "INDIVIDUAL"
                    ? {
                        fullName: account.registration.fullName ?? "",
                        country: account.registration.country ?? "",
                        phone: account.registration.phone ?? "",
                        email: account.email,
                      }
                    : undefined,
                company:
                  account.registration.userType === "COMPANY"
                    ? {
                        companyName: account.registration.companyName ?? "",
                        registrationNumber:
                          account.registration.registrationNumber ?? "",
                        country: account.registration.country ?? "",
                        contactPerson: account.registration.contactPerson ?? "",
                        email: account.email,
                        phone: account.registration.phone ?? "",
                      }
                    : undefined,
              },
            });
          }}
          className="cursor-pointer hover:scale-110 transition-transform"
        >
          <EditIcon />
        </button>
      ),
    },
  ];
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
    <>
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
      <CreateClientModal
        open={editModal.open}
        onClose={() => setEditModal({ open: false })}
        editData={editModal.data}
        onSuccess={() => fetchAccounts()}
      />
    </>
  );
}
