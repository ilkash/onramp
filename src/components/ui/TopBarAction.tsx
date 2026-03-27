"use client";

import { useState } from "react";
import ExportIcon from "./icons/ExportIcon";
import PlusIcon from "./icons/PlusIcon";
import ReloadIcon from "./icons/ReloadIcon";
import { ThemedText } from "./ThemedText";
import CreateClientModal from "@/components/modals/CreateClientModal";

type Props = {
  onRefresh?: () => void;
  onExport?: () => void;
  showCreateButton?: boolean;
};

export default function TableToolbar({
  onRefresh,
  onExport,
  showCreateButton,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          {showCreateButton && (
            <button
              onClick={() => setOpen(true)}
              className="bg-[var(--color-blue)] text-white px-4 py-2 text-[14px] mb-[29px] flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <ThemedText type="button">Create new client</ThemedText>
              <PlusIcon />
            </button>
          )}
        </div>

        <div className="flex items-center justify-center gap-7">
          <button
            onClick={onExport}
            className="bg-[var(--color-red)] text-white px-4 py-2 text-[14px] mt-[9px] mb-[22px] cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="flex items-center gap-1 ">
              Exports CSV
              <ExportIcon />
            </div>
          </button>

          <button
            onClick={onRefresh}
            className="flex items-center justify-center cursor-pointer transition-transform hover:scale-115 mt-[9px] mb-[22px]"
          >
            <ReloadIcon />
          </button>
        </div>
      </div>

      <CreateClientModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
