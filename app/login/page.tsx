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
import { Label } from "@/components/ui/label"


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
      <Card className="w-full mx-5">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Welcome to Mutabaah 🌙</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 grid items-center justify-center">
        <Button variant="default" onClick={() => handleSignIn()}> 
        <SiGoogle size={20}/>
        Google
          </Button>
                    <Label className="p-4">Join us simply with one click</Label>
         


        </CardContent>
      </Card>
    </div>
  )
}

