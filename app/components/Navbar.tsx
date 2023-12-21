"use client";
import React, { useState } from "react";
import Toast from "./Toast";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const path = usePathname();
  const [nav, setnav] = useState(false)
  return (
    <div className=" flex flex-col">
      <div className=" w-full flex flex-row py-1 px-6 md:px-12 lg:px-24 justify-between h-[10vh] items-center bg-black bg-opacity-30">
        <Link
        onClick={()=>{setnav(false)}} href={"/"}>
        <img src="/logo.png" height={180} width={180} className=""></img>
        </Link>
        <button onClick={()=>{setnav(!nav)}} className={`z-50 md:hidden ${nav?"-rotate-90":" rotate-0"} transition-all bg-slate-900 border-2 border-slate-200 p-2 rounded-lg text-2xl`}>
        <svg xmlns="http://www.w3.org/2000/svg"fill="#ffffff" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50">
<path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z"></path>
</svg>
        </button>
        <ul className={` z-40 flex absolute h-[100vh] ${nav?"":"-translate-y-full md:-translate-y-0"} md:w-fit w-[100vw] md:h-full top-0 right-0 bg-slate-900 md:bg-transparent flex-col md:static md:flex md:flex-row justify-center items-center gap-8 transition-all`} style={{transitionDelay:"0.2s", transitionDuration:"0.8s"}}>
          <Link
          onClick={()=>{setnav(false)}}
            href={"/home"}
            className={` cursor-pointer text-lg hover:text-slate-50  transition-all text-slate-400 ${
              path.includes("home") && "text-slate-50"
            }`}
          >
            Home
          </Link>
          <Link
          onClick={()=>{setnav(false)}}
            href={"/create"}
            className={` cursor-pointer text-lg hover:text-slate-50  transition-all text-slate-400 ${
              path.includes("create") && "text-slate-50"
            }`}
          >
            Shoots
          </Link>
          <Link
          onClick={()=>{setnav(false)}}
            href={"/connect"}
            className={` cursor-pointer text-lg hover:text-slate-50  transition-all text-slate-400 ${
              path.includes("connect") && "text-slate-50"
            }`}
          >
            Connect
          </Link>
          <Link
          onClick={()=>{setnav(false)}}
            href={"/profile"}
            className={` cursor-pointer text-lg hover:text-slate-50  transition-all text-slate-400 ${
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
