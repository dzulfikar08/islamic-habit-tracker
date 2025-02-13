"use client";
import { createContext, useState, useEffect, ReactNode } from "react";

interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
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
  const getInitialTheme = (): string => {
    if (typeof window !== "undefined"){
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme) {
      return savedTheme;
    } else {
      // Deteksi tema dari perangkat pengguna
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return prefersDarkMode ? "dark" : "light";
    }
  } else {
    return "light";
  }

  };
  // Ensure localStorage is only accessed in the browser
  const getInitialFontSize = (): string => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("fontSize") || "small";
    }
    return "small";
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
  const [theme, setTheme] = useState<string>(getInitialTheme);
  const [fontSize, setFontSize] = useState<string>("medium");
  const [latinVisible, setLatinVisible] = useState<boolean>(true);
  const [translationVisible, setTranslationVisible] = useState<boolean>(true);

  // Load state from localStorage after component mounts
  useEffect(() => {
    setFontSize(getInitialFontSize());
    setLatinVisible(getInitialLatin());
    setTranslationVisible(getInitialTranslation());
    setTheme(getInitialTheme());
  }, []);

  // Update localStorage when state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("fontSize", fontSize);
      localStorage.setItem("latinVisible", latinVisible.toString());
      localStorage.setItem("translationVisible", translationVisible.toString());
    }
  }, [fontSize, latinVisible, translationVisible, theme]);

  // Toggle functions
  const changeFontSize = (size: string) => setFontSize(size);
  const toggleLatin = () => setLatinVisible((prev) => !prev);
  const toggleTranslation = () => setTranslationVisible((prev) => !prev);
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider 
      value={{
        theme,
        toggleTheme,
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
