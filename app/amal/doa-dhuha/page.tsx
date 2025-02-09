"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import {useRouter} from "next/navigation"

export default function DoaDhuha() {
  
  const router = useRouter()

  return (
    <Card className="w-full max-w-md mx-auto">
      <div className="sticky -top-5 bg-white z-10 rounded-lg">
        <CardHeader className="flex flex-row items-center justify-between">
        <Button variant="outline" onClick={() => router.back()}><ArrowLeft className="w-4 h-4" /></Button>
          <CardTitle className="text-2xl font-bold">Doa After Dhuha</CardTitle>
          <div></div>
        </CardHeader>
      </div>
      <CardContent>
        <div className="grid grid-cols-1 text-center gap-4 items-center justify-between">
        Coming Soon


        </div>
      </CardContent>
    </Card>
  )
}
