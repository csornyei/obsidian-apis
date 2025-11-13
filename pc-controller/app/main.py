import os
import socket
import subprocess
import time
from typing import Literal

from fastapi import FastAPI, Response, responses
import psutil

from env import PC_CONTROL_API_KEY
from logger import logger


app = FastAPI(title="PC Controller API")


@app.middleware("http")
async def verify_api_key(request, call_next):
    # if path is /docs or starts with /docs/, skip API key check
    allowed_paths = ["/docs", "/openapi.json"]

    for path in allowed_paths:
        if request.url.path.startswith(path):
            return await call_next(request)

    api_key = request.headers.get("X-API-Key")
    if api_key != PC_CONTROL_API_KEY:
        logger.warning(f"Unauthorized access attempt. Provided key: {api_key}")
        return responses.JSONResponse(
            status_code=401, content={"detail": "Unauthorized"}
        )

    logger.info("Authorized request with API key")

    response = await call_next(request)
    return response


@app.get("/")
async def read_root():
    return {"message": "Welcome to the PC Controller API!"}


@app.get("/health")
def health():
    hostname = socket.gethostname()
    boot_time = psutil.boot_time()
    uptime_seconds = time.time() - boot_time

    load1, load5, load15 = os.getloadavg()
    cpu_usage = psutil.cpu_percent(interval=0.5)
    memory = psutil.virtual_memory()

    return {
        "hostname": hostname,
        "uptime_seconds": int(uptime_seconds),
        "load_average": {"1min": load1, "5min": load5, "15min": load15},
        "cpu_usage_percent": cpu_usage,
        "memory": {
            "total_mb": memory.total // (1024 * 1024),
            "available_mb": memory.available // (1024 * 1024),
            "used_mb": memory.used // (1024 * 1024),
            "percent_used": memory.percent,
        },
    }


@app.post("/power/{action}")
def power_action(action: Literal["shutdown", "reboot", "sleep"]):
    match action:
        case "shutdown":
            subprocess.run(["sudo", "shutdown", "now"])
        case "reboot":
            subprocess.run(["sudo", "reboot"])
        case "sleep":
            subprocess.run(["systemctl", "suspend"])
        case _:
            return Response(status_code=400, content="Invalid action")

    return {"message": f"PC will {action} now."}
