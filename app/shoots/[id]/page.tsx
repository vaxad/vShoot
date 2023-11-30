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
        id:string
    }
}

export default function Page({params:{id}}:Params) {
    const [post, setpost] = useState({} as Post)
    const [posts, setposts] = useState([] as Post[])
    // const map = useMap()
    // const [leafletmap, setLeafletmap] = useState(null as any)

    const getData=async() => {
        const resp = (await axios.put("/api/post",JSON.stringify({id:id}))).data
        console.log(resp)
        setpost(resp.post)
    }
    // useEffect(() => {
    //   const temp = L.map("map")
    //   setLeafletmap(temp)
    // }, [])
    

    useEffect(() => {
      getData()
    }, [])

    useEffect(() => {
        const getData=async() => {
            const resp = (await axios.patch("/api/post",JSON.stringify({lat:post.loc_lat, lon:post.loc_lon ,id:id}))).data
            console.log(resp)
            setposts([post,...resp.posts])
        }
        if(post.loc_lat){
            getData()
        }
    }, [post])
    

    const setMap = (posts:Post[]) => {
    //     var container = L.DomUtil.get('map') as any;
    
    //     if (container != null) {
    
    //       container._leaflet_id = null;
    
    //     }
    //     console.log("hello")
    //     // return () => {
    //     var map = L.map("map").setView([post.loc_lat as number, post.loc_lon as number], 50);
    //     // Create an array to store the markers
    //     var markers = [];
    
    //     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution: '© OpenStreetMap contributors',
    // }).addTo(map);
    //     // Loop through the coordinates array
    //     for (var i = 0; i < posts.length; i++) {
    //       var coordinate = [posts[i].loc_lat, posts[i].loc_lon] as LatLngExpression;
    
    //       // Create a marker for each coordinate
    //       var marker = L.marker(coordinate).addTo(map);
    //       markers.push(marker);
    
    //       // Add a popup to each marker with coordinate information
    //     //   marker.bindPopup(posts[i].creatorId);
    //     }
    //     var customIcon2 = L.icon({
    //       iconUrl: '/location.png',
    //       iconSize: [32, 32], // set the size of the icon
    //       iconAnchor: [16, 32], // set the anchor point
    //       popupAnchor: [0, -32], // set the popup anchor
    //     });
    //     const latitude = 21.170240     //temp
    //     const longitude = 72.831062    //temp
    //     var marker = L.marker([latitude, longitude], { icon: customIcon2 }).addTo(map).bindPopup("You are here");
    
    //     // Create a feature group from the array of markers
    //     var markerGroup = L.featureGroup(markers);
        
    //     // Fit the map to the bounds of the marker group
    //     map.fitBounds(markerGroup.getBounds());
    //   // }
    
      }

      useEffect(() => {
        if(posts.length>0){
            setMap(posts)
        }
      }, [posts])

  return (
    <div className=" flex w-full flex-col justify-center items-center p-24">
        <motion.div initial={{ opacity: 0}}
  animate={{ opacity: 1}}
  transition={{ duration: 1 }} className=" text-4xl">{post.loc_name?post.loc_name.length>50?post.loc_name.slice(0,50)+"...":post.loc_name:""}
  </motion.div>
         {<div className={`${post.loc_lat?"":" hidden"}  z-10 col-span-3 rounded-xl my-8`} style={{ height: "40vh", width:"80vw"}}>
          {typeof window!=="undefined"&&post.loc_lat&&<MapContainer style={{width:"100%", height:"40vh", borderRadius:"10px"}} center={[post.loc_lat as number, post.loc_lon as number]} zoom={13} scrollWheelZoom={true} doubleClickZoom={true} dragging={true}>
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
