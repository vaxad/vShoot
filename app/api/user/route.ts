
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const {name} = await req.json();
        const users = await prisma.user.findMany(
            {
                where: {
                    verified:true
                }
            }
        )
        const filteredUsers = users.filter((user)=>user.name?.includes(name))
        return NextResponse.json({ users: filteredUsers });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Email sending failed' });
    }
};
