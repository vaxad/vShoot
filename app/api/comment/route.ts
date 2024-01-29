
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const post = await req.json();
        
        const postData = await prisma.comment.create({
            data:{
                creatorId:post.creatorId,
                content:post.content,
                aboutId:post.aboutId,
                createdAt:new Date(Date.now())
            }
        }) 
        return NextResponse.json({ comment: postData });
    } catch (error) {
        console.error('comment creation failed:', error);
        return NextResponse.json({ message: 'comment creation failed' });
    }
};