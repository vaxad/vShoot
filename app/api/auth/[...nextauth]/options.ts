import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/prisma/client';
import { compare, hash } from 'bcrypt';
import { cookies } from 'next/headers';
import jwt from "jsonwebtoken"

const key = process.env.NEXT_PUBLIC_JWT_KEY || "";

export const options: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email:",
                    type: "email",
                    placeholder: "abc@gmail.com"
                },
                password: {
                    label: "Password:",
                    type: "password",
                    placeholder: "@4nsd@#"
                }
            },
            async authorize(credentials) {
                // This is where you need to retrieve user data 
                // to verify with credentials
                // Docs: https://next-auth.js.org/configuration/providers/credentials
                // const user = { id: "42", name: "Dave", password: "nextauth" }
                console.log("nextauth")
                console.log(credentials)
                const user = await prisma.user.findFirst({
                    where: { email: credentials?.email },
                  });
                  if(user){
                  const passMatched = user?.password==="none"?true:await compare(credentials?.password as string, user?.password as string);
                if (credentials?.email === user?.email && passMatched) {
                    const token = jwt.sign({ id: user.id }, key);

                    cookies().set('authToken', token, {
                        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
                        path: '/',
                        httpOnly: true, // for added security, making the cookie inaccessible via JavaScript
                      });
                    return user
                } else {
                    return null
                }
            }else{

      const encryptedPass = await hash(credentials?.password as string, 10);

                const user = await prisma.user.create({
                    data: {
                      email: credentials?.email as string,
                      password: credentials?.password?encryptedPass:"none",
                    },
                  });
                  console.log("nextauth")
                  console.log(user)
                  const token = jwt.sign({ id: user.id }, key);

                    cookies().set('authToken', token, {
                        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
                        path: '/',
                        httpOnly: true, // for added security, making the cookie inaccessible via JavaScript
                      });
                  return user
            }
            }
        })
    ],
}