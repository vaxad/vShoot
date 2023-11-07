"use client";
import store from "@/lib/zustand";
import React from "react";
import {motion} from "framer-motion"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";


export default function Posts() {
  // const { user } = store();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
        // redirect('/api/auth/signin?callbackUrl=/home')
    }
})
  return <motion.div initial={{ opacity: 0}}
  animate={{ opacity: 1}}
  transition={{ duration: 1 }} className=" text-4xl">Posts for {session?.user?.email}</motion.div>;
}
