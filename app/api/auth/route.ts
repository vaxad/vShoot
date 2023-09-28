import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";

const key = process.env.NEXT_PUBLIC_JWT_KEY || "";
export async function GET(req: NextRequest) {
  try {
    const headersInstance = req.headers;
    const token = headersInstance.get("auth-token");
    if (token) {
      const data = (await jwt.verify(token, key)) as JwtPayload;
      const user = await prisma.user.findUnique({
        where: {
          id: data.id as string,
        },
      });
      if (user) user.password = "****************";
      return NextResponse.json({ user });
    } else {
      return NextResponse.error();
    }
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const headersInstance = req.headers;
    const token = headersInstance.get("auth-token");
    if (token) {
      const data = (await jwt.verify(token, key)) as JwtPayload;
      const user = await prisma.user.delete({
        where: {
          id: data.id as string,
        },
      });
      return NextResponse.json({ user, message: "user deleted successfully" });
    } else {
      return NextResponse.error();
    }
  } catch (error) {
    console.log(error);
  }
}
