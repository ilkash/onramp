import type { Metadata } from "next";
import { Open_Sans, Fira_Code } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-fira-code",
});

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
      <html lang="en" className={`${openSans.variable} ${firaCode.variable}`}>
        <body className="font-sans">{children}</body>
      </html>
    </AuthProvider>
  );
}
