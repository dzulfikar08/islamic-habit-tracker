"use client"
import { Fragment } from "react";
import { ArrowLeft, Check, ChevronDown, Cog, Settings, StepBackIcon } from "lucide-react";
import { useThemeContext } from "@/app/hooks/useThemeContext";
import { fontSizes } from "@/app/types/types";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {usePathname, useRouter} from "next/navigation"
import localFont from "next/font/local"

const uthmani = localFont({
  src: "../../../../public/fonts/uthmani.otf",
  display: "swap",
})



export const Setting = () => {
  const {
    fontSize,
    changeFontSize,
    latinVisible,
    toggleLatin,
    translationVisible,
    toggleTranslation,
  } = useThemeContext();

  const selectedFontSize =
    fontSizes.find((size) => size.value === fontSize) || fontSizes[1];

    const router = useRouter()

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
      <div className="flex items-center justify-between">

      <h2 className="text-lg font-bold flex items-center gap-2">
          <Settings className="w-6 h-6" /> Setting
        </h2>
        <Button variant="outline" onClick={() => router.back()}><ArrowLeft className="w-4 h-4" /></Button>

        </div>

      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
          <p className="font-bold">Preview Perubahan:</p>
          <p className={`text-right ${uthmani.className} ${selectedFontSize.size} mb-4`}>
            بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ
          </p>
          {latinVisible && <p className="italic">Bismi llāhi ar-raḥmāni ar-raḥīm</p>}
          {translationVisible && <p>Dengan nama Allah Yang Maha Pengasih, Maha Penyayang</p>}
        </div>
        
        <div className="space-y-4 border rounded-lg p-4 bg-white dark:bg-gray-700">
          <div className="flex justify-between items-center">
            <span>Tampilkan Arti</span>
            <Switch checked={translationVisible} onCheckedChange={toggleTranslation} />
          </div>
          <div className="flex justify-between items-center">
            <span>Tampilkan Latin</span>
            <Switch checked={latinVisible} onCheckedChange={toggleLatin} />
          </div>
          <div className="flex justify-between items-center">
            <span>Font Size</span>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-36 flex justify-between">
                  {selectedFontSize.name}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-36">
                <Command>
                  <CommandGroup>
                    {fontSizes.map((size) => (
                      <CommandItem
                        key={size.value}
                        onSelect={() => changeFontSize(size.value)}
                        className="flex items-center gap-2"
                      >
                        {size.name}
                        {size.value === fontSize && <Check className="w-4 h-4" />}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};