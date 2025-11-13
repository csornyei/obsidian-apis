import httpx

from env import PC_CONTROLLER_URL, PC_CONTROLLER_API_KEY


async def get_pc_health():
    headers = {"X-Api-Key": PC_CONTROLLER_API_KEY}
    async with httpx.AsyncClient() as client:
        response = await client.get(f"{PC_CONTROLLER_URL}/health", headers=headers)
        response.raise_for_status()
        return response.json()


async def send_power_command(action: str):
    headers = {"X-Api-Key": PC_CONTROLLER_API_KEY}
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{PC_CONTROLLER_URL}/power/{action}", headers=headers
        )
        response.raise_for_status()
        return response.json()
