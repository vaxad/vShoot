import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import jwt from "jsonwebtoken";
import { hash } from "bcrypt";

const key = process.env.NEXT_PUBLIC_JWT_KEY || "";
export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      password,
      state,
      country,
      city,
      profession,
      dob,
      gender,
    } = await req.json();
    const oldUser = await prisma.user.findFirst({
      where: { email: email },
    });
    if (oldUser) {
      return NextResponse.json({ error: "already exists" });
    } else {
      const encryptedPass = await hash(password, 10);
      const createdUser = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: encryptedPass,
          country: country,
          state: state,
          city: city,
          gender: gender,
          dob: new Date(dob),
          profession: profession,
        },
      });
      if (createdUser) {
        const token = jwt.sign({ id: createdUser.id }, key);
        createdUser.password = "****************";
        return NextResponse.json({ user: createdUser, token });
      } else {
        NextResponse.error();
      }
    }
  } catch (error) {
    console.log(error);
  }
}
