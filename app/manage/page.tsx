"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Trash2, Plus, LoaderCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import useSWR, { mutate } from "swr"
import {useRouter} from "next/navigation"
import { useAuth } from "../contexts/AuthContext"



interface Habit {
  id: number
  name: string
  fromTime: string
  toTime: string
}

const fetcher = (url: string, token: string) => fetch(url, {headers: { "Authorization": `Bearer ${document.cookie.split("; ").find((row) => row.startsWith("authToken="))?.split("=")[1]}` }})
.then((res) => {
  if (!res.ok) throw res; // Ensure errors can be caught in `onError`
  return res.json();
})

export default function ManageHabits() {
    const { logout } = useAuth()
  
  const router = useRouter()
  const [isDialogAddOpen, setIsDialogAddOpen] = useState(false)
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false)
  const [habits, setHabits] = useState<Habit[]>([])
  const [newHabit, setNewHabit] = useState({ name: "", fromTime: "", toTime: "" })
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null)
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast()



  const { data: habitsFetched, isValidating, mutate } = useSWR<{ data: Habit[]}>(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/habits`,
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
    }
  );
  
  useEffect(() => {
    if (habitsFetched?.data) {
      setHabits(
        habitsFetched.data.sort((a, b) =>
          a.fromTime.localeCompare(b.fromTime)
        )
      );
    }
  }, [habitsFetched]);
  

  useEffect(() => {
    setIsLoading(isValidating);
  }, [isValidating]);

  const refetchHabit = async () => {
    setIsLoading(true);
    try {
      await mutate();
    } finally {
      setIsLoading(false);
    }
  };
  const addHabit = () => {
    if (newHabit.name.trim() && newHabit.fromTime && newHabit.toTime) {
      setIsLoading(true);
      fetch(process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/api/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${document.cookie.split("; ").find((row) => row.startsWith("authToken="))?.split("=")[1]}`,
        },
        body: JSON.stringify({
          habitName: newHabit.name,
          fromTime: newHabit.fromTime,
          toTime: newHabit.toTime,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            response.json().then((error) => {
              toast({
                title: "Failed",
                description: error.messages,
                variant: "destructive"
              })
            })
          } else if(response.status === 401) {
            toast({
              title: "Unauthorized",
              description: "You are not logged in",
              variant: "destructive",
            })
            logout()
            router.push("/login")
          } else {
            toast({
              title: "Success",
              description: "Habit added successfully",
            })
            return response.json()
          }
        })
        .finally(() => {
          setIsLoading(false);
        })
        .then(() => {
          refetchHabit();
          setNewHabit({ name: "", fromTime: "", toTime: "" })
          setIsDialogAddOpen(false);
        })
    }
  }

  const deleteHabit = (id: number) => {
    setIsLoading(true);
    fetch(process.env.NEXT_PUBLIC_BACKEND_BASE_URL +`/api/habits/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${document.cookie.split("; ").find((row) => row.startsWith("authToken="))?.split("=")[1]}`,
      },
    })
      .then((response) => {
        if(response.ok){
          response.json()
          toast({
            title: "Success",
            description: "Habit deleted successfully",})
        } else if(response.status === 401) {
          toast({
            title: "Unauthorized",
            description: "You are not logged in",
            variant: "destructive",
          })
          logout()
          router.push("/login")
        } else {
          response.json().then((error) => {
            toast({
              title: "Failed",
              description: error.messages,
              variant: "destructive"
            })
          })
        }
      })
      .finally(() => {
        setIsLoading(false);
      })
      .then(() => {
        refetchHabit()
      })
  }

  const saveEdit = (id: number, name: string, fromTime: string, toTime: string) => {
    if (editingHabit) {
      setIsLoading(true)
      fetch(process.env.NEXT_PUBLIC_BACKEND_BASE_URL +`/api/habits/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${document.cookie.split("; ").find((row) => row.startsWith("authToken="))?.split("=")[1]}`,
        },
        body: JSON.stringify(
          {
            "habitName": name,
            "fromTime": fromTime,
            "toTime": toTime
          }
        ),
      })
        .then((response) => { if(response.ok) response.json()
          else if(response.status === 401) {
            toast({
              title: "Unauthorized",
              description: "You are not logged in",
              variant: "destructive",
            })
            logout()
            router.push("/login")
          }
        }
      )
      .finally(() => {
        setIsLoading(false);
      })
        .then(() => {
          refetchHabit()
          setEditingHabit(null)
          setIsDialogEditOpen(false)
        })
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <div className="sticky -top-5 bg-white z-10 rounded-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Manage Habits</CardTitle>
        <Dialog open={isDialogAddOpen} onOpenChange={setIsDialogAddOpen}>
          <DialogTrigger asChild>
            <Button size="icon" onClick={() => setIsDialogAddOpen(true)}>
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Habit</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                placeholder="Habit name"
                value={newHabit.name}
                onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
              />
              <div className="flex space-x-2">
                <Input
                  type="time"
                  value={newHabit.fromTime}
                  onChange={(e) => setNewHabit({ ...newHabit, fromTime: e.target.value })}
                />
                <Input
                  type="time"
                  value={newHabit.toTime}
                  onChange={(e) => setNewHabit({ ...newHabit, toTime: e.target.value })}
                />
              </div>
              <Button
                onClick={() => addHabit()}
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <LoaderCircle className="animate-spin h-5 w-5 mx-auto text-white" />
                ) : (
                  "Add Habit"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      </div>
      <CardContent>
        {/* {isLoading ? (
                      <LoaderCircle className="animate-spin h-4 w-4 mx-auto text-black" />
                    ) : 
        habits.length === 0 ? (
          <p className="text-center text-gray-500">No habits found</p>
        ) : ( */}
          <ul className="space-y-2">
            {habits.map((habit) => (
              <li key={habit.id} className="flex items-center justify-between bg-white p-2 rounded-md shadow">
                <div>
                  <span className="font-medium">{habit.name}</span>
                  <span className="text-sm text-gray-500 block">
                    {habit.fromTime} - {habit.toTime}
                  </span>
                </div>
                <div>
                  <Dialog open={isDialogEditOpen} onOpenChange={setIsDialogEditOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => {
                        setEditingHabit(habit);
                        setIsDialogEditOpen(true);
                      }}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Habit</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <Input
                          defaultValue={ habit.name}
                          value={editingHabit?.name}
                          onChange={(e) => setEditingHabit({ ...editingHabit!, name: e.target.value })}
                        />
                        <div className="flex space-x-2">
                          <Input
                            type="time"
                            defaultValue={habit.fromTime}
                            value={editingHabit?.fromTime}
                            onChange={(e) =>  setEditingHabit({ ...editingHabit!, fromTime: e.target.value })}
                          />
                          <Input
                            type="time"
                            defaultValue={habit.toTime}
                            value={editingHabit?.toTime}
                            onChange={(e) => setEditingHabit({ ...editingHabit!, toTime: e.target.value })}
                          />
                        </div>
                        <Button onClick={() => saveEdit(editingHabit!.id, editingHabit!.name ?? habit.name, editingHabit!.fromTime ?? habit.fromTime, editingHabit!.toTime ?? habit.toTime)} className="w-full" disabled={isLoading}>
                          {isLoading ? (
                            <LoaderCircle className="animate-spin h-5 w-5 mx-auto text-white" />
                          ) : (
                            "Save Changes"
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="icon" onClick={() => deleteHabit(habit.id)} disabled={isLoading}>
                      <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        {/* )} */}
      </CardContent>
    </Card>
  )
}


