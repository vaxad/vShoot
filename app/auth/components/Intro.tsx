import {motion} from "framer-motion"

export default function Intro() {
  return (
    <div className=" w-full flex flex-col min-h-[100vh] justify-center items-center md:gap-24 gap-6 lg:px-24 md:px-12 px-6">
        <motion.h1 initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.8}} className=" text-4xl font-bold tracking-wide">WHAT IS <span className=" text-purple-500">vSHOOT</span>?</motion.h1>

        <div className=" flex flex-col  md:flex-row gap-12 justify-between w-full">
            <motion.div initial={{opacity:0, x:0}} whileInView={{opacity:1, x:0}} transition={{duration:0.5, delay:0.2, ease:'easeIn'}} className=" flex flex-col gap-5 w-full">
                <h1 className=" text-xl md:text-2xl lg:text-4xl font-bold ">Welcome to the hub of artistic minds, a place where <span className=" text-purple-400 stroke-white stroke-2">creativity knows no bounds</span></h1>
                <p className=" lg:text-2xl md:text-xl text-md">Our platform is dedicated to the dreamers, visionaries, and innovators in the world of photography, videography, and creative design. Whether you&apos;re a seasoned professional or just starting your journey, we&apos;re here to empower you.</p>
            </motion.div>
            <motion.div initial={{opacity:0, x:100}} whileInView={{opacity:1, x:0}} transition={{duration:1, delay:0.4, ease:'easeIn'}} className=" flex w-full justify-center items-center">
            <img src="/intro.png" width={400} height={400}/>
            </motion.div>
        </div>
    </div>
  )
}
