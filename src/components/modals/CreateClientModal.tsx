"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import Logo from "@/components/ui/icons/Logo";
import IndividualForm from "./IndividualForm";
import CompanyForm from "./CompanyForm";
import { useAdminCreateClient } from "@/hooks/useAdminCreateClient";

type Tab = "individual" | "company";

type Props = {
  open: boolean;
  onClose: () => void;
  editData?: {
    userId: string;
    userType: "INDIVIDUAL" | "COMPANY";
    individual?: {
      fullName: string;
      country: string;
      phone: string;
      email: string;
    };
    company?: {
      companyName: string;
      registrationNumber: string;
      country: string;
      contactPerson: string;
      email: string;
      phone: string;
    };
  };
  onSuccess?: () => void;
};

export default function CreateClientModal({
  open,
  onClose,
  editData,
  onSuccess,
}: Props) {
  const isEdit = !!editData;
  const [tab, setTab] = useState<Tab>(
    editData?.userType === "COMPANY" ? "company" : "individual",
  );
  const {
    createIndividual,
    createCompany,
    updateIndividual,
    updateCompany,
    loading,
  } = useAdminCreateClient();

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

  useEffect(() => {
    if (!editData) return;
    setTab(editData.userType === "COMPANY" ? "company" : "individual");
    if (editData.individual) {
      setIndividualForm(editData.individual);
    }
    if (editData.company) {
      setCompanyForm(editData.company);
    }
  }, [editData]);

  const handleSubmit = async () => {
    let success = false;

    if (isEdit && editData) {
      if (tab === "individual") {
        success = await updateIndividual(editData.userId, {
          ...individualForm,
          phone: individualForm.phone.replace(/\s+/g, ""),
        });
      } else {
        success = await updateCompany(editData.userId, {
          ...companyForm,
          phone: companyForm.phone.replace(/\s+/g, ""),
        });
      }
    } else {
      if (tab === "individual") {
        success = await createIndividual({
          ...individualForm,
          phone: individualForm.phone.replace(/\s+/g, ""),
        });
      } else {
        success = await createCompany({
          ...companyForm,
          phone: companyForm.phone.replace(/\s+/g, ""),
        });
      }
    }

    if (success) {
      onSuccess?.();
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex justify-between items-center mb-8">
        <Logo width={75} height={26} />

        {!isEdit && (
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
        )}
      </div>

      {tab === "individual" ? (
        <IndividualForm
          value={individualForm}
          onChange={(f, v) =>
            setIndividualForm((prev) => ({ ...prev, [f]: v }))
          }
        />
      ) : (
        <CompanyForm
          value={companyForm}
          onChange={(f, v) => setCompanyForm((prev) => ({ ...prev, [f]: v }))}
        />
      )}

      <div className="flex justify-end mt-[41px]">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="text-[var(--color-red)] font-bold text-[24px]"
        >
          {loading
            ? "[LOADING...]"
            : isEdit
              ? "[SAVE CHANGES]"
              : "[CONFIRM AND PROCEED]"}
        </button>
      </div>
    </Modal>
  );
}
