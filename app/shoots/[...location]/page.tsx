"use client"

import { Post } from "@prisma/client"
import axios from "axios"
import { useEffect, useState } from "react"
// import { Icon } from "leaflet"
import PostCard from "@/app/home/components/PostCard"
import {motion} from "framer-motion"
import { MapContainer, Marker, Popup, TileLayer,  } from "react-leaflet"

type Params = {
    params: {
        location: string[]
    }
}

export default function Page({params:{location}}:Params) {
    const [post, setpost] = useState({} as Post)
    const [posts, setposts] = useState([] as Post[])
    // const map = useMap()
    // const [leafletmap, setLeafletmap] = useState(null as any)
    const lat = location[0]
    const lon = location[1]

    useEffect(() => {
        const getData=async() => {
            const resp = (await axios.patch("/api/post",JSON.stringify({lat:lat,lon:lon}))).data
            console.log(resp)
            setpost(resp.posts[0])
            setposts([...resp.posts])
        }
        if(lat&&lon){
            getData()
        }
    }, [])
    

  return (
    <div className=" flex w-full flex-col justify-center items-center p-24">
        <motion.div initial={{ opacity: 0}}
  animate={{ opacity: 1}}
  transition={{ duration: 1 }} className=" text-4xl">{posts.length>0?posts[0].loc_name?posts[0].loc_name.length>50?posts[0].loc_name.slice(0,50)+"...":posts[0].loc_name:"":""}
  </motion.div>
         {<div className={`${posts.length>0?"":" hidden"}  z-10 col-span-3 rounded-xl my-8`} style={{ height: "40vh", width:"80vw"}}>
          {typeof window!=="undefined"&&posts.length>0&&<MapContainer style={{width:"100%", height:"40vh", borderRadius:"10px"}} center={[posts[0].loc_lat as number, posts[0].loc_lon as number]} zoom={13} scrollWheelZoom={true} doubleClickZoom={true} dragging={true}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {posts.length>1?posts.map((el)=>{
    // const loc_icon = new Icon({
    //   iconUrl: "/location.png",
    //   iconSize: [32, 32], // set the size of the icon
    //   iconAnchor: [16, 32], // set the anchor point
    //   popupAnchor: [0, -32], // set the popup anchor
    // });
    return el.id===post.id?(
      <Marker position={[el.loc_lat as number, el.loc_lon as number]} opacity={1}>
    <Popup>
      {el.loc_name}
    </Popup>
    </Marker>
    ):
    (
        <Marker position={[el.loc_lat as number, el.loc_lon as number]} opacity={0.5}>
      <Popup>
        {el.loc_name}
      </Popup>
      </Marker>
    )
  }):(
    <Marker position={[post.loc_lat as number, post.loc_lon as number]} >
    <Popup>
      {post.loc_name}
    </Popup>
  </Marker>
  )
  
}
</MapContainer>}
          </div>}
         <div className=" w-full grid grid-cols-3 gap-5 ">
    {posts.map((post:Post)=>{
      return (
        <PostCard key={post.id} props={post} />
      )
    })}
  </div>
    </div>
  )
}
