"use client"
import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { LogIn, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const SignInButton = () => {
    const {data: session} = useSession()
    const router = useRouter()
    if (session && session.user) {
        return (
                <Button variant="default" size="sm" onClick={()=> {signOut({callbackUrl: "/login"})}}>
                    <LogOut/>
                    </Button>
        )
    }


  return (
    <Button variant="default" size="sm" onClick={()=> router.push("/login")}>
                    <LogIn/> Sign In
                    </Button>
  )
}
