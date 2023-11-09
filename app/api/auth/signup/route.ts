import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers"

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
      role
    } = await req.json();
    const oldUser = await prisma.user.findFirst({
      where: { email: email },
    });
    if (oldUser) {
      const createdUser = await prisma.user.update({
        where: { id: oldUser.id },
        data: {
          name: name,
          country: country,
          state: state,
          city: city,
          gender: gender,
          dob: new Date(dob),
          profession: profession,
          role: role
        },
      });
      if (createdUser) {
        const token = jwt.sign({ id: createdUser.id }, key);
        createdUser.password = "****************";
        cookies().set('authToken', token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          path: '/',
          httpOnly: true, // for added security, making the cookie inaccessible via JavaScript
        });
        return NextResponse.json({ user: createdUser, token });
      } else {
        NextResponse.error();
      }
    }else{
      const createdUser = await prisma.user.create({
        data: {
          name: name,
          email:email,
          password:password,
          country: country,
          state: state,
          city: city,
          gender: gender,
          dob: new Date(dob),
          profession: profession,
          role: role
        },
      });
      if (createdUser) {
        const token = jwt.sign({ id: createdUser.id }, key);
        createdUser.password = "****************";
        cookies().set('authToken', token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          path: '/',
          httpOnly: true, // for added security, making the cookie inaccessible via JavaScript
        });
        return NextResponse.json({ user: createdUser, authToken: token });
      } else {
        NextResponse.error();
      }
    }
  } catch (error) {
    console.log(error);
  }
}


export async function PUT(req: Request) {
  try {
    const {
      email
    } = await req.json();
    const oldUser = await prisma.user.findFirst({
      where: { email: email },
    });
    if (oldUser) {
        const token = jwt.sign({ id: oldUser.id }, key);
        oldUser.password = "****************";
        cookies().set('authToken', token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          path: '/',
          httpOnly: true, // for added security, making the cookie inaccessible via JavaScript
        });
        return NextResponse.json({ user: oldUser, token });
    }
  } catch (error) {
    console.log(error);
  }
}

