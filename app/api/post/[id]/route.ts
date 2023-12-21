import prisma from "@/prisma/client";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const key = process.env.NEXT_PUBLIC_JWT_KEY || "";

export async function GET(request: NextRequest, { params }: any) {
    // we will use params to access the data passed to the dynamic route
    const postid = params.id;

    const token = cookies().get("authToken");
    if (token) {
        const { id } = jwt.verify(token?.value as string, key) as { id: string };

        const oldUser = await prisma.user.findFirst({
            where: { id: id as string },
        });

        if (oldUser) {
            const post = await prisma.post.findUnique({
                where: {
                    id: postid
                }
            })
            if (post) {
                const newLikes = post.likes
                return NextResponse.json({ post: post, liked :newLikes.includes(id as string) });
            }
        }
    }
    console.log("error")
    return NextResponse.json({ error: "error" });
}

export async function PATCH(request: NextRequest, { params }: any) {
    // we will use params to access the data passed to the dynamic route
    const postid = params.id;

    const token = cookies().get("authToken");
    if (token) {
        const { id } = jwt.verify(token?.value as string, key) as { id: string };

        const oldUser = await prisma.user.findFirst({
            where: { id: id as string },
        });
        
const  removeValue =(value:string, index:number, arr:string[])=> {
    // If the value at the current array index matches the specified value (2)
    if (value === id) {
    // Removes the value from the original array
        arr.splice(index, 1);
        return true;
    }
    return false;
}

        if (oldUser) {
            const post = await prisma.post.findUnique({
                where: {
                    id: postid
                }
            })
            if (post) {
                const newLikes = post.likes
                if (!newLikes.includes(id as string)) {
                    newLikes.push(id as string)
                } else {
                    newLikes.filter(removeValue)
                }
                console.log(newLikes)
                const updatedPost = await prisma.post.update({
                    where: {
                        id: postid
                    },
                    data: {
                        likes: newLikes
                    }
                })
                console.log(updatedPost)
                return NextResponse.json({ post: updatedPost });
            }
        }
    }
    console.log("error")
    return NextResponse.json({ error: "error" });
}