"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "../contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"


export default function LoginPage() {
  const { toast } = useToast()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const { login } = useAuth()
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
      
      if (response.ok) {
        toast({
          title: "Login Successful",
          description: "You have successfully logged in",
          variant: "default"
        })
        const data = await response.json()
        localStorage.setItem("username", data.data.NAME)
        login(data.data.token)
        router.push("/")
        console.log("routing to /manage")
      } else {
        const error = await response.json()
        toast({
          title: "Login Failed",
          description: error.messages,
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error while trying to login",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="h-full flex items-center justify-center px-4">
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login to Mutabaah Yaumiyah 🌙</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

