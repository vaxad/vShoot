"use client";
import store from "@/lib/zustand";
import React from "react";
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LogoutBtn() {
  const { setUser, user, setToken } = store();
  const router = useRouter()

  const logout =async() => {
    const data = (await axios.delete("/api/auth/login")).data
    console.log(data)
    if(data.message){
      signOut()
          setUser(null);
          setToken("")
          router.push("http://localhost:3000/api/auth/signin?callbackUrl=/auth")
    }

  }

  return (
     (
      <button
        onClick={() => {
          logout()
        }}
        className="my-24 text-slate-950 text-xl font-bold bg-red-500 p-5 rounded-xl hover:bg-slate-200 transition-all"
      >
        Log out
      </button>
    )
  );
}
