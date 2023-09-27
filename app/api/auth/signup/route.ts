import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import jwt from "jsonwebtoken"
import {hash} from "bcrypt"

const key  = process.env.NEXT_PUBLIC_JWT_KEY || ''
export async function POST(req:Request){
    try{
    const {name,email,password}=await req.json()
    const oldUser = await prisma.user.findFirst({
        where : {email:email}
    })
    if(oldUser){
        return NextResponse.json("already exists")
    }else{
        const encryptedPass = await hash(password,10)
    const createUser = await prisma.user.create({
        data:{
        name:name,
        email:email,
        password:encryptedPass
        }
})
    if (createUser) {
        const token = jwt.sign({id:createUser.id},key)
        createUser.password="****************"
        return NextResponse.json({createUser, token})
    }else{
        NextResponse.error()
    }
}
} catch (error) {
    console.log(error)
}
}
