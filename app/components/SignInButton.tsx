"use client"
import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { LogIn, LogOut } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '../contexts/AuthContext'

export const SignInButton = () => {
    const {data: session} = useSession()
    const {logout} = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    if (session && session.user) {
        return (
                <Button variant="default" size="sm" onClick={()=> {signOut({callbackUrl: "/login"}), logout()}}>
                    <LogOut/>
                    </Button>
        )
    }


  return (
    pathname !== '/login' && (
        <Button variant="default" size="sm" onClick={()=> router.push("/login")}>
                    <LogIn/> Sign In
                    </Button>
    )
  )
}
