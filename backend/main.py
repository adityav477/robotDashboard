from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import asyncio
import json
import random
from datetime import datetime, timezone

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


@app.middleware("http")
async def enforce_websocket_headers(request, call_next):
    response = await call_next(request)
    response.headers["Connection"] = "Upgrade"
    response.headers["Upgrade"] = "websocket"
    return response


# Import fake_robot_data
with open("./data/fake_robot-data.json") as file:
    json_data = json.load(file)


class Location(BaseModel):
    latitude: float
    longitude: float


class Robot(BaseModel):
    id: str
    online: bool
    batteryPercentage: int
    cpuUsage: int
    ramConsumption: int
    lastUpdated: str
    location: Location


# Convert from json to Robot instance
def convert_to_robot_intance(data):
    return Robot(
        id=data["Robot ID"],
        online=data["Online/Offline"],
        batteryPercentage=data["Battery Percentage"],
        cpuUsage=data["CPU Usage"],
        ramConsumption=data["RAM Consumption"],
        lastUpdated=data["Last Updated"],
        location=Location(
            latitude=data["Location Coordinates"][0],
            longitude=data["Location Coordinates"][1],
        ),
    )


robots = []

for raw_robot in json_data:
    robots.append(convert_to_robot_intance(raw_robot))


@app.get("/api/robots")
async def get_robots():
    return robots


@app.websocket("/")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Update robot data
            for robot in robots:
                robot.online = random.choice([True, False])
                robot.batteryPercentage = random.randint(0, 100)
                robot.cpuUsage = random.randint(0, 100)
                robot.ramConsumption = random.randint(0, 100)
                robot.lastUpdated = datetime.now(timezone.utc).isoformat()
                robot.location = Location(
                    latitude=random.uniform(-90, 90),
                    longitude=random.uniform(-180, 180),
                )

            # Send updated data to the client
            await websocket.send_json([robot.dict() for robot in robots])

            # Wait for 5 seconds before the next update
            await asyncio.sleep(5)
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        await websocket.close()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
