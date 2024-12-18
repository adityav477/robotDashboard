'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { RobotData } from "@/types/robot"

interface RobotListProps {
  robots: RobotData[]
}

export function RobotList({ robots }: RobotListProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table className="border border-zinc-200">
        <TableHeader>
          <TableRow>
            <TableHead>Robot ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Battery</TableHead>
            <TableHead>CPU</TableHead>
            <TableHead>RAM</TableHead>
            <TableHead>Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {robots.map((robot) => (
            <TableRow key={robot.id} className="border border-zinc-200 rounded-lg">
              <TableCell className="font-sans">{robot.id}</TableCell>
              <TableCell>
                {robot.online ?
                  <span className="px-2 py-1 rounded-lg bg-green-200  text-green-800 ">
                    Online
                  </span>
                  :
                  <span className="px-2 py-1 rounded-lg bg-red-200  text-red-800 ">
                    Offline
                  </span>
                }
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${robot.batteryPercentage < 20
                      ? "bg-red-500"
                      : robot.batteryPercentage < 50
                        ? "bg-yellow-500"
                        : "bg-green-500"
                      }`}
                  />
                  {robot.batteryPercentage}%
                </div>
              </TableCell>
              <TableCell>{robot.cpuUsage}%</TableCell>
              <TableCell>{robot.ramConsumption}%</TableCell>
              <TableCell>{new Date(robot.lastUpdated).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

