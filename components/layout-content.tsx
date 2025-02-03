
"use client"
import Link from "next/link"
import type React from "react"
import { Home, Settings, BarChart } from "lucide-react"
import { useAuth } from "@/app/contexts/AuthContext"
import LogoutButton from "./LogoutButton"
export default function LayoutContent({ children }: { children: React.ReactNode }) {
    const { isLoggedIn } = useAuth() 
  
    return (
      <div className="flex flex-col h-screen">
        <header className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Habit Tracker</h1>
            {isLoggedIn && <LogoutButton />}
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
        {isLoggedIn && (
          <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-around items-center">
              <Link href="/" className="flex flex-col items-center">
                <Home size={24} />
                <span className="text-xs mt-1">Habits</span>
              </Link>
              <Link href="/manage" className="flex flex-col items-center">
                <Settings size={24} />
                <span className="text-xs mt-1">Manage</span>
              </Link>
              <Link href="/history" className="flex flex-col items-center">
                <BarChart size={24} />
                <span className="text-xs mt-1">History</span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    )
  }
  