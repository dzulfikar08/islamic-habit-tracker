"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ChevronLeft, ChevronRight, LoaderIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import localFont from "next/font/local"

const uthmani = localFont({
  src: "../../../public/fonts/uthmani.otf",
  display: "swap",
  
})

export default function Quran() {
  const [page, setPage] = useState<number>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("page") ?? "1")
    }
    return 1
  })
  const [verses, setVerses] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] =useState(true)
  const router = useRouter()

  const fetchVerses = async (page: number) => {
    try {
      setIsLoading(true)
      const response = await import(`./quran_pages/${page}.json`)
      let quran = response.quran["quran-uthmani-hafs"]

      setVerses(quran)
      // console.log(JSON.stringify(response))
    } catch (error) {
      console.error("Failed to fetch verses", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchVerses(page)
  }, [page])

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > 604) return
    localStorage.setItem("page", JSON.stringify(newPage))
    setPage(newPage)
  }

  return (
    <Card className="w-full mx-auto">
      <div className="sticky -top-5 bg-white z-10 rounded-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <Button variant="outline" onClick={() => router.back()}><ArrowLeft className="w-4 h-4" /></Button>
          <CardTitle className="text-2xl font-bold">Al Quran</CardTitle>
          <div className="flex flex-row items-center">
            <Button onClick={() => handlePageChange(page - 1)} disabled={page === 1}><ChevronLeft className="w-4 h-4" /></Button>
            <input
              type="number"
              min="1"
              max="604"
              value={page}
              onChange={(e) => handlePageChange(Number(e.target.value))}
              className="border p-2 mx-2"
            />
            <Button onClick={() => handlePageChange(page + 1)} disabled={page === 604}><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </CardHeader>
      </div>
      <CardContent>
  {isLoading ? (
    <div className="h-96 flex items-center justify-center">
      <LoaderIcon className="animate-spin h-10 w-10" />
    </div>
  ) : (
    <div className="h-[30rem] flex flex-col justify-center items-center">
      <p className={`text-[1.4rem] leading-[2.2rem] text-justify rtl ${uthmani.className}`}>
        {Object.entries(verses).map(([key, verse]) => (
          <span key={key} className="inline">
            {verse.verse} <span className="ayah-number">{Number(verse.ayah).toLocaleString('ar-EG')}</span> 
          </span>
        ))}
      </p>
    </div>
  )}
</CardContent>


    </Card>
  )
}

