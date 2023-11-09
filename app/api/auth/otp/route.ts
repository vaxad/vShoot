import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

const key = process.env.NEXT_PUBLIC_JWT_KEY || "";
export async function POST(req: Request) {
  try {
    const {otp, email} = await req.json()
    
    const oldUser = await prisma.user.findFirst({
      where: { email: email },
    });
    if (!oldUser) {
      return NextResponse.json({ error: "does not exist" });
    } else {
        if(oldUser.otp === otp){
            const updatedUser = await prisma.user.update({
                where: { id: oldUser.id },
                data: {
                  verified: true
                },
            })
        return NextResponse.json({ verified: true });
        }else{
        return NextResponse.json({ verified: false });
        }
    }
  } catch (error) {
    console.log(error);
  }
}
