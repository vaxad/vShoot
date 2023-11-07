"use client";
import store from "@/lib/zustand";
import { useSession } from "next-auth/react";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function AuthCheckr() {
  const path = usePathname();
  const router = useRouter();
  // const { token, setToken, setUser } = store();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
        if(path!=="/")
        redirect(`/api/auth/signin?callbackUrl=/auth`)
    }
})
const user = session?.user
  useEffect(() => {
    const localToken = localStorage.getItem("auth-token");
    // console.log(token);
    // if(token===""){
    //   setToken(localToken?localToken:"")
    // }
    // if(!user&&localToken!==""){
    //   getMe(localToken as string)
    // }
    // if (!user) {
    //   if (!path.includes("auth")) {
    //     router.push("/");
    //   }
    // }
    // if (user) {
    //   if (path.includes("auth")) {
    //     router.push("/home");
    //   }
    // }
  }, [user, path]);

  // const getMe = async(localToken:string) =>{
  //   const resp = await fetch("/api/auth/", {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json",
  //       "auth-token" : localToken
  //     }
  //   });
  //   const resJson = await resp.json();
  //   console.log(resJson.user)
  //   // setUser(resJson.user)
  // }

  return <></>;
}
