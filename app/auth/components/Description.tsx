import {motion} from "framer-motion"

export default function Description() {
    const content = [
        {
            title:"Connecting Creatives",
            desc:"Connect with like-minded individuals and industry experts. Forge valuable connections that will elevate your projects and your career"
        },
        {
            title:"Showcase Your Work",
            desc:"Display your portfolio in a stunning and customizable profile. Your work deserves the spotlight it craves"
        },
        {
            title:"Find Clients & Opportunities",
            desc:"Let clients find you. Showcase your skills, attract potential clients, and secure your next big project"
        },
        {
            title:"Build Your Dream Team",
            desc:"Dream projects require dream teams. Discover the perfect collaborators for your next creative endeavor"
        },
        {
            title:"Community & Support",
            desc:"Join a thriving community of passionate artists. Get feedback, share experiences, and grow together"
        },
        {
            title:"Unlock Your Creative Potential",
            desc:"Whether you're a seasoned professional or just starting your journey, we're here to empower you."
        }

    ]
  return (
    <div className=" flex flex-col justify-center items-center min-h-screen w-full gap-24 px-24">
        <motion.h1 initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:0.8}} className=" text-4xl font-bold tracking-wide">WHY <span className=" text-purple-500">vSHOOT</span>?</motion.h1>
        <div className=" grid grid-cols-3 justify-center items-center gap-12 w-full">
            {content.map((element, index)=>{
                const delay = 0.3+((index)/10)
                return (
                    <motion.div initial={{opacity:0, y:50}} whileInView={{opacity:1, y:0}} transition={{duration:0.8, delay}} key={index} className=" flex flex-col h-full w-full bg-purple-600 gap-2 p-5 rounded-lg cursor-default">
                <h1 className=" text-xl">{element.title}</h1>
                <hr></hr>
                <p>{element.desc}</p>
            </motion.div>
                )
            })
            }
        </div>
    </div>
  )
}
