"use client"
import {motion} from "framer-motion"
import store from "@/lib/zustand";
import { useRouter } from "next/navigation";

export default function Landing() {
    
    const router = useRouter()
    const {user} = store()
    const handleStart = async() =>{
        console.log(user)
        if(!user){
            router.push('/auth/login')
        }else{
            router.push('/home')
        }
    }
  return (
    <main
      id="landing"
      className="flex min-h-screen flex-col gap-6 items-center justify-center p-24"
    >
      <motion.h1 initial={{ opacity: 0, y:100}}
  animate={{ opacity: 1, y:0}}
  transition={{ duration: 0.8, delay:0}} className=" text-5xl font-bold text-center ">
        Capturing Moments, Creating Memories!
      </motion.h1>
      <motion.p initial={{ opacity: 0, y:100}}
  animate={{ opacity: 1, y:0}}
  transition={{ duration: 0.8, delay:0.6}} className=" text-lg font-medium text-center">
        Welcome to Vshoot, a platform dedicated to photographers, videographers,
        and all creative souls. Discover and share your visual artistry with the
        world.
      </motion.p>
      <motion.button initial={{ opacity: 0, y:100}}
  animate={{ opacity: 1, y:0}}
  transition={{ duration: 0.8, delay:1.2}}  onClick={()=>{handleStart()}}
        className="my-24 text-slate-950 text-xl font-bold bg-slate-50 p-5 rounded-xl hover:bg-slate-200 transition-all"
      >
        Shoot your shot
      </motion.button>
    </main>
  );
}
