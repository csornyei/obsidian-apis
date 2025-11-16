from pydantic import BaseModel
from typing import Optional, Literal, Union
from uuid import UUID


class ExceptionResponseSchema(BaseModel):
    message: str


class MessageStub(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str


class MessageEnhancerInputSchema(MessageStub):
    id: UUID


class MessageCreateSchema(MessageStub):
    conversation_id: Optional[UUID] = None


class ChatSuccessResponseSchema(BaseModel):
    conversation_id: UUID
    response: MessageStub


class ChatResponseSchema(BaseModel):
    status_code: int
    response: Union[ChatSuccessResponseSchema, ExceptionResponseSchema]
