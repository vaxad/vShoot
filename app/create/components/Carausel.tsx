import { useEffect, useState } from "react"

export default function Carausel({ imgs, removeImage } : {imgs: string[], removeImage: (imageIndex: Number) => void}) {
    const [imageIndex, setimageIndex] = useState(0)
    const next = () => { setimageIndex((imageIndex+1)%(imgs.length)) }
    const prev = () => { setimageIndex((imageIndex-1)%(imgs.length)<0?(imageIndex-1)%(imgs.length)*-1:(imageIndex-1)%(imgs.length)) }
    useEffect(() => {
      setimageIndex(0)
    }, [imgs])
    

    // const removeImage = (imageIndex : Number) => {
    //     console.log(imageIndex)
    //     const filteredImgs= imgs.filter((element, index) => index!==imageIndex)
    //     setImgs(filteredImgs)
    //     const filteredImgFiles = imgFiles.filter((element, index) => index!==imageIndex)
    //     setImgFiles(filteredImgFiles)
        
    // }
    return (
    <div x-data="imageSlider" className="w-full flex relative flex-col mx-auto max-w-2xl overflow-hidden rounded-md bg-gray-100 p-2 sm:p-4">
        {/* <div className="absolute right-5 top-5 z-10 rounded-full bg-gray-600 px-2 text-center text-sm text-white">
            <span x-text="currentIndex"></span>/<span x-text="images.length"></span>
        </div> */}
        <button className=" z-50 absolute top-5 right-5 text-purple-500 text-2xl cursor-pointer" onClick={()=>removeImage(imageIndex)}>x</button>

    {imageIndex>0&&<button onClick={()=>prev()} className="absolute text-purple-500 left-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 shadow-md">
            {"<"}
        </button>}

        {imageIndex<imgs.length-1&&<button onClick={()=>next()} className="absolute text-purple-500 right-5 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-gray-100 shadow-md">
        {">"}
        </button>}

        <div className=" relative w-full h-full">
                <div className="w-full flex  top-0">
                    <img src={imgs[imageIndex]} alt="image" className="rounded-sm" />
                </div>
        </div>
    </div>

  )
}
