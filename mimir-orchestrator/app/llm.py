from typing import Protocol

from app.logger import logger
from app.schemas import MessageStub
from app.env import OLLAMA_BASE_URL, LLM_MODEL

import httpx


class LLMClient(Protocol):
    async def chat(self, message: MessageStub) -> str: ...


class OllamaLlama3Client:
    """
    LLM client for Llama 3 / Llama 3.1 via Ollama.
    """

    def __init__(
        self,
        base_url: str | None = None,
        model_name: str | None = None,
    ) -> None:
        self.base_url = (base_url or OLLAMA_BASE_URL).rstrip("/")
        self.model_name = model_name or LLM_MODEL

    async def chat(self, message: MessageStub) -> str:
        """
        messages: list of {"role": "user"|"assistant"|"system", "content": "..."}
        Returns assistant's content as a string.
        """
        payload = {
            "model": self.model_name,
            "messages": [message.model_dump()],
            "stream": False,
        }
        logger.debug(f"Sending chat request to LLM with payload: {payload}")

        async with httpx.AsyncClient(base_url=self.base_url, timeout=120.0) as client:
            resp = await client.post("/api/chat", json=payload)
            resp.raise_for_status()
            data = resp.json()

        logger.debug(f"LLM response data: {data}")

        return data["message"]["content"]


_llm_client_singleton = OllamaLlama3Client()


async def get_llm_client() -> LLMClient:
    return _llm_client_singleton
