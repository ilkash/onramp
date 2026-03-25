"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Logo from "@/components/ui/icons/Logo";
import IndividualForm from "./IndividualForm";
import CompanyForm from "./CompanyForm";
import { individualService } from "@/services/individualService";
import { companyService } from "@/services/companyService";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Tab = "individual" | "company";

export default function CreateClientModal({ open, onClose }: Props) {
  const [tab, setTab] = useState<Tab>("individual");
  const [loading, setLoading] = useState(false);

  const [individualForm, setIndividualForm] = useState({
    fullName: "",
    country: "",
    phone: "",
    email: "",
  });

  const [companyForm, setCompanyForm] = useState({
    companyName: "",
    registrationNumber: "",
    country: "",
    contactPerson: "",
    email: "",
    phone: "",
  });

  const handleIndividualChange = (field: string, val: string) => {
    setIndividualForm((prev) => ({ ...prev, [field]: val }));
  };

  const handleCompanyChange = (field: string, val: string) => {
    setCompanyForm((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (tab === "individual") {
        await individualService.createProfile(individualForm);
      } else {
        await companyService.createProfile(companyForm);
      }
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex justify-between items-center mb-8">
        <Logo width={75} height={26} />

        <div className="flex">
          <button
            onClick={() => setTab("individual")}
            className={`w-[98px] h-[48px] border border-[var(--color-dark-red)] border-r-0 text-[14px] font-medium
            ${tab === "individual" ? "bg-[var(--color-red)] text-white" : "bg-white text-black hover:bg-[var(--color-red)] hover:text-white"}`}
          >
            INDIVIDUAL
          </button>
          <button
            onClick={() => setTab("company")}
            className={`w-[98px] h-[48px] border border-[var(--color-dark-red)] text-[14px] font-medium
            ${tab === "company" ? "bg-[var(--color-red)] text-white" : "bg-white text-black hover:bg-[var(--color-red)] hover:text-white"}`}
          >
            COMPANY
          </button>
        </div>
      </div>

      {tab === "individual" ? (
        <IndividualForm
          value={individualForm}
          onChange={handleIndividualChange}
        />
      ) : (
        <CompanyForm value={companyForm} onChange={handleCompanyChange} />
      )}

      <div className="flex justify-end mt-[41px]">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="text-[var(--color-red)] font-bold text-[24px]"
        >
          {loading ? "[LOADING...]" : "[CONFIRM AND PROCEED]"}
        </button>
      </div>
    </Modal>
  );
}
