"use client";
import React from "react";
import Toast from "./Toast";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const path = usePathname();
  return (
    <div className=" flex flex-col">
      <div className=" w-full flex flex-row py-1 px-24 justify-between items-center bg-black bg-opacity-10">
        <img src="/logo.png" height={120} width={120} className=""></img>
        <ul className=" flex flex-row gap-8">
          <Link
            href={"/home"}
            className={` cursor-pointer text-lg hover:text-slate-50 font-semibold transition-all text-slate-400 ${
              path.includes("home") && "text-slate-50"
            }`}
          >
            Home
          </Link>
          <Link
            href={"/shoots"}
            className={` cursor-pointer text-lg hover:text-slate-50 font-semibold transition-all text-slate-400 ${
              path.includes("shoots") && "text-slate-50"
            }`}
          >
            Shoots
          </Link>
          <Link
            href={"/connect"}
            className={` cursor-pointer text-lg hover:text-slate-50 font-semibold transition-all text-slate-400 ${
              path.includes("connect") && "text-slate-50"
            }`}
          >
            Connect
          </Link>
          <Link
            href={"/profile"}
            className={` cursor-pointer text-lg hover:text-slate-50 font-semibold transition-all text-slate-400 ${
              path.includes("profile") && "text-slate-50"
            }`}
          >
            Profile
          </Link>
        </ul>
      </div>
      <div className=" flex w-full justify-center items-center">
        <Toast />
      </div>
    </div>
  );
}
