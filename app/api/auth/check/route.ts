import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

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
      return NextResponse.json({ new: true });
    } else {
        return NextResponse.json({ old: true });
      }
  } catch (error) {
    console.log(error);
  }
}
