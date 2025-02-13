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
  const [selectedMatsurat, setSelectedMatsurat] = useState('Sugro Pagi');

  const dzikirData: DzikirItemType[] = selectedData.data; // Tipe data untuk dzikir
  const [showNumber, setShowNumber] = useState(() =>
    Array(dzikirData.length).fill(false)
  );

  const router = useRouter()
  const pathname = usePathname()
  const matsuratList = [
    { title: 'Sugro Pagi', data: sugroPagi },
    { title: 'Sugro Petang', data: sugroPetang },
    { title: 'Kubro Pagi', data: kubroPagi },
    { title: 'Kubro Petang', data: kubroPetang }
  ];

  return (
    <Card className="w-full mx-auto">
      <div className="sticky -top-5 z-10 bg-muted rounded-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => router.back()}><ArrowLeft className="w-4 h-4"/></Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="text-md font-bold flex items-center justify-center">{selectedMatsurat} <ChevronDown/></Button>
              </PopoverTrigger>
              <PopoverContent>
                <Command>
                  <CommandGroup>
                    {matsuratList.map((item) => (
                      <CommandItem key={item.title} onSelect={() => { setSelectedData(item.data); setSelectedMatsurat(item.title); }}>{item.title}</CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <Button variant="outline" onClick={() => router.push(pathname + "/setting")}><Settings /></Button>
          </div>
        </CardHeader>
      </div>
      <CardContent className="p-0 border-0 border-opacity-0 bg-primary-foreground">
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

