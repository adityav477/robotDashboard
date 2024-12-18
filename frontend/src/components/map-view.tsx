"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { RobotData } from "@/types/robot"

interface MapViewProps {
  robots: RobotData[]
}

export function MapView({ robots }: MapViewProps) {
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([0, 0], 2)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current)
    }

    const map = mapRef.current

    map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer)
      }
    })

    robots.forEach((robot) => {
      const icon = L.divIcon({
        className: "robot-marker",
        html: `<div class="w-4 h-4 rounded-full ${robot.online ? "bg-green-500" : "bg-red-500"
          }"></div>`,
      })

      L.marker([robot.location.latitude, robot.location.longitude], { icon })
        .addTo(map)
        .bindPopup(`Robot ID: ${robot.id}<br>Battery: ${robot.batteryPercentage}%`)
    })

    if (robots.length > 0) {
      const bounds = L.latLngBounds(
        robots.map((robot) => [robot.location.latitude, robot.location.longitude])
      )
      map.fitBounds(bounds)
    }
  }, [robots])

  return <div id="map" className="h-[500px] mt-16 rounded-lg overflow-hidden" />
}

