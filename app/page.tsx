"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

import useSWR from "swr"

interface Habit {
  id: number
  name: string
  fromTime: string
  toTime: string
  completed: boolean
}

const fetcher = (url: string) => fetch(url, {headers: { "Authorization": `Bearer ${document.cookie.split("; ").find((row) => row.startsWith("authToken="))?.split("=")[1]}` }}).then((res) => res.json());

export default function Habits() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const { toast } = useToast()

  const { data: habitsFetched, isValidating, mutate } = useSWR<{ data: Habit[]}>(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/habits/transaction?habitDate=${format(selectedDate?? new Date(), "yyyy-MM-dd")}`,
    fetcher,
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  useEffect(() => {
    if (habitsFetched?.data) {
      setHabits(habitsFetched.data);
    }
  }, [habitsFetched]);

  useEffect(() => {
    if (selectedDate) {
      mutate();
    }
  }, [selectedDate, mutate]);

  const toggleHabit = (id: number) => {
    const habit = habits.find((h) => h.id === id);
    const url = habit?.completed 
      ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/habits/transaction/undo`
      : `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/habits/transaction/done`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${document.cookie.split("; ").find((row) => row.startsWith("authToken="))?.split("=")[1]}`,
      },
      body: JSON.stringify({ transactionId: id }),
    }).then((res) => {
      if (res.ok) {
        setHabits(
          habits.map((h) =>
            h.id === id ? { ...h, completed: !h.completed } : h
          )
        );
        toast({
          title: "Success",
          description: "Habit updated successfully",
          variant: "default",
        });
      } else {
        res.json().then((json) => alert(json.message));
      }
    });
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(e.target.value))
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">Habits</CardTitle>
        <Input type="date" value={format(selectedDate?? new Date(), "yyyy-MM-dd")} onChange={handleDateChange} className="w-auto" />
      </CardHeader>
      <CardContent>
        {habits.length === 0 ? (
          <div className="text-center text-gray-500">No habits available</div>
        ) : (
          <ul className="space-y-2">
            {habits.map((habit) => (
              <li key={habit.id}>
                <Button
                  variant="outline"
                  className={`w-full h-auto justify-between px-2 text-left ${habit.completed ? "bg-green-100" : ""}`}
                  onClick={() => toggleHabit(habit.id)}
                >
                  <div>
                    <span className="font-medium text-base">{habit.name}</span>
                    <span className="text-sm text-gray-500 block">
                      {habit.fromTime} - {habit.toTime}
                    </span>
                  </div>
                  {habit.completed ? (
                    <CheckCircle2 className="h-16 w-16 text-green-500" />
                  ) : (
                    <Circle className="h-16 w-16 text-gray-300" />
                  )}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

