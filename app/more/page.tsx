"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coffee,  LogOut, MessageCircleQuestion, Moon,  Sun, UserRound, UsersRound } from "lucide-react"
import { useSession } from "next-auth/react"
import {useRouter} from "next/navigation"
import Image from "next/image";
import { useThemeContext } from "@/app/hooks/useThemeContext"

export default function Amal() {

      const {
        theme,
        toggleTheme
      } = useThemeContext();
  
  const router = useRouter()
  const {data: session} = useSession()

  

  return (
    <div>
        
    <Card className="w-full mx-auto pb-0">
      <div className="sticky -top-5 z-10 rounded-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">More</CardTitle>
        </CardHeader>
      </div>

      

      <CardContent>
        <ul className="grid grid-cols-1 gap-4">
          <li className="cursor-pointer ">
            <div className="w-full h-auto justify-center px-4 py-4 text-md  flex items-center gap-4 pt-0">
            {session && 
                    <Image
                    src={session.user?.image || ""}
                    alt="User Avatar"
                    unoptimized
                    width={48}
                    height={48}
                    className="rounded-md"
                         />
                    }
          {session && <p className="text-md">{``}<strong>{session.user?.name}</strong></p>}
          
          </div>
          </li>
          <li className="cursor-pointer " onClick={() => router.push("/")}>
          <Button
                  variant="outline"
                  className={`w-full h-auto justify-start px-4 py-4 text-md text-left `}>
                    <UserRound/>
                    Profile</Button>
          </li>
          <li className="cursor-pointer " onClick={() => router.push("/")}>
          <Button
                  variant="outline"
                  className={`w-full h-auto justify-start px-4 py-4 text-md text-left `}>
                    <UsersRound/>
                    Manage Group</Button>
          </li>
          <li className="cursor-pointer " onClick={toggleTheme}>
          <Button
                  variant="outline"
                  className={`w-full h-auto justify-start px-4 py-4 text-md text-left `}>
                    {theme === "light" ? <Moon/> : <Sun/>}
                    {theme === "light" ? "Dark" : "Light"} Mode</Button>
          </li>
          <li className="cursor-pointer " onClick={() => router.push("/")}>
          <Button
                  variant="outline"
                  className={`w-full h-auto justify-start px-4 py-4 text-md text-left `}>
                    <Coffee/>
                    Support Us More</Button>
          </li>
          <li className="cursor-pointer " onClick={() => router.push("/")}>
          <Button
                  variant="outline"
                  className={`w-full h-auto justify-start px-4 py-4 text-md text-left `}>
                    <MessageCircleQuestion/>
                    Any Feedback? Feel free to tell us!</Button>
          </li>
          
        </ul>
      </CardContent>
    </Card>
    <Card className="mt-4">
        <CardContent>
            <div className="grid grid-cols-1 pt-6 pb-0">
                <Button variant="outline"
                    className={`w-full bg-muted-foreground text-muted h-auto  px-4 py-4 text-md text-left `}>
                    <LogOut/>
                        Logout
                </Button>
            </div>
        </CardContent>
    </Card>
    </div>
  )
}
