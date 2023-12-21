"use client"

import Carausel from "@/app/create/components/Carausel"
import { Post } from "@prisma/client"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function PostCard({props:post}:{props:Post}) {
  const [user, setuser] = useState(null as UserNull)

  const isLiked = async() => {
    const res = await fetch(`/api/post/${post.id}`)
    const resp = await res.json()
    return resp.liked
  }
  
  //   const post = {
  //     "id": "cloufq4800001mvy8qjfd9jbv",
  //     "caption": "testing",
  //     "creatorId": "cloue3w1l0000mvl4xcrbf342",
  //     "imgs": [
  //         "http://res.cloudinary.com/db670bhmc/image/upload/v1699730617/a06mrmemopg71komekwv.png",
  //         "http://res.cloudinary.com/db670bhmc/image/upload/v1699730618/vxiq08jzsvaf0sruk5qu.png"
  //     ],
  //     "tags": [],
  //     "loc_name": "Mithibai College of Arts and Jitendra Chauhan College of Science, Gulmohar Road (NS Road No 1), Vile Parle West, K/W Ward, Zone 3, Mumbai, Mumbai Metropolitan Region, Mumbai Suburban, Maharashtra, 40009, India",
  //     "loc_lat": 19.10295695,
  //     "loc_lon": 72.83745021706365,
  //     "likes": [],
  //     "comments": [],
  //     "createdAt": "2023-11-11T19:23:40.120Z"
  // }
    const getUser = async(id:string) => {
        const res = await fetch(`/api/user`,{
            method:"PUT",
            body:JSON.stringify({id})
        })
        const resp = await res.json()
        console.log(resp)
        setuser(resp.user)
    }
    const [liked, setLiked] = useState(false)
    useEffect(() => {
      if(post.creatorId)
      getUser(post.creatorId)
      isLiked().then((res)=>setLiked(res))
    }, [])
    
  return (
    <div className=" w-full bg-gradient-to-br from-indigo-400 to-purple-900 rounded-2xl flex flex-col">
      <h1 className=" text-2xl font-bold py-2 px-4">@{user?.name}</h1>
      {/* <hr className=" text-slate-200 w-full"></hr> */}
      <Carausel imgs={post.imgs} removeImage={null} />
      <p className=" py-2 px-4">{post.caption}</p>
      {post.loc_name&&<div className=" flex flex-row gap-2 justify-start items-center w-full px-4">
        <img src="/location.png" className=" w-8"></img>
      <Link href={`/shoots/${post.id}`} className=" text-sm cursor-pointer hover:underline decoration-slate-100 transition-all ">{post.loc_name.length>40?post.loc_name.slice(0,40)+"...":post.loc_name}</Link>
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
