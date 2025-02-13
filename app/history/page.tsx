"use client";

import useSWR from "swr";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { toast } from "@/components/ui/use-toast";
import {useRouter} from 'next/navigation'
import { useAuth } from "../contexts/AuthContext";
import { LoaderIcon } from "lucide-react";

// Fetcher function for SWR
const fetcher = (url: string, token: string) => fetch(url, {headers: { "Authorization": `Bearer ${document.cookie.split("; ").find((row) => row.startsWith("authToken="))?.split("=")[1]}` }})
.then((res) => {
  if (!res.ok) throw res; // Ensure errors can be caught in `onError`
  return res.json();
})
export default function History() {
      const { logout } = useAuth()
  
  const [startDate, setStartDate] = useState(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const router = useRouter()
  

  // Fetch data with SWR
  const { data, error, isLoading, mutate } = useSWR(`/api/habits/history?fromDate=${startDate}&toDate=${endDate}`, 
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,

      onError: (error) => {
        if (error?.status === 401) {
          toast({
            title: "Unauthorized",
            description: "You are not logged in",
            variant: "destructive",
          })
          logout()
          router.push("/login")
        }
      }
    }) as { data: { data: { completion: number; date: string }[] }; error: any; isLoading: boolean; mutate: () => void };

  // Handle loading & error states
  if (error) return <p className="text-center text-red-500">Failed to load data</p>;

  // Calculate average completion rate
  const averageCompletion = Array.isArray(data?.data)
    ? data.data.reduce((sum: number, day: { completion: number }) => sum + day.completion, 0) /
      (data.data.length || 1)
    : 0;

  const handleFilter = ()=>{
    mutate();
  }
  

  return (
    <div className="space-y-4">
      <Card className="w-full mx-auto">
      <div className="sticky -top-5 bg-white z-10 rounded-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">History</CardTitle>
        </CardHeader>
      </div>
        <CardContent>
          <div className="gap-4 mb-4 grid grid-cols-2 justify-items-center">
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start Date"
            />
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End Date"
            />
          </div>
          <div className="mt-8 h-64 w-full">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <LoaderIcon className="animate-spin h-5 w-5 text-blue-500" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completion" fill="#00A86B" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Average Completion Rate */}
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">
            Average Completion Rate: {averageCompletion.toFixed(2)}%
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
