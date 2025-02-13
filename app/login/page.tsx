"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "../contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"
import { getSession, signIn, useSession } from "next-auth/react"
// import { signIn } from "@/auth"
import { SiGoogle } from '@icons-pack/react-simple-icons';


export default function LoginPage() {
  const { toast } = useToast()


  const handleSignIn = async () => {
    try {

        await signIn("google", { callbackUrl: "/api/auth/signin/callback" })
        
        
    } catch (error: any) {
        toast({
            title: "Error",
            description: `Error while trying to login, ${String(error.message)}`,
            variant: "destructive",
        })
    }
}

 

  return (
    <div className="h-full flex items-center justify-center px-4">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Sign In to Mutabaah Yaumiyah 🌙</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-center items-center justify-center">
         
          <Button variant="default" onClick={() => handleSignIn()}>Sign In With Google
            <SiGoogle size={20}/>
          </Button>

        </CardContent>
      </Card>
    </div>
  )
}

