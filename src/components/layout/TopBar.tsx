"use client";

import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAuthContext } from "@/context/AuthContext";
import LogoutIcon from "../ui/icons/LogoutIcon";
import SettingsIcon from "../ui/icons/SettingsIcon";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function Topbar() {
  const { logout: userLogout } = useAuth();
  const { logout: adminLogout } = useAdminAuth();
  const { setEmail } = useAuthContext();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const titleMap: Record<string, string> = {
    "/admin/accounts": "Accounts",
    "/admin/orders": "Orders",
    "/cabinet-individual/profile": "Account",
    "/cabinet-individual/orders": "Orders",
    "/cabinet-company/accounts": "Accounts",
  };

  const roleMap: Record<string, string> = {
    "/admin": "ADMIN",
    "/cabinet-individual": "Dashboard",
    "/cabinet-company": "Dashboard",
  };

  const title = titleMap[pathname] || "Dashboard";

  const role =
    Object.keys(roleMap).find((path) => pathname.startsWith(path)) || "";

  const roleLabel = roleMap[role] || "";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    let success = false;

    if (pathname.startsWith("/admin")) {
      success = await adminLogout();
    } else {
      success = await userLogout();
    }

    if (success) {
      setEmail(null);
      localStorage.removeItem("token");

      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      window.location.href = "/login";
    }
  };

  return (
    <div className="h-[72px] bg-[var(--color-red)] flex items-center justify-between px-6 text-white relative">
      <div className="text-[20px] font-semibold">{title}</div>

      <div className="flex items-center gap-4 relative" ref={ref}>
        <button onClick={() => setOpen((prev) => !prev)}>
          <SettingsIcon />
        </button>
        <div className="text-[16px] font-medium uppercase">{roleLabel}</div>

        {open && (
          <div className="absolute right-[-24px] top-[48px] w-[224px] bg-[var(--color-red)]  shadow-md ">
            <button
              onClick={handleLogout}
              className="group w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-100 transition"
            >
              <LogoutIcon className="group-hover:text-black" />
              <span className="text-white text-[16px] font-semibold font-open-sans group-hover:text-black">
                Logout
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
