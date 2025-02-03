"use client"; // Mark this as a client component

import React, { createContext, useState, useContext, useEffect } from "react"

interface AuthContextType {
  isLoggedIn: boolean
  login: (token?: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {

    const loggedIn = document.cookie
      .split("; ")
      .find((row) => row.startsWith("isLoggedIn="))
      ?.split("=")[1] === "true"

    setIsLoggedIn(loggedIn)
  }, [])

  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date()
    expires.setDate(expires.getDate() + days)
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`
  }

  const deleteCookie = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
  }

  const login = (token?: string) => {
    setCookie("authToken", token ?? "", 7)
    setCookie("isLoggedIn", "true", 7) // Store in cookie for 7 days
    setIsLoggedIn(true)
  }

  const logout = () => {
    deleteCookie("isLoggedIn")
    deleteCookie("authToken")
    setIsLoggedIn(false)
  }

  return <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
