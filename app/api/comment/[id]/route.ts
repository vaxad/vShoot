import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server"

const key = process.env.NEXT_PUBLIC_JWT_KEY || "";


export async function POST(req: Request,{ params }: any) {
    try {
        const postid = params.id; 
        const post = await req.json();
        
        const postData = await prisma.comment.create({
            data:{
                creatorId:post.creatorId,
                content:post.content,
                aboutId:postid,
                createdAt:new Date(Date.now())
            }
        }) 
        return NextResponse.json({ comment: postData });
    } catch (error) {
        console.error('comment creation failed:', error);
        return NextResponse.json({ message: 'comment creation failed' });
    }
};

export async function GET(request: NextRequest, { params }: any) {
    // we will use params to access the data passed to the dynamic route
    try {
    const postid = params.id; 
    const comments = await prisma.comment.findMany({where:{aboutId:postid},orderBy:{createdAt:"desc"}})
    return NextResponse.json({ comments: comments });
} catch (error) {
    return NextResponse.json({ error: "error" });
}
}
