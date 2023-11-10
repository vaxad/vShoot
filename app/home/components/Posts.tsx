"use client";
import store from "@/lib/zustand";
import React, { useEffect } from "react";
import {motion} from "framer-motion"
import { useSession } from "next-auth/react";
import PostCard from "./PostCard";



export default function Posts() {
  // const { user, setUser } = store();
  const { data: session } = useSession()
  const getData = async() => {
    const res = await fetch('/api/post',{
      method:"GET"
    })
    const resp = await res.json()
    console.log(resp.posts)
    
  }
  useEffect(() => {
    getData()
  }, [])
  
  return (
    <div className=" flex w-full flex-col justify-center items-center">
  <motion.div initial={{ opacity: 0}}
  animate={{ opacity: 1}}
  transition={{ duration: 1 }} className=" text-4xl">Posts 
  </motion.div>;
  <div className=" flex w-full">
    <PostCard/>
  </div>
  </div>
  )

}
