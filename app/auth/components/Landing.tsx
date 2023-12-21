"use client"
import {motion} from "framer-motion"
import store from "@/lib/zustand";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Intro from "./Intro";
import Description from "./Description";
import About from "./About";
import Contact from "./Contact";

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
    <main id="landing" className=" flex flex-col w-full h-full">
    <div
      className="flex flex-col gap-3 items-center justify-center min-h-screen lg:px-24 md:px-12 px-6"
    >
      <motion.div initial={{ opacity: 0}}
  animate={{ opacity: 1}}
  transition={{ duration: 1}} className=" flex flex-col md:flex-row gap-5 justify-between items-center w-full">
        <div className=" flex flex-col gap-5 justify-start w-full  md:w-2/3">
      <motion.h1 initial={{ opacity: 0, y:100}}
  animate={{ opacity: 1, y:0}}
  transition={{ duration: 0.8, delay:0}} className=" text-4xl font-bold md:w-2/3 w-full">
        <span className=" text-purple-300">Capturing</span> Moments, Creating Memories!
      </motion.h1>
      
      <motion.p initial={{ opacity: 0, y:100}}
  animate={{ opacity: 1, y:0}}
  transition={{ duration: 0.8, delay:0.6}} className=" text-lg font-medium ">
        Welcome to Vshoot, a platform dedicated to photographers, videographers,
        and all creative souls. Discover and share your visual artistry with the
        world.
      </motion.p>
      </div>
      <div className=" flex w-1/3 justify-center items-center">
      <motion.img initial={{ opacity: 1, y:100}}
  animate={{ opacity: 1, y:0}}
  transition={{ duration: 2, repeat:Infinity, repeatType:"reverse"}} src="/cam.png" width={200} height={200}/>
  </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y:60}}
  animate={{ opacity: 1, y:0}}
  transition={{ duration: 0.8, delay:1.2}} className=" flex flex-col w-full justify-center items-center mt-24 gap-16">
      <motion.button transition={{ duration: 2, ease:"easeInOut"}}  whileHover={{borderRadius:"9999px"}} onClick={()=>{handleStart()}}
        className=" text-slate-950 text-xl font-bold bg-slate-50 p-5 rounded-sm  hover:bg-slate-200 transition-all " 
      >
        Shoot your shot
      </motion.button>
      <motion.h1 initial={{ opacity: 0, y:60}}
  animate={{ opacity: 1, y:0}}
  transition={{ duration: 0.8, delay:1.6}} className=" text-lg italic text-center ">&quot;<span className=" text-purple-400 ">Connect, Collaborate, Create</span> on the Ultimate Platform for Creative Professionals&quot;</motion.h1>
      </motion.div>
    </div>
    <Intro/>
    <Description/>
    <About/>
    <Contact/>
    </main>
  );
}
