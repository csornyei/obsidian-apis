from typing import Optional

from fastapi import FastAPI, Body, Response
from pydantic import BaseModel
import wakeonlan

from env import SECRET_KEY, MAIN_MAC_ADDRESS

app = FastAPI(title="Wake-on-LAN API", version="1.0.0")


class WakeOnLanRequest(BaseModel):
    secret_key: str
    mac_address: Optional[str] = MAIN_MAC_ADDRESS


@app.get("/")
async def read_root():
    return {"message": "Wake-on-LAN API is running."}


@app.post("/")
async def wake_up(response: Response, body: WakeOnLanRequest = Body(...)):
    if body.secret_key != SECRET_KEY:
        response.status_code = 403
        return {"error": "Invalid secret key."}

    mac_address = body.mac_address

    wakeonlan.send_magic_packet(mac_address)

    return {"message": f"Magic packet sent to {mac_address}."}
