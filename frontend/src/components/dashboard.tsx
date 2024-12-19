import { useState, useEffect } from "react"
import { RobotList } from "./robot-list"
import { Header } from "./header"
import { StatusFilter } from "./status-filter"
import { RobotData } from "@/types/robot"
import dynamic from "next/dynamic";

const DynamicMapView = dynamic(() => import("./map-view"), { ssr: false });

export function Dashboard() {
  const [robots, setRobots] = useState<RobotData[]>([]);
  const [filteredRobots, setFilteredRobots] = useState<RobotData[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [mounted, setMounted] = useState(false)

  useEffect(() => {

    setMounted(true);
    try {
      const socket = new WebSocket(process.env.NEXT_PUBLIC_BACKEND_WS_URL || "ws://localhost:8000");
      console.log("backend url is ", process.env.NEXT_PUBLIC_BACKEND_WS_URL);

      socket.onopen = () => {
        console.log("websocket connection established");
      }

      socket.onmessage = (event) => {
        if (event.data) {
          const updatedData = JSON.parse(event.data);

          const dataNeeded: RobotData[] = [];
          for (let i = 0; i <= 20; i++) {
            dataNeeded.push(updatedData[i]);
          }

          setRobots(dataNeeded);
        }
      }
    } catch (e) {
      alert(`error connecting backend ${e}`);
    }
  }, [])

  useEffect(() => {
    setFilteredRobots(
      robots.filter((robot) => {
        if (filter === "all") return true
        if (filter === "online") return robot.online
        if (filter === "offline") return !robot.online
        if (filter === "low-battery") return robot.batteryPercentage < 20
        return true
      })
    )
  }, [robots, filter])

  if (!mounted) return null

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 flex flex-col lg:flex-row p-4 space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="w-full lg:w-1/2 space-y-4">
          <StatusFilter filter={filter} setFilter={setFilter} />
          <RobotList robots={filteredRobots} />
        </div>
        <div className="w-full lg:w-1/2 " >
          <DynamicMapView robots={filteredRobots} />
        </div>
      </div>
    </div>
  )
}

