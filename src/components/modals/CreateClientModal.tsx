"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import Logo from "@/components/ui/icons/Logo";
import IndividualForm from "./IndividualForm";
import CompanyForm from "./CompanyForm";
import { useAdminCreateClient } from "@/hooks/useAdminCreateClient";
import Toast from "@/components/ui/Toast";
import { availableCountries } from "@/constants/countries";

type Tab = "individual" | "company";

type IndividualErrors = Partial<
  Record<"fullName" | "country" | "phone" | "email", string>
>;
type CompanyErrors = Partial<
  Record<
    | "companyName"
    | "registrationNumber"
    | "country"
    | "contactPerson"
    | "email"
    | "phone",
    string
  >
>;

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
    error,
  } = useAdminCreateClient();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [individualErrors, setIndividualErrors] = useState<IndividualErrors>(
    {},
  );
  const [companyErrors, setCompanyErrors] = useState<CompanyErrors>({});
  const [individualPhoneCode, setIndividualPhoneCode] = useState("+39");
  const [companyPhoneCode, setCompanyPhoneCode] = useState("+39");

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

    const phoneMasks: Record<string, string> = {
      "+39": "### #######",
      "+33": "# ## ## ## ##",
      "+44": "#### ######",
      "+34": "### ### ###",
      "+48": "### ### ###",
      "+358": "## ### ####",
    };

    const applyPhoneMask = (rawPhone: string) => {
      const detected = [...availableCountries]
        .sort((a, b) => b.phoneCode.length - a.phoneCode.length)
        .find((c) => rawPhone.startsWith(c.phoneCode));

      if (!detected) return { phone: rawPhone, code: "+39" };

      const digits = rawPhone
        .replace(detected.phoneCode, "")
        .replace(/\D/g, "");
      const mask = phoneMasks[detected.phoneCode];

      let masked = "";
      let di = 0;
      for (let i = 0; i < mask.length; i++) {
        if (di >= digits.length) break;
        masked += mask[i] === "#" ? digits[di++] : mask[i];
      }

      return { phone: masked, code: detected.phoneCode };
    };

    if (editData.individual) {
      const { phone, code } = applyPhoneMask(editData.individual.phone);
      setIndividualPhoneCode(code);
      setIndividualForm({ ...editData.individual, phone });
    }

    if (editData.company) {
      const { phone, code } = applyPhoneMask(editData.company.phone);
      setCompanyPhoneCode(code);
      setCompanyForm({ ...editData.company, phone });
    }
  }, [editData]);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: string) =>
    /^\d{6,14}$/.test(phone.replace(/\s/g, ""));

  const validateIndividual = (): IndividualErrors => {
    const errors: IndividualErrors = {};
    if (!individualForm.fullName.trim())
      errors.fullName = "Full name is required";
    if (!individualForm.country) errors.country = "Country is required";
    if (!individualForm.phone.trim()) errors.phone = "Phone is required";
    else if (!validatePhone(individualForm.phone))
      errors.phone = "Invalid phone number";
    if (!individualForm.email.trim()) errors.email = "Email is required";
    else if (!validateEmail(individualForm.email))
      errors.email = "Invalid email address";
    return errors;
  };

  const validateCompany = (): CompanyErrors => {
    const errors: CompanyErrors = {};
    if (!companyForm.companyName.trim())
      errors.companyName = "Company name is required";
    if (!companyForm.registrationNumber.trim())
      errors.registrationNumber = "Company number is required";
    if (!companyForm.country) errors.country = "Country is required";
    if (!companyForm.contactPerson.trim())
      errors.contactPerson = "Authorized person is required";
    if (!companyForm.phone.trim()) errors.phone = "Phone is required";
    else if (!validatePhone(companyForm.phone))
      errors.phone = "Invalid phone number";
    if (!companyForm.email.trim()) errors.email = "Email is required";
    else if (!validateEmail(companyForm.email))
      errors.email = "Invalid email address";
    return errors;
  };

  const handleSubmit = async () => {
    if (tab === "individual") {
      const errors = validateIndividual();
      if (Object.keys(errors).length > 0) {
        setIndividualErrors(errors);
        return;
      }
      setIndividualErrors({});
    } else {
      const errors = validateCompany();
      if (Object.keys(errors).length > 0) {
        setCompanyErrors(errors);
        return;
      }
      setCompanyErrors({});
    }

    let success = false;

    if (isEdit && editData) {
      if (tab === "individual") {
        success = await updateIndividual(editData.userId, {
          ...individualForm,
          phone: (individualPhoneCode + individualForm.phone).replace(
            /\s/g,
            "",
          ),
        });
      } else {
        success = await updateCompany(editData.userId, {
          ...companyForm,
          phone: (companyPhoneCode + companyForm.phone).replace(/\s/g, ""),
        });
      }
    } else {
      if (tab === "individual") {
        success = await createIndividual({
          ...individualForm,
          phone: (individualPhoneCode + individualForm.phone).replace(
            /\s/g,
            "",
          ),
        });
      } else {
        success = await createCompany({
          ...companyForm,
          phone: (companyPhoneCode + companyForm.phone).replace(/\s/g, ""),
        });
      }
    }

    if (success) {
      setToast({
        message: isEdit ? "Client updated!" : "Client created!",
        type: "success",
      });
      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 1000);
    } else {
      setToast({ message: error || "Something went wrong", type: "error" });
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex justify-between items-center mb-8">
        <Logo width={75} height={26} />
        {!isEdit ? (
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
        ) : (
          <div className="flex">
            {tab === "individual" && (
              <div className="w-[98px] h-[48px] border border-[var(--color-dark-red)] text-[14px] font-medium bg-[var(--color-red)] text-white flex items-center justify-center">
                INDIVIDUAL
              </div>
            )}
            {tab === "company" && (
              <div className="w-[98px] h-[48px] border border-[var(--color-dark-red)] text-[14px] font-medium bg-[var(--color-red)] text-white flex items-center justify-center">
                COMPANY
              </div>
            )}
          </div>
        )}
      </div>

      {tab === "individual" ? (
        <IndividualForm
          value={individualForm}
          onChange={(f, v) => {
            setIndividualForm((prev) => ({ ...prev, [f]: v }));
            setIndividualErrors((prev) => ({ ...prev, [f]: undefined }));
          }}
          initialPhone={editData?.individual?.phone}
          onPhoneCodeChange={(code) => setIndividualPhoneCode(code)}
          errors={individualErrors}
        />
      ) : (
        <CompanyForm
          value={companyForm}
          onChange={(f, v) => {
            setCompanyForm((prev) => ({ ...prev, [f]: v }));
            setCompanyErrors((prev) => ({ ...prev, [f]: undefined }));
          }}
          initialPhone={editData?.company?.phone}
          onPhoneCodeChange={(code) => setCompanyPhoneCode(code)}
          errors={companyErrors}
        />
      )}

      <div className="flex justify-end mt-[41px]">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="text-[var(--color-red)] font-bold text-[24px] cursor-pointer transition-transform hover:scale-105"
        >
          {loading
            ? "[LOADING...]"
            : isEdit
              ? "[SAVE CHANGES]"
              : "[CONFIRM AND PROCEED]"}
        </button>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </Modal>
  );
}
