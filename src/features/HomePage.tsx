"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePageClient() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return null;
}
