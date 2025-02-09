import "./globals.css"
import { Inter , Amiri_Quran} from "next/font/google"
import type React from "react"
import { AuthProvider } from "./contexts/AuthContext"
import { Toaster } from "@/components/ui/toaster"
import LayoutContent from "@/components/layout-content"
import { ThemeContextProvider } from "./contexts/ThemeContext"


const inter = Inter({ subsets: ["latin"] })

const amiri = Amiri_Quran({
  subsets: ['arabic'],
  weight: '400',
})


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
      <ThemeContextProvider>
      <html lang="en" className={`${inter.className}`}> 
        <body>
          <LayoutContent>{children}</LayoutContent>
          <Toaster />
        </body>
      </html>
      </ThemeContextProvider>
    </AuthProvider>
  )
}

