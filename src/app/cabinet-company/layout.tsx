import Sidebar from "@/components/layout/SideBar";
import Topbar from "@/components/layout/TopBar";
import { IconKey } from "@/constants/iconMap";

const adminItems: {
  label: string;
  href: string;
  icon: IconKey;
}[] = [
  { label: "Accounts", href: "/cabinet-company/profile", icon: "accounts" },
  { label: "Orders", href: "/cabinet-company/orders", icon: "orders" },
  // { label: "Users", href: "/users", icon: "users" },
  // { label: "Payment Link", href: "/payment-link", icon: "payment" },
  // { label: "Create", href: "/create", icon: "create" },
  // { label: "Create wallet", href: "/create-wallet", icon: "wallet" },
  // { label: "Stats", href: "/stats", icon: "stats" },
];

export default function CompanyAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen">
      <Sidebar menuItems={adminItems} showBuyCrypto={true} />
      <div className="w-[3px] bg-[var(--color-gray)]" />

      <div className="flex flex-col flex-1">
        <Topbar />

        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
}
