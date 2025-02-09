"use client";
import { createContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextProps {
  fontSize: string;
  changeFontSize: (size: string) => void;
  latinVisible: boolean;
  toggleLatin: () => void;
  translationVisible: boolean;
  toggleTranslation: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

export const ThemeContextProvider: React.FC<ThemeProviderProps> = ({
  children,
}) => {
  // Ensure localStorage is only accessed in the browser
  const getInitialFontSize = (): string => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("fontSize") || "medium";
    }
    return "medium";
  };

  const getInitialLatin = (): boolean => {
    if (typeof window !== "undefined") {
      const savedLatinVisible = localStorage.getItem("latinVisible");
      return savedLatinVisible === "true";
    }
    return true;
  };

  const getInitialTranslation = (): boolean => {
    if (typeof window !== "undefined") {
      const savedTranslationVisible = localStorage.getItem("translationVisible");
      return savedTranslationVisible === "true";
    }
    return true;
  };

  // Initialize state
  const [fontSize, setFontSize] = useState<string>("medium");
  const [latinVisible, setLatinVisible] = useState<boolean>(true);
  const [translationVisible, setTranslationVisible] = useState<boolean>(true);

  // Load state from localStorage after component mounts
  useEffect(() => {
    setFontSize(getInitialFontSize());
    setLatinVisible(getInitialLatin());
    setTranslationVisible(getInitialTranslation());
  }, []);

  // Update localStorage when state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("fontSize", fontSize);
      localStorage.setItem("latinVisible", latinVisible.toString());
      localStorage.setItem("translationVisible", translationVisible.toString());
    }
  }, [fontSize, latinVisible, translationVisible]);

  // Toggle functions
  const changeFontSize = (size: string) => setFontSize(size);
  const toggleLatin = () => setLatinVisible((prev) => !prev);
  const toggleTranslation = () => setTranslationVisible((prev) => !prev);

  return (
    <ThemeContext.Provider
      value={{
        fontSize,
        changeFontSize,
        latinVisible,
        toggleLatin,
        translationVisible,
        toggleTranslation,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
