"use client"
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Loading from '../components/Loading'
import store from '@/lib/zustand'

export default function page() {
    const router = useRouter()
    const { data: session } = useSession()
    const {setUser} = store()
    const userOld = async() => {
        const resp = await fetch("/api/auth/check", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({email:session?.user?.email})
        });
        const resJson = await resp.json();
        setUser(resJson.user)
        if(resJson.expired){
            signOut()
        }
        if(resJson.old){
            router.push("/home")
        }else{
            router.push("/auth/signup")
        }
        // setUser(resJson.user)
    }
    useEffect(() => {
        if(session?.user?.email)
      userOld()
    }, [session?.user])
    
  return (
    <Loading/>
  )
}
