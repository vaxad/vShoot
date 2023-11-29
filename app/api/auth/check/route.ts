import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { cookies } from "next/headers";
import { sign } from "jsonwebtoken";

const key = process.env.NEXT_PUBLIC_JWT_KEY || "";
export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    console.log(email)
    const oldUser = await prisma.user.findFirst({
      where: { email: email },
    });
    console.log("helo")
    console.log(oldUser);
    if (!oldUser?.name) {
      return NextResponse.json({ user: oldUser,new: true, veriified: oldUser?.verified });
    } else {
      const token = sign({ id: oldUser.id }, key);
      cookies().set('authToken', token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        path: '/',
        httpOnly: true, // for added security, making the cookie inaccessible via JavaScript
      });
        return NextResponse.json({ user: oldUser,old: true, verified: oldUser?.verified });
      }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: true });
  }
}
