from pydantic import BaseModel
from typing import Optional, Literal
from uuid import UUID


class MessageStub(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str


class MessageCreateSchema(MessageStub):
    conversation_id: Optional[UUID] = None


class ChatResponseSchema(BaseModel):
    conversation_id: UUID
    response: MessageStub
