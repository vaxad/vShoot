"use client";
import store from "@/lib/zustand";
import axios from "axios";
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
        // if(path!=="/")
        // redirect(`/api/auth/signin?callbackUrl=/auth`)
    }
})
const { user , setUser} = store()
const sendOtp = async(user:UserNull) => {
  const res = await fetch('/api/mail',{
    method:"POST",
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify({email:user?.email, id:user?.id})
  })
  const resp = await res.json()
  console.log(resp)
}
// useEffect(() => {
//   if(!session){
//     router.push("http://localhost:3000/api/auth/signin?callbackUrl=/auth")
//   }
// }, [session])

  useEffect(() => {
    // const localToken = localStorage.getItem("auth-token");
    console.log(user)

    if(user){
      if(!user.verified&&user.password!=="none"&&session?.user?.email===user.email){
        if(path!=="/auth/verify"){
        sendOtp(user)
        router.push("/auth/verify")
        }
      }else{
        if(path.includes("auth")&&user.name&&user.gender&&user.role){
          router.push("/home")
          }
      }
    }else{
      console.log("no user")
      const url = process.env.NEXT_PUBLIC_URL
      const getme = async() =>{ 
      const res = (await axios.get("/api/auth/login")).data
      console.log(res)
      if(res.expired){
        if(path!=="/"&&!path.includes("auth"))
        router.push(`http://${url}/api/auth/signin?callbackUrl=/auth`)
      }else{
      if(!res.user){
        if(!path.includes("auth")&&path!=="/")
        router.push("/auth")
      }else{
        console.log(res.user)

      setUser(res.user)
      }
    }
      }
      getme()
    }
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
