export interface RobotData {
  id: string
  online: boolean
  batteryPercentage: number
  cpuUsage: number
  ramConsumption: number
  lastUpdated: string
  location: {
    latitude: number
    longitude: number
  }
}

