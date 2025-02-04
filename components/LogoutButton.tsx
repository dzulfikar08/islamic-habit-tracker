"use client"

import { useAuth } from "../app/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const { isLoggedIn, logout } = useAuth()
  const router = useRouter()

  if (!isLoggedIn) return null

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white">
      <LogOut size={18} className="mr-2" />
    </Button>
  )
}

