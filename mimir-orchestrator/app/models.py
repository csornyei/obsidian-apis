import uuid
from datetime import datetime
from enum import Enum
from typing import List, Optional

from sqlmodel import (
    SQLModel,
    Field,
    Relationship,
)
from sqlalchemy import Column, DateTime, func  # for nicer timestamps


class MessageRole(str, Enum):
    user = "user"
    assistant = "assistant"
    system = "system"


class MessageBase(SQLModel):
    role: MessageRole
    content: str
    conversation_id: uuid.UUID = Field(foreign_key="conversations.id")


class MessageModel(MessageBase, table=True):
    __tablename__ = "messages"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, index=True)
    created_at: datetime = Field(
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )

    conversation: "ConversationModel" = Relationship(back_populates="messages")


class ConversationBase(SQLModel):
    title: Optional[str] = None


class ConversationModel(ConversationBase, table=True):
    __tablename__ = "conversations"

    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True, index=True)

    created_at: datetime = Field(
        sa_column=Column(DateTime(timezone=True), server_default=func.now())
    )
    updated_at: datetime = Field(
        sa_column=Column(
            DateTime(timezone=True),
            server_default=func.now(),
            onupdate=func.now(),
        )
    )

    messages: List["MessageModel"] = Relationship(
        back_populates="conversation",
        sa_relationship_kwargs={
            "cascade": "all, delete",
            "order_by": "MessageModel.created_at",
        },
    )
