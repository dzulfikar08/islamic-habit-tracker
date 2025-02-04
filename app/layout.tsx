import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import { AuthProvider } from "./contexts/AuthContext"
import { Toaster } from "@/components/ui/toaster"
import LayoutContent from "@/components/layout-content"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Mutabaah Yaumiyah 🌙",
  description: "Track your daily habits and view your progress",
  icons: {
    icon: '/favicon.png', 
    apple: '/apple-touch-icon.png',
    other: '/android-chrome-192x192.png',

  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider> 
      <html lang="en">
        <body className={inter.className}>
          <LayoutContent>{children}</LayoutContent>
          <Toaster />
        </body>
      </html>
    </AuthProvider>
  )
}

