'use client'
import { Dashboard } from "@/components/dashboard"
import { ThemeProvider } from "@/components/theme-provider"
import { useEffect, useState } from "react"

export default function Home() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  })

  if (!isMounted) return null;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main className="min-h-screen bg-background">
        <Dashboard />
      </main>
    </ThemeProvider>
  )
}

