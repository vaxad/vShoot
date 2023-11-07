"use client";
import store from "@/lib/zustand";
import React from "react";
import { signOut } from "next-auth/react"

export default function LogoutBtn() {
  // const { setUser, user, setToken } = store();

  return (
     (
      <button
        // onClick={() => {
        //   setUser(null);
        //   setToken("")
        //   localStorage.setItem("auth-token","")
        // }}
        onClick={() => signOut()}
        className="my-24 text-slate-950 text-xl font-bold bg-red-500 p-5 rounded-xl hover:bg-slate-200 transition-all"
      >
        Log out
      </button>
    )
  );
}
