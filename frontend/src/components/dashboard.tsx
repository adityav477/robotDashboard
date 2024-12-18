'use client'

import { useState, useEffect } from "react"
import { RobotList } from "./robot-list"
import { MapView } from "./map-view"
import { Header } from "./header"
import { StatusFilter } from "./status-filter"
import { RobotData } from "@/types/robot"

export function Dashboard() {
  const [robots, setRobots] = useState<RobotData[]>([])
  const [filteredRobots, setFilteredRobots] = useState<RobotData[]>([])
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    try {
      if (typeof window !== undefined) {

        const socket = new WebSocket("ws://localhost:8000/ws");

        socket.onopen = () => {
          console.log("websocket connection established");
        }

        socket.onmessage = (event) => {
          const updatedData = JSON.parse(event.data);

          console.log("Hello there");
          if (updatedData) {
            const dataNeeded: RobotData[] = [];
            for (let i = 0; i <= 20; i++) {
              dataNeeded.push(updatedData[i]);
            }

            setRobots(dataNeeded);
          }
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

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 flex flex-col lg:flex-row p-4 space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="w-full lg:w-1/2 space-y-4">
          <StatusFilter filter={filter} setFilter={setFilter} />
          <RobotList robots={filteredRobots} />
        </div>
        <div className="w-full lg:w-1/2 ">
          <MapView robots={filteredRobots} />
        </div>
      </div>
    </div>
  )
}

