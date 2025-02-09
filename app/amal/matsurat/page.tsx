"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usePathname, useRouter } from "next/navigation"
import sugroPagi from "@/app/amal/matsurat/data/sugro-pagi.json"
import sugroPetang from "@/app/amal/matsurat/data/sugro-petang.json"
import kubroPagi from "@/app/amal/matsurat/data/kubro-pagi.json"
import kubroPetang from "@/app/amal/matsurat/data/kubro-petang.json"
import { useState } from "react";
import DzikrItem from "@/components/dzikrItem";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronDown, Settings } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
    Command,
    CommandGroup,
    CommandItem,
  } from "@/components/ui/command"

export interface SubItem {
  title: string;
  arabic: string;
  latin?: string;
  translation?: string;
}
export interface DzikirItemType {
  title: string;
  arabic: string;
  latin?: string;
  translation?: string;
  repeat: number;
  data?: SubItem[];
}
export default function Matsurat() {
  const [selectedData, setSelectedData] = useState(sugroPagi);
  const dzikirData: DzikirItemType[] = selectedData.data; // Tipe data untuk dzikir
  const [showNumber, setShowNumber] = useState(() =>
    Array(dzikirData.length).fill(false)
  );

  const router = useRouter()
  const pathname = usePathname()

  return (
    <Card className="w-full max-w-md mx-auto">
      <div className="sticky -top-5 bg-white z-10 rounded-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => router.back()}><ArrowLeft className="w-4 h-4" /></Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="text-xl font-bold flex items-center justify-center">{selectedData.title} <ChevronDown /></Button>
              </PopoverTrigger>
              <PopoverContent>
                <Command>
                  <CommandGroup>
                    <CommandItem onSelect={() => setSelectedData(sugroPagi)}>Sugro Pagi</CommandItem>
                    <CommandItem onSelect={() => setSelectedData(sugroPetang)}>Sugro Petang</CommandItem>
                    <CommandItem onSelect={() => setSelectedData(kubroPagi)}>Kubro Pagi</CommandItem>
                    <CommandItem onSelect={() => setSelectedData(kubroPetang)}>Kubro Petang</CommandItem>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <Button variant="outline" onClick={() => router.push(pathname + "/setting")}><Settings /></Button>
          </div>
        </CardHeader>
      </div>
      <CardContent>
        {dzikirData.map((item, index) => (
          <DzikrItem
            key={index}
            item={item}
            index={index}
            showNumber={showNumber}
          />
        ))}
      </CardContent>
    </Card>
  )
}

