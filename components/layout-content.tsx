"use client"
import Link from "next/link"
import type React from "react"
import { Home, Settings, BarChart, HomeIcon, Settings2, BarChart2, BookOpenText } from "lucide-react"
import { useAuth } from "@/app/contexts/AuthContext"
import LogoutButton from "./LogoutButton"
import { usePathname, useRouter } from "next/navigation"
import { SignInButton } from "@/app/components/SignInButton"
import { useSession } from "next-auth/react"
import Image from "next/image";


export default function LayoutContent({ children }: { children: React.ReactNode }) {
    const { isLoggedIn } = useAuth()
    const pathname = usePathname()
    const selected = (href: string) => pathname === href
    const {data: session} = useSession()
    

    return (
        <div className="flex flex-col h-screen">
            <header className="bg-gray-900 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/">
                    <Image src="/android-chrome-192x192.png" alt="logo" width={32} height={32}/>
                    </Link>
                    {/* <h1 className="text-xl font-bold">Mutabaah Yaumiyah</h1> */}
                    {/* {isLoggedIn && <p className="text-sm">{`Hi `}<strong>{localStorage.getItem('username')}</strong>!</p>} */}
                    <div className="flex items-center justify-between gap-2">
                    {session && <p className="text-sm">{`Hi `}<strong>{session.user?.name}</strong>!</p>}
                    {session && 
                    <Image
                    src={session.user?.image || ""}
                    alt="User Avatar"
                    unoptimized
                    width={30}
                    height={30}
                    className="rounded-full"
                         />
                    }
                    </div>
                    
                    <SignInButton/>
                    {/* {isLoggedIn && <SignInButton/>} */}
                    {/* <LogoutButton /> */}
                </div>
            </header>
            <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">{children}</main>
            {isLoggedIn && (
                <nav className="bg-gray-900 text-white p-4">
                    <div className="container mx-auto flex justify-around items-center">
                        <Link href="/" className="flex flex-col items-center">
                            <Home size={24} className={selected("/") ? "text-white" : "text-gray-500"} />
                            <span className="text-xs mt-1" style={{ color: selected("/") ? "white" : "gray" }}>Habits</span>
                        </Link>
                        <Link href="/manage" className="flex flex-col items-center">
                            <Settings size={24} className={selected("/manage") ? "text-white" : "text-gray-500"} />
                            <span className="text-xs mt-1" style={{ color: selected("/manage") ? "white" : "gray" }}>Manage</span>
                        </Link>
                        <Link href="/history" className="flex flex-col items-center">
                            <BarChart size={24} className={selected("/history") ? "text-white" : "text-gray-500"} />
                            <span className="text-xs mt-1" style={{ color: selected("/history") ? "white" : "gray" }}>History</span>
                        </Link>
                        <Link href="/amal" className="flex flex-col items-center">
                            <BookOpenText size={24} className={selected("/amal") ? "text-white" : "text-gray-500"} />
                            <span className="text-xs mt-1" style={{ color: selected("/amal") ? "white" : "gray" }}>Amal</span>
                        </Link>
                    </div>
                </nav>
            )}
        </div>
    )
}

