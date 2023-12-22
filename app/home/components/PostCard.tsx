"use client"

import Carausel from "@/app/create/components/Carausel"
import store from "@/lib/zustand"
import { Post } from "@prisma/client"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function PostCard({props:post}:{props:Post}) {
  const [creator, setcreator] = useState(null as UserNull)
  const {user} = store()
  const isLiked = async() => {
    const res = await fetch(`/api/post/${post.id}`,{
      method:"GET"
    })
    const resp = await res.json()
    return resp.liked
  }
    const getcreator = async(id:string) => {
        const res = await fetch(`/api/user`,{
            method:"PUT",
            body:JSON.stringify({id:id})
        })
        const resp = await res.json()
        console.log(resp)
        setcreator(resp.user)
    }
    const [liked, setLiked] = useState(false)
    useEffect(() => {
      if(post.creatorId)
      getcreator(post.creatorId)
    }, [])
    useEffect(() => {
      if(user)
      isLiked().then(res=>setLiked(res))
    }, [user])
    
  return (
    <div className=" w-full bg-gradient-to-br from-indigo-400 to-purple-900 rounded-2xl flex flex-col">
      <h1 className=" text-2xl font-bold py-2 px-4">@{creator?.name}</h1>
      {/* <hr className=" text-slate-200 w-full"></hr> */}
      <Carausel imgs={post.imgs} removeImage={null} size="small" link={post?.id} />
      <p className=" py-2 px-4">{post.caption}</p>
      {post.loc_name&&<div className=" flex flex-row gap-2 justify-start items-center w-full px-4">
        <img src="/location.png" className=" w-8"></img>
      <Link href={`/shoots/${post.loc_lat}/${post.loc_lon}`} className=" text-sm cursor-pointer hover:underline decoration-slate-100 transition-all ">{post.loc_name.length>40?post.loc_name.slice(0,40)+"...":post.loc_name}</Link>
      </div>}
      <div className=" flex flex-row justify-between gap-4 px-4 w-full py-2">
      {liked?<img onClick={async()=>{setLiked(false);
      const res = await fetch(`/api/post/${post.id}`,{
        method:"PATCH"
      })
      }} className=" w-8 hover:scale-110 transition-all" src="https://img.icons8.com/ios-filled/50/ffffff/like--v1.png" alt="like--v1"/>:
      <img  onClick={async()=>{setLiked(true)
      const res = await fetch(`/api/post/${post.id}`,{
        method:"PATCH"
      })
      }} className=" w-8 hover:scale-105 transition-all" src="https://img.icons8.com/ios/50/ffffff/like--v1.png" alt="like--v1"/>}
      <img className=" w-8 hover:scale-105 transition-all" src="https://img.icons8.com/ios/50/ffffff/sent--v1.png" alt="sent--v1"/>
      </div>
        <div className=" flex flex-row justify-center items-center px-4 w-full py-3 rounded-md">
        <div className=" flex flex-row justify-start items-center px-3 py-2 bg-indigo-500 w-full rounded-lg">
          <input className=" flex w-full bg-transparent appearance-none outline-none border-0 focus:ring-0 placeholder:text-sm text-sm placeholder:text-indigo-400" placeholder="Comment..."></input>
          <img className=" w-6 cursor-pointer" src="https://img.icons8.com/material-rounded/24/ffffff/sent.png" alt="sent"/>
          </div>
        </div>
    </div>
  )
}
