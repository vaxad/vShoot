import {motion} from 'framer-motion'

export default function Contact() {
  return (
    <div className=' flex flex-col justify-center items-center w-full p-8 rounded-t-3xl bg-gradient-to-br from-purple-400 to-purple-950 '>
        <h1 className=' text-2xl font-bold pb-5'>CONTACT US</h1>
        <hr className=' w-full flex pb-8'></hr>
        <div className=' flex flex-row justify-between w-full  gap-12 '>
            <div className=' flex w-1/3 justify-center items-center max-h-[20vh] overflow-hidden'>
                <img src='/logo.png' width={400}/>
            </div>
            <div className=' flex flex-col gap-2 w-1/3 justify-start items-start'>
                <h1 className=' text-xl font-bolD'>Stay Connected</h1>
                <div className=' flex flex-row justify-start items-center gap-3'>
                    <img src='/email.png' width={20} height={0}></img>
                    <h2 className=' text-sm text-slate-300'>@vshoot.in</h2>
                </div>
                <div className=' flex flex-row justify-start items-center gap-3'>
                    <img src='/email.png' width={20} height={20}></img>
                    <h2 className=' text-sm text-slate-300'>Vshoot Inc</h2>
                </div>
            </div>
            <div className=' flex flex-col gap-2 w-2/3 justify-start items-start'>
                <h1 className=' text-xl font-bolD'>Get in Touch</h1>
                <p>Have questions or feedback? We'd love to hear from you.</p>
                <div className=' flex flex-row justify-start items-center gap-3'>
                    <img src='/email.png' width={20} height={20}></img>
                    <h2 className=' text-sm text-slate-300'>testvaxad@gmail.com</h2>
                </div>
                <div className=' flex flex-row justify-start items-center gap-3'>
                    <img src='/email.png' width={20} height={20}></img>
                    <h2 className=' text-sm text-slate-300'>625-222-4431</h2>
                </div>
            </div>
            
            
        </div>
    </div>
  )
}
