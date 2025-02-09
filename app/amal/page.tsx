"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {useRouter} from "next/navigation"

export default function Amal() {
  
  const router = useRouter()

  return (
    <Card className="w-full mx-auto">
      <div className="sticky -top-5 bg-white z-10 rounded-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Amal</CardTitle>
        </CardHeader>
      </div>
      <CardContent>
        <ul className="grid grid-cols-1 gap-4">
          <li className="cursor-pointer" onClick={() => router.push("/amal/matsurat")}>
          <Button
                  variant="outline"
                  className={`w-full h-auto justify-between px-4 py-4 text-md text-left `}>
                    Al Matsurat</Button>
          </li>
          <li className="cursor-pointer" onClick={() => router.push("/amal/quran")}>
          <Button
                  variant="outline"
                  className={`w-full h-auto justify-between px-4 py-4 text-md text-left `}>
                    Al Quran</Button>
          </li>
          <li className="cursor-pointer" onClick={() => router.push("/amal/dzikr")}>
          <Button
                  variant="outline"
                  className={`w-full h-auto justify-between px-4 py-4 text-md text-left `}>
                    Dzikr</Button>
          </li>
          <li className="cursor-pointer" onClick={() => router.push("/amal/doa-dhuha")}>
          <Button
                  variant="outline"
                  className={`w-full h-auto justify-between px-4 py-4 text-md text-left `}>
                    Doa After Dhuha</Button>
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}
