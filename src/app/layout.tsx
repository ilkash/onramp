import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// const firaCode = Fira_Code({
//   subsets: ["latin"],
//   weight: ["400", "500"],
// });

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={openSans.className}>{children}</body>
      </html>
    </AuthProvider>
  );
}
