
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const post = await req.json();
        
        const postData = await prisma.post.create({
            data:{
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

