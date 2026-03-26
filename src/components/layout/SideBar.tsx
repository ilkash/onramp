"use client";
import Link from "next/link";
import { ThemedText } from "../ui/ThemedText";
import Logo from "../ui/icons/Logo";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IconKey, iconMap } from "@/constants/iconMap";

type MenuItem = {
  label: string;
  href: string;
  icon: IconKey;
};

type SidebarProps = {
  menuItems: MenuItem[];
  showBuyCrypto?: boolean;
};

export default function Sidebar({ menuItems, showBuyCrypto }: SidebarProps) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  return (
    <aside className="w-[180px] lg:w-[268px] h-screen flex flex-col bg-white relative">
      <div className="flex items-center mt-[12px] lg:mt-[18px] ml-[8px] lg:ml-[12px] mb-[60px] lg:mb-[104px]">
        <Logo className="scale-90 lg:scale-100" />
      </div>

      <div
        className="flex items-center justify-between px-2 lg:px-4 py-2 lg:py-3 bg-[var(--color-gray)] cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <ThemedText className="text-[12px] lg:text-[14px]">Main</ThemedText>

        <span
          className={`text-[10px] lg:text-[12px] ${open ? "rotate-180" : ""}`}
        >
          ▲
        </span>
      </div>

      {open && (
        <nav className="flex flex-col mb-[50px]">
          {menuItems.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  px-2 lg:px-4 py-2 lg:py-3
                  flex items-center gap-2 lg:gap-3
                  ${isActive ? "bg-[var(--color-red)] text-white" : "hover:bg-gray-100"}
                `}
              >
                <Icon className="w-[14px] h-[14px] lg:w-[18px] lg:h-[18px]" />
                <span className="text-[12px] lg:text-[14px]">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      )}
      {showBuyCrypto && (
        <div className="mt-auto mb-[80px] px-2 lg:px-4">
          <a
            href="https://widget.onramp.itzeyz.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center text-[24px] text-black font-mono font-semibold cursor-pointer transition-transform hover:scale-105 "
          >
            [BUY CRYPTO]
          </a>
        </div>
      )}
      <div className=" w-[2px] lg:w-[3px] h-full bg-[#D9D9D9]" />
    </aside>
  );
}
