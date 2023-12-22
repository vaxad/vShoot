"use client"

import { Post } from "@prisma/client"
import axios from "axios"
import { useEffect, useState } from "react"
import {motion} from "framer-motion"
import PostShowcase from "./components/PostShowcase"

type Params = {
    params: {
        id: string
    }
}

export default function Page({params:{id}}:Params) {
    const [post, setpost] = useState(null as Post|null)
    
    useEffect(() => {
        const getData=async() => {
            const resp = (await axios.get(`/api/post/${id}`)).data
            console.log(resp)
            setpost(resp.post)
        }
        if(id){
            getData()
        }
    }, [])
    

  return (
    <div className=" flex w-full flex-col justify-center items-center p-24">
        <motion.div initial={{ opacity: 0}}
  animate={{ opacity: 1}}
  transition={{ duration: 1 }} className=" text-4xl">{}
  </motion.div>
        
         <div className=" w-full h-[80vh] ">
    {post&&
        <PostShowcase props={post} />
    }
  </div>
    </div>
  )
}
