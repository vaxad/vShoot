import {motion} from "framer-motion"

export default function About() {
    const content = [ 
        {
            title:"Our Mission",
            desc: "Our mission is to empower creative professionals by providing a platform to showcase their talents, find opportunities, and build lasting connections"
        },
        {
            title:"Why Choose Us",
            desc: "We're more than just a network; we're a creative movement. We are dedicated to your success"
        },
        {
            title:"Our Values",
            desc: "Creativity, Community, Collaboration - These are the pillars that guide us"
        }
        
    ]
  return (
    <div className=" flex flex-col justify-center items-center w-full min-h-screen gap-24 px-24">
        <motion.h1 initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.8}} className=" text-4xl font-bold tracking-wide">ABOUT <span className=" text-purple-500">vSHOOT</span></motion.h1>
        <div className=" flex flex-col gap-8 w-full ">
            {content.map((element,index)=>{
                const initX=index%2==0?-100:100
                const del = 0.4+((index)/10)
                return (
                    <motion.div initial={{opacity:0,x:initX}} whileInView={{opacity:1,x:0}} transition={{duration:0.8, delay:del}} key={index} className={` flex flex-col gap-2 w-full bg-purple-500 bg-opacity-20 p-5 rounded-lg ${index%2==0?" justify-start text-start":" justify-end text-end"}`}>
                        <h1 className=" text-2xl font-bold underline decoration-purple-600">{element.title}</h1>
                        <p className=" italic">&quot;{element.desc}&quot;</p>
                    </motion.div>
                )
            })}
        </div>
    </div>
  )
}
