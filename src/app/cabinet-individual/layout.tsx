import Sidebar from "@/components/layout/SideBar";
import Topbar from "@/components/layout/TopBar";
import { IconKey } from "@/constants/iconMap";

type MenuItem = {
  label: string;
  href: string;
  icon: IconKey;
};

const cabinetMenu: MenuItem[] = [
  {
    label: "Account",
    href: "/cabinet-individual/profile",
    icon: "accounts",
  },
  {
    label: "Orders",
    href: "/cabinet-individual/orders",
    icon: "orders",
  },
];

export default function CabinetIndividualLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen">
      {/* sidebar */}
      <Sidebar menuItems={cabinetMenu} />

      {/* divider */}
      <div className="w-[2px] lg:w-[3px] bg-[var(--color-gray)]" />

      {/* content */}
      <div className="flex flex-col flex-1 min-w-0">
        <Topbar />

        <main className="flex-1 overflow-auto p-2 lg:p-4">{children}</main>
      </div>
    </div>
  );
}
