import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function middleware(req: NextRequest) {
  const token = req.headers.get("auth-token");
  const newHeaders = new Headers(req.headers)
  if (token) {
    return NextResponse.next()
  } else {
    return NextResponse.json({ error: "unauthorized" })
  }
}

export const config = {
  matcher: ['/api/auth']
};