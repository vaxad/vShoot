"use client";
import store from "@/lib/zustand";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function AuthCheckr() {
  const path = usePathname();
  const router = useRouter();
  const { user } = store();
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    console.log("hii");
    if (!user) {
      if (!path.includes("auth")) {
        router.push("/");
      }
    }
  }, [user, path]);

  return <></>;
}
