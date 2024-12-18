"use client"
import { useEffect, useState } from "react"
import { ModeToggle } from "./mode-toggle"

export function Header() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])


  return (
    <header className="bg-background border-b">
      <div suppressHydrationWarning className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold ">Robot Fleet Dashboard</h1>
        {isMounted && <ModeToggle />}
      </div>
    </header>
  )
}

