"use client";
import store from "@/lib/zustand";
import React from "react";
import {motion} from "framer-motion"

export default function Posts() {
  const { user } = store();
  return <motion.div initial={{ opacity: 0}}
  animate={{ opacity: 1}}
  transition={{ duration: 1 }} className=" text-4xl">Posts for {user?.name}</motion.div>;
}
