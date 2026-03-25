"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/icons/Logo";
import { ThemedText } from "@/components/ui/ThemedText";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function AdminLoginPage() {
  const router = useRouter();

  const [step, setStep] = useState<"login" | "verify">("login");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [countdown, setCountdown] = useState(29);
  const [canResend, setCanResend] = useState(false);
  const { sendCode, verifyCode, resendCode } = useAdminAuth();
  const [tempToken, setTempToken] = useState("");

  const handleSendCode = async () => {
    const data = await sendCode(email);
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
    await resendCode(tempToken); // tempToken вже є в стейті
    startCountdown();
  };
  const handleVerify = async () => {
    if (!tempToken) return;

    const success = await verifyCode(code, tempToken);

    if (success) {
      document.cookie = "role=ADMIN; path=/";
      router.push("/admin/accounts");
    }
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
              Admin login
            </ThemedText>

            <div className="mt-4">
              <label>
                <ThemedText type="input_individual">Your email</ThemedText>
              </label>

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@test.com"
                className="w-full border-b border-[#262932] py-2 outline-none mb-4"
              />
            </div>

            <div className="flex justify-end">
              <button onClick={handleSendCode} className="font-medium">
                [SEND CODE]
              </button>
            </div>
          </>
        )}

        {step === "verify" && (
          <>
            <ThemedText type="auth" className="font-bold">
              Admin verification
            </ThemedText>

            <div className="mt-4">
              <input
                value={email}
                disabled
                className="w-full border-b border-[#262932] py-2 text-gray-400 mb-4"
              />

              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Verification code"
                className="w-full border-b border-[#262932] py-2 mb-2"
              />
            </div>

            {canResend ? (
              <button
                onClick={handleResend}
                className="text-[12px] font-mono underline"
              >
                Resend code
              </button>
            ) : (
              <div className="text-[12px] font-mono">
                Resend code in 00:{String(countdown).padStart(2, "0")}
              </div>
            )}

            <div className="flex justify-end">
              <button onClick={handleVerify} className="font-medium">
                [CONFIRM AND PROCEED]
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
