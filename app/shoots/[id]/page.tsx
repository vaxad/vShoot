"use client"

import { Post } from "@prisma/client"
import axios from "axios"
import { useEffect, useState } from "react"
import L, { LatLngExpression } from "leaflet"
import PostCard from "@/app/home/components/PostCard"
import {motion} from "framer-motion"

type Params = {
    params: {
        id:string
    }
}

export default function page({params:{id}}:Params) {
    const [post, setpost] = useState({} as Post)
    const [posts, setposts] = useState([] as Post[])

    const getData=async() => {
        const resp = (await axios.put("/api/post",JSON.stringify({id:id}))).data
        console.log(resp)
        setpost(resp.post)
    }

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
        var container = L.DomUtil.get('map');
    
        if (container != null) {
    
          container._leaflet_id = null;
    
        }
        console.log("hello")
        var map = L.map('map').setView([post.loc_lat as number, post.loc_lon as number], 50);
        // Create an array to store the markers
        var markers = [];
    
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);
        // Loop through the coordinates array
        for (var i = 0; i < posts.length; i++) {
          var coordinate = [posts[i].loc_lat, posts[i].loc_lon] as LatLngExpression;
    
          // Create a marker for each coordinate
          var marker = L.marker(coordinate).addTo(map);
          markers.push(marker);
    
          // Add a popup to each marker with coordinate information
        //   marker.bindPopup(posts[i].creatorId);
        }
        var customIcon2 = L.icon({
          iconUrl: '/location.png',
          iconSize: [32, 32], // set the size of the icon
          iconAnchor: [16, 32], // set the anchor point
          popupAnchor: [0, -32], // set the popup anchor
        });
        const latitude = 21.170240     //temp
        const longitude = 72.831062    //temp
        var marker = L.marker([latitude, longitude], { icon: customIcon2 }).addTo(map).bindPopup("You are here");
    
        // Create a feature group from the array of markers
        var markerGroup = L.featureGroup(markers);
    
        // Fit the map to the bounds of the marker group
        map.fitBounds(markerGroup.getBounds());
    
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
         { <div id="map" className=" z-10 col-span-3 rounded-xl my-8" style={{ height: "40vh", width:"80vw" }}></div>}
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
