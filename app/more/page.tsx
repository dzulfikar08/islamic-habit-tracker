"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coffee, FileQuestion, LogOut, MessageCircleQuestion, Moon, MoonStar, PersonStanding, Sun, User, UserRound, UsersRound } from "lucide-react"
import {useRouter} from "next/navigation"

export default function Amal() {
  
  const router = useRouter()

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
          <li className="cursor-pointer " onClick={() => router.push("/")}>
          <Button
                  variant="outline"
                  className={`w-full h-auto justify-start px-4 py-4 text-md text-left `}>
                    <Moon/> <Sun/>
                    Change Theme</Button>
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
