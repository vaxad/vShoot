
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const post = await req.json();
        
        const postData = await prisma.post.create({
            data:{
                creatorId:post.creatorId,
                caption:post.caption,
                imgs:post.imgs,
                tags:post.tags,
                loc_name:post.location.display_name,
                loc_lat:parseFloat(post.location.lat),
                loc_lon:parseFloat(post.location.lon)
            }
        }) 
        return NextResponse.json({ post: postData });
    } catch (error) {
        console.error('user creation failed:', error);
        return NextResponse.json({ message: 'user creation failed' });
    }
};

export async function GET(req: Request) {
    try {
        const postData = await prisma.post.findMany()
        return NextResponse.json({ posts: postData });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Email sending failed' });
    }
};

export async function PUT(req: Request) {
    try {
        const {id} = await req.json();
        const postData = await prisma.post.findUnique({
            where:{
                id:id
            }
        })
        return NextResponse.json({ post: postData });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Email sending failed' });
    }
};

interface Coordinates {
    latitude: number;
    longitude: number;
  }

function areCoordinatesClose(coord1:Coordinates, coord2:Coordinates, threshold:number) {

    if (!coord1 || !coord2) {
      console.log("no coord")
      return false
    }
    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
    const R = 6371; // Earth's radius in kilometers

    const lat1 = toRadians(coord1.latitude);
    const lon1 = toRadians(coord1.longitude);
    const lat2 = toRadians(coord2.latitude);
    const lon2 = toRadians(coord2.longitude);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c * 1000; // Convert to meters

    return distance < threshold;
  }

  const checkProximity = ({latitude, longitude, latitude2, longitude2}:{latitude:number,longitude:number, latitude2:number, longitude2:number}) => {
    console.log(latitude2, longitude2, latitude, longitude)
    const c1 = { latitude: (latitude2), longitude: (longitude2) }
    const c2 = { latitude: (latitude), longitude: (longitude) }
    if (!c2.latitude || !c2.longitude)
      return false
    const threshold = 1000
    return areCoordinatesClose(c1, c2, threshold)
  }

  export async function PATCH(req: Request) {
    try {
        const {lat, lon, id} = await req.json();
        const postData = await prisma.post.findMany();
        const filteredPosts = postData.filter((post)=> {
            if(!post.loc_lat||!post.loc_lon||post.id===id){
                return false
            }else{
                return checkProximity({latitude:post.loc_lat,longitude:post.loc_lon, latitude2:lat, longitude2:lon})
            }
        })
        return NextResponse.json({ posts: filteredPosts });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Email sending failed' });
    }
};