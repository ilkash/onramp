"use client";
import { ReactNode, useMemo, useState } from "react";
import StatusErrorIcon from "@/components/ui/icons/StatusErrorIcon";
import StatusSuccessIcon from "@/components/ui/icons/StatusSuccessIcon";
import EditIcon from "@/components/ui/icons/EditIcon";
import StatusBadge from "@/components/ui/StatusBadge";
import CheckIcon from "../icons/CheckIcon";
import FailedIcon from "../icons/FailedIcon";
import ClearFiltersIcon from "../icons/ClearFiltersIcon";

export type TableRow = Record<
  string,
  string | number | boolean | null | undefined
>;
export type Column = {
  key: string;
  label: string;
  width?: string;
  filterable?: boolean;
  render?: (value: TableRow[keyof TableRow], row: TableRow) => ReactNode;
};

type TableProps = {
  columns: Column[];
  data: TableRow[];
};

export default function Table({ columns, data }: TableProps) {
  const [filters, setFilters] = useState<Record<string, string>>({});

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      columns.every((col) => {
        const value = filters[col.key];
        if (!value) return true;
        const cell = row[col.key];
        if (cell === undefined || cell === null) return false;
        return String(cell).toLowerCase().includes(value.toLowerCase());
      }),
    );
  }, [filters, data, columns]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => setFilters({});

  const hasActiveFilters = Object.values(filters).some((v) => v !== "");

  return (
    <div className="w-full border border-[var(--color-gray)]">
      <table className="w-full table-auto border-collapse font-[var(--font-open-sans)] text-black text-[12px] 2xl:text-[14px]">
        <colgroup>
          {columns.map((col) => (
            <col key={col.key} />
          ))}
        </colgroup>

        <thead className="bg-[var(--color-gray)] border-b border-[var(--color-gray)]">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-1 2xl:px-2 py-2 2xl:py-3 font-normal text-left whitespace-nowrap font-mono text-[14px]"
              >
                {col.label}
              </th>
            ))}
          </tr>

          <tr className="bg-white border-b border-[var(--color-gray)]">
            {columns.map((col, index) => {
              const isLast = index === columns.length - 1;
              return (
                <th key={col.key} className="px-1 2xl:px-2 py-2 2xl:py-3">
                  {isLast ? (
                    <button
                      onClick={clearFilters}
                      className={`flex items-center justify-center w-full h-[20px] 2xl:h-[22px] font-mono text-[14px] transition-opacity ${
                        hasActiveFilters
                          ? "opacity-100 cursor-pointer"
                          : "opacity-30 cursor-default"
                      }`}
                    >
                      <ClearFiltersIcon />
                    </button>
                  ) : col.filterable !== false ? (
                    <input
                      className="w-full h-[20px] 2xl:h-[22px] border border-[#D9D9D9] px-1 2xl:px-2 text-[11px] 2xl:text-[12px]"
                      value={filters[col.key] || ""}
                      onChange={(e) =>
                        handleFilterChange(col.key, e.target.value)
                      }
                    />
                  ) : null}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-6 text-center font-mono text-[12px] text-gray-400"
              >
                No data found
              </td>
            </tr>
          ) : (
            filteredData.map((row, index) => (
              <tr
                key={index}
                className="border-b border-[var(--color-gray)] last:border-b-0"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-2 2xl:px-4 py-2 2xl:py-3 whitespace-nowrap font-mono text-[12px]"
                  >
                    {col.render
                      ? col.render(row[col.key], row)
                      : renderCell(row, col.key)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function renderCell(row: TableRow, key: string) {
  if (key === "status") {
    if (row.status === "active" || row.status === "inactive") {
      return row.status === "active" ? (
        <StatusBadge status="active">
          <CheckIcon />
        </StatusBadge>
      ) : (
        <StatusBadge status="inactive">
          <FailedIcon />
        </StatusBadge>
      );
    }

    if (row.status === "done" || row.status === "canceled") {
      const isDone = row.status === "done";
      return (
        <div className="flex items-center gap-1 lg:gap-2">
          <div className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px] flex items-center justify-center font-mono text-[12px]">
            {isDone ? <StatusSuccessIcon /> : <StatusErrorIcon />}
          </div>
          <span className="text-[12px] lg:text-[14px] font-mono">
            {isDone ? "Done" : "Canceled"}
          </span>
        </div>
      );
    }
  }

  if (key === "actions") return <EditIcon />;
  if (key === "kyc")
    return row.kyc ? <StatusSuccessIcon /> : <StatusErrorIcon />;

  return row[key];
}
