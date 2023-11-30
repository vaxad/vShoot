"use client"
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Loading from '../components/Loading'
import store from '@/lib/zustand'

export default function Page() {
    
    const router = useRouter()
    const { data: session } = useSession()
    const {setUser} = store()

    useEffect(() => {
        const userOld = async() => {
            const resp = await fetch("/api/auth/check", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({email:session?.user?.email})
            });
            const resJson = await resp.json();
            console.log(resJson)
            if(resJson.error){
                router.push("http://localhost:3000/api/auth/signin?callbackUrl=/auth")
            }
            if(resJson.expired){
                router.push("http://localhost:3000/api/auth/signin?callbackUrl=/auth")
            }else{
                setUser(resJson.user)
            }
            if(resJson.old){
                router.push("/home")
            }else{
                router.push("/auth/signup")
            }
            // setUser(resJson.user)
        }
      userOld()
    }, [session?.user])
    
  return (
    <Loading/>
  )
}
