"use client"
import { useEffect, useState } from "react"

export default function Carausel({ imgs, removeImage } : {imgs: string[], removeImage: (imageIndex: Number) => void} | {imgs: string[], removeImage: null}  ) {
    const [imageIndex, setimageIndex] = useState(0)
    const next = () => { setimageIndex((imageIndex+1)%(imgs.length)) }
    const prev = () => { setimageIndex((imageIndex-1)%(imgs.length)<0?(imageIndex-1)%(imgs.length)*-1:(imageIndex-1)%(imgs.length)) }
    useEffect(() => {
      setimageIndex(0)
    }, [imgs])
    
    const [startX, setStartX] = useState(null as any);

  const handleTouchStart = (e:React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e:React.TouchEvent<HTMLDivElement>) => {
    // You can perform additional calculations based on touch move if needed
    e.preventDefault();
  };

  const handleTouchEnd = (e:React.TouchEvent<HTMLDivElement>) => {
    if (startX !== null) {
      const endX = e.changedTouches[0].clientX;
      const deltaX = endX - startX;

      if (deltaX > 50) {
        // Swipe right
        next()
        console.log('Swipe right');
      } else if (deltaX < -50) {
        // Swipe left
        console.log('Swipe left');
        prev()
      }

      // Reset the startX after processing the swipe
      setStartX(null);
    }
  };
    return (
    <div x-data="imageSlider"
    onTouchStart={(e)=>handleTouchStart(e)}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
     className="w-full flex relative flex-col mx-auto max-w-2xl overflow-hidden rounded-md  p-2 sm:p-4">
        {/* <div className="absolute right-5 top-5 z-10 rounded-full bg-gray-600 px-2 text-center text-sm text-white">
            <span x-text="currentIndex"></span>/<span x-text="images.length"></span>
        </div> */}
        {!!removeImage&&<button className="  absolute top-0 right-0 text-slate100 text-2xl cursor-pointer bg-purple-600 rounded-full " onClick={()=>removeImage(imageIndex)}>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className=" w-8" fill="currentColor" viewBox="0 0 32 32">
<path d="M 8.71875 7.28125 L 7.28125 8.71875 L 14.5625 16 L 7.28125 23.28125 L 8.71875 24.71875 L 16 17.4375 L 23.28125 24.71875 L 24.71875 23.28125 L 17.4375 16 L 24.71875 8.71875 L 23.28125 7.28125 L 16 14.5625 Z"></path>
</svg>
        </button>}

    {imageIndex>0&&<button onClick={()=>prev()} className="absolute text-purple-500 left-0 top-1/2 z-10 flex w-10 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 shadow-md">
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-full rotate-180" fill="currentColor" viewBox="0 0 50 50">
<path d="M 25 2 C 12.308594 2 2 12.308594 2 25 C 2 37.691406 12.308594 48 25 48 C 37.691406 48 48 37.691406 48 25 C 48 12.308594 37.691406 2 25 2 Z M 25 4 C 36.609375 4 46 13.390625 46 25 C 46 36.609375 36.609375 46 25 46 C 13.390625 46 4 36.609375 4 25 C 4 13.390625 13.390625 4 25 4 Z M 21.90625 13.96875 C 21.863281 13.976563 21.820313 13.988281 21.78125 14 C 21.40625 14.066406 21.105469 14.339844 21 14.703125 C 20.894531 15.070313 21.003906 15.460938 21.28125 15.71875 L 30.5625 25 L 21.28125 34.28125 C 20.882813 34.679688 20.882813 35.320313 21.28125 35.71875 C 21.679688 36.117188 22.320313 36.117188 22.71875 35.71875 L 32.71875 25.71875 C 32.914063 25.53125 33.023438 25.269531 33.023438 25 C 33.023438 24.730469 32.914063 24.46875 32.71875 24.28125 L 22.71875 14.28125 C 22.511719 14.058594 22.210938 13.945313 21.90625 13.96875 Z"></path>
</svg>
        </button>}

        {imageIndex<imgs.length-1&&<button onClick={()=>next()} className="absolute text-purple-500 right-0 top-1/2 z-10 flex w-10 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-full" fill="currentColor" viewBox="0 0 50 50">
<path d="M 25 2 C 12.308594 2 2 12.308594 2 25 C 2 37.691406 12.308594 48 25 48 C 37.691406 48 48 37.691406 48 25 C 48 12.308594 37.691406 2 25 2 Z M 25 4 C 36.609375 4 46 13.390625 46 25 C 46 36.609375 36.609375 46 25 46 C 13.390625 46 4 36.609375 4 25 C 4 13.390625 13.390625 4 25 4 Z M 21.90625 13.96875 C 21.863281 13.976563 21.820313 13.988281 21.78125 14 C 21.40625 14.066406 21.105469 14.339844 21 14.703125 C 20.894531 15.070313 21.003906 15.460938 21.28125 15.71875 L 30.5625 25 L 21.28125 34.28125 C 20.882813 34.679688 20.882813 35.320313 21.28125 35.71875 C 21.679688 36.117188 22.320313 36.117188 22.71875 35.71875 L 32.71875 25.71875 C 32.914063 25.53125 33.023438 25.269531 33.023438 25 C 33.023438 24.730469 32.914063 24.46875 32.71875 24.28125 L 22.71875 14.28125 C 22.511719 14.058594 22.210938 13.945313 21.90625 13.96875 Z"></path>
</svg> </button>}


        <div className=" relative h-[30vh] max-h-[40vh]">
                <div className="w-full flex h-full justify-center items-center relative  top-0 overflow-x-hidden">
                    {/* <img src={imgs[imageIndex]} alt="image" className="rounded-sm  h-full" /> */}
                    {imgs.map((val,ind)=>(
                        <img key={ind} src={val} alt="image" className={`rounded-sm w-full absolute top-0 h-full ${ind===imageIndex?"":ind>imageIndex?`translate-x-[100vw]`:`-translate-x-[100vw]`}`} style={{transitionDuration:"2s", transitionDelay:"0.5s", transitionProperty:"all", transitionTimingFunction:"ease-in-out"}} />
                    ))}
                </div>
        </div>
        <div className=" flex flex-row gap-2 absolute bottom-10 left-0 right-0 w-fit  ml-auto mr-auto">
    {imgs.length>1&&imgs.map((val,ind)=>{
        return (
            <div key={ind} className={` text-4xl ${ind===imageIndex?"bg-slate-300":"bg-slate-500"} w-3 h-3 rounded-full font-bold`}></div>
        )
    })}
</div>
    </div>

  )
}
