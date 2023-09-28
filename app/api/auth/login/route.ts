import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import { type } from "os";

const key = process.env.NEXT_PUBLIC_JWT_KEY || "";
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const oldUser = await prisma.user.findFirst({
      where: { email: email },
    });
    if (!oldUser) {
      return NextResponse.json({ error: "already does not exist" });
    } else {
      const passMatched = await compare(password, oldUser.password);
      if (passMatched) {
        const token = jwt.sign({ id: oldUser.id }, key);
        oldUser.password = "****************";
        return NextResponse.json({ user: oldUser, token });
      } else {
        return NextResponse.json({ error: "incorrect credentials" });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
