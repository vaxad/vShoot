import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const key = process.env.NEXT_PUBLIC_JWT_KEY || "";
export async function POST(req: Request) {
  try {
    const token = cookies().get("authToken");
    if(token){
    const id = jwt.verify(token?.value as string, key)
    const oldUser = await prisma.user.findFirst({
      where: { id: id?.id as string },
    });
    if (!oldUser) {
      return NextResponse.json({ error: "does not exist" });
    } else {
        return NextResponse.json({ user: oldUser });
    }
  }else{
    return NextResponse.json({ expired : true });
  }
  } catch (error) {
    console.log(error);
  }
}
