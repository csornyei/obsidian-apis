from typing import Optional, Literal

from fastapi import FastAPI, Body, Response
from pydantic import BaseModel
import wakeonlan

from pc_controller import get_pc_health, send_power_command
from env import SECRET_KEY, MAIN_MAC_ADDRESS

app = FastAPI(title="Wake-on-LAN API", version="1.0.0")


class WakeOnLanRequest(BaseModel):
    secret_key: str
    mac_address: Optional[str] = MAIN_MAC_ADDRESS


@app.get("/")
async def read_root():
    return {"message": "Wake-on-LAN API is running."}


@app.get("/health")
async def health_check():
    try:
        health = await get_pc_health()

        return health
    except Exception as e:
        return {"status": "unhealthy", "error": str(e)}


@app.post("/power/{action}")
async def power_action(
    action: Literal["poweron", "shutdown", "reboot", "sleep"],
    response: Response,
    body: WakeOnLanRequest = Body(...),
):
    if body.secret_key != SECRET_KEY:
        response.status_code = 403
        return {"error": "Invalid secret key."}

    match action:
        case "poweron":
            mac_address = body.mac_address
            wakeonlan.send_magic_packet(mac_address)
            return {"message": f"Magic packet sent to {mac_address}."}
        case "shutdown":
            await send_power_command("shutdown")
            return {"message": "Shutdown command sent to PC controller."}
        case "reboot":
            await send_power_command("reboot")
            return {"message": "Reboot command sent to PC controller."}
        case "sleep":
            await send_power_command("sleep")
            return {"message": "Sleep command sent to PC controller."}
