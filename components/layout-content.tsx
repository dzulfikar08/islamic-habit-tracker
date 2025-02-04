"use client"
import Link from "next/link"
import type React from "react"
import { Home, Settings, BarChart, HomeIcon, Settings2, BarChart2 } from "lucide-react"
import { useAuth } from "@/app/contexts/AuthContext"
import LogoutButton from "./LogoutButton"
import { usePathname, useRouter } from "next/navigation"

export default function LayoutContent({ children }: { children: React.ReactNode }) {
    const { isLoggedIn } = useAuth()
    const pathname = usePathname()
    const selected = (href: string) => pathname === href

    return (
        <div className="flex flex-col h-screen">
            <header className="bg-gray-800 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/">
                    <img src="/android-chrome-192x192.png" alt="logo" className="w-8 h-8" />
                    </Link>
                    {/* <h1 className="text-xl font-bold">Mutabaah Yaumiyah</h1> */}
                    {isLoggedIn && <p className="text-sm">{`Hi ${localStorage.getItem('username')}`}</p>}
                    {isLoggedIn && <LogoutButton />}

                </div>
            </header>
            <main className="flex-1 overflow-y-auto p-4">{children}</main>
            {isLoggedIn && (
                <nav className="bg-gray-800 text-white p-4">
                    <div className="container mx-auto flex justify-around items-center">
                        <Link href="/" className="flex flex-col items-center">
                            <Home size={24} className={selected("/") ? "text-blue-500" : "text-white"} />
                            <span className="text-xs mt-1">Habits</span>
                        </Link>
                        <Link href="/manage" className="flex flex-col items-center">
                            <Settings size={24} className={selected("/manage") ? "text-blue-500" : "text-white"} />
                            <span className="text-xs mt-1">Manage</span>
                        </Link>
                        <Link href="/history" className="flex flex-col items-center">
                            <BarChart size={24} className={selected("/history") ? "text-blue-500" : "text-white"} />
                            <span className="text-xs mt-1">History</span>
                        </Link>
                    </div>
                </nav>
            )}
        </div>
    )
}

