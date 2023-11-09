"use client";
import store from "@/lib/zustand";
import React, { useEffect } from "react";
import {motion} from "framer-motion"
import { useSession } from "next-auth/react";



export default function Posts() {
  const { user, setUser } = store();
  const { data: session } = useSession()
  const getData = async() => {
    const res = await fetch('/api/auth/login',{
      method:"POST"
    })
    const resp = await res.json()
    console.log(resp)
    setUser(resp.user)
  }
  useEffect(() => {
    getData()
  }, [])
  
  return <motion.div initial={{ opacity: 0}}
  animate={{ opacity: 1}}
  transition={{ duration: 1 }} className=" text-4xl">Posts for {user?user.name:session?.user?.email}</motion.div>;
}
