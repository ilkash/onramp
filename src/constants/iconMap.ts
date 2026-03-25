import AccounsIcon from "@/components/ui/icons/AccounsIcon";
import OrdersIcon from "@/components/ui/icons/OrdersIcon";
import UsersIcon from "@/components/ui/icons/UsersIcon";
import PaymentIcon from "@/components/ui/icons/PaymentIcon";
import CreateIcon from "@/components/ui/icons/CreateIcon";
import WalletIcon from "@/components/ui/icons/WalletIcon";
import StatsIcon from "@/components/ui/icons/StatsIcon";

export const iconMap = {
  accounts: AccounsIcon,
  orders: OrdersIcon,
  users: UsersIcon,
  payment: PaymentIcon,
  create: CreateIcon,
  wallet: WalletIcon,
  stats: StatsIcon,
};
export type IconKey = keyof typeof iconMap;
