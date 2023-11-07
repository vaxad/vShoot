"use client"
import {motion} from "framer-motion"
import store from "@/lib/zustand";
import { useRouter } from "next/navigation";
import Bg from "./Bg";
import { useSession } from "next-auth/react";

export default function Landing() {
    
    const router = useRouter()
    const {user} = store()
    const { data: session } = useSession()
    const handleStart = async() =>{
        if(!session?.user){
            router.push(`/api/auth/signin?callbackUrl=/auth`)
        }else{
            router.push('/home')
        }
    }
  return (
    <main
      id="landing"
      className="flex flex-col gap-6 items-center justify-center p-24 "
    >
      <motion.div initial={{ opacity: 0}}
  animate={{ opacity: 1}}
  transition={{ duration: 1}} className=" flex flex-row gap-5 justify-between items-center w-4/5">
        <div className=" flex flex-col gap-5 justify-start items-center w-1/2">
      <motion.h1 initial={{ opacity: 0, y:100}}
  animate={{ opacity: 1, y:0}}
  transition={{ duration: 0.8, delay:0}} className=" text-5xl font-bold">
        Capturing Moments, Creating Memories!
      </motion.h1>
      
      <motion.p initial={{ opacity: 0, y:100}}
  animate={{ opacity: 1, y:0}}
  transition={{ duration: 0.8, delay:0.6}} className=" text-lg font-medium ">
        Welcome to Vshoot, a platform dedicated to photographers, videographers,
        and all creative souls. Discover and share your visual artistry with the
        world.
      </motion.p>
      </div>
      <motion.img initial={{ opacity: 1, y:100}}
  animate={{ opacity: 1, y:0}}
  transition={{ duration: 2, repeat:Infinity, repeatType:"reverse"}} src="/cam.png" width={200} height={200}/>
      </motion.div>
      <motion.button initial={{ opacity: 0, y:60}}
  animate={{ opacity: 1, y:0}}
  transition={{ duration: 0.8, delay:1.2}}  onClick={()=>{handleStart()}}
        className="my-24 text-slate-950 text-xl font-bold bg-slate-50 p-5 rounded-xl hover:rounded-full hover:bg-slate-200 transition-all " 
      >
        Shoot your shot
      </motion.button>
    </main>
  );
}
