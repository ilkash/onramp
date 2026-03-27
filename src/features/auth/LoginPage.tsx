"use client";

import { useState } from "react";
import Logo from "@/components/ui/icons/Logo";
import { ThemedText } from "@/components/ui/ThemedText";
import { useAuth } from "@/hooks/useAuth";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

type Role = "individual" | "company";

export default function LoginPage() {
  const router = useRouter();
  const { setEmail: setAuthEmail } = useAuthContext();
  const [countdown, setCountdown] = useState(29);
  const [canResend, setCanResend] = useState(false);
  const { sendCode, verifyCode, resendCode, loading } = useAuth();
  const [step, setStep] = useState<"login" | "verify">("login");
  const [role, setRole] = useState<Role | null>(null);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [tempToken, setTempToken] = useState<string | null>(null);

  const [emailError, setEmailError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [codeError, setCodeError] = useState("");

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSendCode = async () => {
    let valid = true;

    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!role) {
      setRoleError("Please select Individual or Company");
      valid = false;
    } else {
      setRoleError("");
    }

    if (!valid) return;

    const userType = role === "individual" ? "INDIVIDUAL" : "COMPANY";
    const data = await sendCode(email, userType);
    if (!data) return;
    setTempToken(data.accessToken);
    setStep("verify");
    startCountdown();
  };

  const startCountdown = () => {
    setCountdown(29);
    setCanResend(false);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResend = async () => {
    if (!tempToken) return;
    await resendCode(tempToken);
    startCountdown();
  };

  const handleVerify = async () => {
    if (!tempToken) return;

    if (!code.trim()) {
      setCodeError("Code is required");
      return;
    } else if (!/^\d{6}$/.test(code)) {
      setCodeError("Code must be 6 digits");
      return;
    } else {
      setCodeError("");
    }

    const success = await verifyCode(code, tempToken);

    if (!success) {
      setCodeError("Invalid or expired code");
      return; // ← не редіректимо
    }

    setAuthEmail(email);
    localStorage.setItem("email", email);

    if (role === "individual") document.cookie = "role=INDIVIDUAL; path=/";
    if (role === "company") document.cookie = "role=COMPANY; path=/";

    router.push(
      role === "individual"
        ? "/cabinet-individual/profile"
        : "/cabinet-company/profile",
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#E9E8E8]">
      <div className="w-[692px] bg-white px-[38px] py-[51px] shadow">
        <div className="mb-[40px]">
          <Logo width={75} height={26} />
        </div>

        {step === "login" && (
          <>
            <ThemedText type="auth" className="font-bold">
              Enter your email to logIn
            </ThemedText>

            <div className="mt-4">
              <label>
                <ThemedText type="input_individual">Your email</ThemedText>
              </label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                placeholder="coin.tradesal@gmail.com"
                className={`w-full border-b py-2 outline-none mb-1 ${emailError ? "border-[var(--color-red)]" : "border-[#262932]"}`}
              />
              {emailError && (
                <span className="text-[var(--color-red)] text-[11px] font-mono">
                  {emailError}
                </span>
              )}
            </div>

            <div className="flex mt-[10px]">
              <button
                onClick={() => {
                  setRole("individual");
                  setRoleError("");
                }}
                className={`w-[108px] h-[48px] border cursor-pointer border-[#E60A14] border-r-0 text-[14px] font-bold transition-all ${
                  role === "individual"
                    ? "bg-[#E60A14] text-white"
                    : "bg-white text-black hover:bg-[#E60A14] hover:text-white"
                }`}
              >
                INDIVIDUAL
              </button>
              <button
                onClick={() => {
                  setRole("company");
                  setRoleError("");
                }}
                className={`w-[108px] h-[48px] border cursor-pointer border-[#E60A14] text-[14px] font-bold transition-all ${
                  role === "company"
                    ? "bg-[#E60A14] text-white"
                    : "bg-white text-black hover:bg-[#E60A14] hover:text-white"
                }`}
              >
                COMPANY
              </button>
            </div>
            {roleError && (
              <span className="text-[var(--color-red)] text-[11px] font-mono mt-1 block">
                {roleError}
              </span>
            )}

            <div className="flex justify-end mt-2">
              <button
                onClick={handleSendCode}
                className="font-semibold text-[24px] font-mono cursor-pointer transition-transform hover:scale-105"
                disabled={loading}
              >
                [SEND CODE]
              </button>
            </div>
          </>
        )}

        {step === "verify" && (
          <>
            <ThemedText type="auth" className="font-bold">
              Enter your email to logIn
            </ThemedText>

            <div className="mt-4">
              <label>
                <ThemedText type="input_individual">Your email</ThemedText>
              </label>
              <input
                value={email}
                disabled
                className="w-full border-b border-[#262932] py-2 text-gray-400 mb-2"
              />
            </div>

            <div className="mt-2">
              <label>
                <ThemedText type="input_individual">
                  Your verification code
                </ThemedText>
              </label>
              <input
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setCodeError("");
                }}
                className={`w-full border-b py-2 outline-none mb-1 ${codeError ? "border-[var(--color-red)]" : "border-[#262932]"}`}
              />
              {codeError && (
                <span className="text-[var(--color-red)] text-[11px] font-mono">
                  {codeError}
                </span>
              )}
            </div>

            {canResend ? (
              <button
                onClick={handleResend}
                className="text-[12px] font-mono underline mb-6 cursor-pointer hover:text-[var(--color-red)] transition-colors"
              >
                Resend code
              </button>
            ) : (
              <div className="text-[12px] mb-6 font-medium font-mono text-black">
                Resend code in 00:{String(countdown).padStart(2, "0")}
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={handleVerify}
                className="font-semibold text-[24px] font-mono cursor-pointer transition-transform hover:scale-105"
              >
                [CONFIRM AND PROCEED]
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
