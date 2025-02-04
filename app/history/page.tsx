"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Mock data for the chart
const data = [
  { date: "05/01", completion: 80 },
  { date: "05/02", completion: 65 },
  { date: "05/03", completion: 90 },
  { date: "05/04", completion: 75 },
  { date: "05/05", completion: 85 },
  { date: "05/06", completion: 70 },
  { date: "05/07", completion: 95 },
]

export default function History() {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const averageCompletion = data.reduce((sum, day) => sum + day.completion, 0) / data.length

  return (
    <div className="space-y-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Habit History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 mb-4">
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start Date"
            />
            <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="End Date" />
            <Button className="w-full">Filter</Button>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completion" fill="#00A86B" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      {/* <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">Average Completion Rate: {averageCompletion.toFixed(2)}%</p>
        </CardContent>
      </Card> */}
    </div>
  )
}

