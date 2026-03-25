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

  const [step, setStep] = useState<"login" | "verify">("login");
  const [role, setRole] = useState<Role | null>(null);

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [tempToken, setTempToken] = useState<string | null>(null);

  const { sendCode, verifyCode, loading } = useAuth();

  const handleSendCode = async () => {
    if (!email || !role) return;
    const userType = role === "individual" ? "INDIVIDUAL" : "COMPANY";

    const data = await sendCode(email, userType);

    if (!data) return;

    setTempToken(data.accessToken);
    setStep("verify");
  };

  const handleVerify = async () => {
    if (!tempToken) return;

    console.log("STEP 1: VERIFY START");

    await verifyCode(code, tempToken);

    console.log("STEP 2: VERIFY DONE");
    console.log("STEP 3: COOKIE AFTER VERIFY:", document.cookie);

    setAuthEmail(email);
    localStorage.setItem("email", email);

    if (role === "individual") {
      document.cookie = "role=INDIVIDUAL; path=/";
    }

    if (role === "company") {
      document.cookie = "role=COMPANY; path=/";
    }

    console.log("STEP 4: ROLE:", role);
    console.log("STEP 5: REDIRECT START");

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
                onChange={(e) => setEmail(e.target.value)}
                placeholder="coin.tradesal@gmail.com"
                className="w-full border-b border-[#262932] py-2 outline-none mb-2"
              />
            </div>

            <div className="flex mt-[10px]">
              <button
                onClick={() => setRole("individual")}
                className={`w-[108px] h-[48px] border border-[#E60A14] border-r-0 text-[14px] font-bold transition-all ${
                  role === "individual"
                    ? "bg-[#E60A14] text-white"
                    : "bg-white text-black hover:bg-[#E60A14] hover:text-white"
                }`}
              >
                INDIVIDUAL
              </button>

              <button
                onClick={() => setRole("company")}
                className={`w-[108px] h-[48px] border border-[#E60A14] text-[14px] font-bold transition-all ${
                  role === "company"
                    ? "bg-[#E60A14] text-white"
                    : "bg-white text-black hover:bg-[#E60A14] hover:text-white"
                }`}
              >
                COMPANY
              </button>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSendCode}
                className="font-medium"
                disabled={!email || !role || loading}
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
                onChange={(e) => setCode(e.target.value)}
                className="w-full border-b border-[#262932] py-2 outline-none mb-1"
              />
            </div>

            <div className="text-[12px] mb-6 font-medium font-mono text-black">
              Resend code in 00:29
            </div>

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
