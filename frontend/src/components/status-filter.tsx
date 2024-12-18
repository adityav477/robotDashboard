import { Button } from "@/components/ui/button"

interface StatusFilterProps {
  filter: string
  setFilter: (filter: string) => void
}

export function StatusFilter({ filter, setFilter }: StatusFilterProps) {
  return (
    <div className="flex space-x-2">
      <Button
        variant={filter === "all" ? "outline" : "default"}
        className="rounded-lg  "
        onClick={() => setFilter("all")}
      >
        All
      </Button>
      <Button
        variant={filter === "online" ? "outline" : "default"}
        className="rounded-lg  "
        onClick={() => setFilter("online")}
      >
        Online
      </Button>
      <Button
        variant={filter === "offline" ? "outline" : "default"}
        className="rounded-lg  "
        onClick={() => setFilter("offline")}
      >
        Offline
      </Button>
      <Button
        variant={filter === "low-battery" ? "outline" : "default"}
        className="rounded-lg  "
        onClick={() => setFilter("low-battery")}
      >
        Low Battery
      </Button>
    </div >
  )
}

