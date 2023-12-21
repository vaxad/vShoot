"use client";
import store from "@/lib/zustand";
import React, { useEffect, useState } from "react";
import {motion} from "framer-motion"
import { useSession } from "next-auth/react";
import PostCard from "./PostCard";
import { Post } from "@prisma/client";



export default function Posts() {
  // const { user, setUser } = store();
  const { data: session } = useSession()
  const [posts, setposts] = useState([] as Post[])
  const getData = async() => {
    const res = await fetch('/api/post',{
      method:"GET"
    })
    const resp = await res.json()
    console.log(resp.posts)
    setposts(resp.posts)
    
  }
  useEffect(() => {
    getData()
  }, [])
  
  return (
    <div className=" flex w-full flex-col justify-center items-center">
  {/* <motion.div initial={{ opacity: 0}}
  animate={{ opacity: 1}}
  transition={{ duration: 1 }} className=" text-4xl py-4">For you 
  </motion.div> */}
  <div className=" w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
    {posts?.map((post:Post)=>{
      return (
        <PostCard key={post.id} props={post} />
      )
    })}
  </div>
  </div>
  )

}
