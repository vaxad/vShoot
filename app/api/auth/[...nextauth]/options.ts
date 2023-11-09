import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from '@/prisma/client';
import { compare, hash } from 'bcrypt';

export const options: NextAuthOptions = {
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
                const user = await prisma.user.findFirst({
                    where: { email: credentials?.email },
                  });
                  if(user){
                  const passMatched = user?.password==="none"?true:await compare(credentials?.password as string, user?.password as string);
                if (credentials?.email === user?.email && passMatched) {
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
            
                  return user
            }
            }
        })
    ],
}