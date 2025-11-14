from uuid import UUID
from typing import Optional
from datetime import datetime

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.exception import NotFoundException
from app.models import ConversationModel, MessageModel
from app.schemas import MessageCreateSchema
from app.logger import logger


async def __create_conversation(db: AsyncSession, title: Optional[str] = None):
    if not title:
        title = f"Conversation {datetime.now().isoformat()}"

    logger.info(f"Creating new conversation with title: {title}")
    new_conversation = ConversationModel(title=title)

    db.add(new_conversation)
    await db.commit()
    await db.refresh(new_conversation)
    return new_conversation


async def fetch_conversation(db: AsyncSession, conversation_id: UUID):
    result = await db.execute(
        select(ConversationModel).where(ConversationModel.id == conversation_id)
    )

    conversation = result.scalar_one_or_none()
    logger.info(f"Fetched conversation: {conversation}")

    if not conversation:
        logger.error(f"Conversation with id {conversation_id} not found.")
        raise NotFoundException("Conversation not found.")

    return conversation


async def fetch_or_create_conversation(
    conversation_id: Optional[UUID],
    db: AsyncSession,
    title: Optional[str] = None,
):
    if conversation_id:
        return await fetch_conversation(db, conversation_id)
    else:
        return await __create_conversation(db, title)


async def __create_message(db: AsyncSession, message: MessageCreateSchema):
    new_message = MessageModel(
        role=message.role,
        content=message.content,
        conversation_id=message.conversation_id,
    )

    db.add(new_message)
    await db.commit()
    await db.refresh(new_message)

    logger.debug(f"Created new message with id: {new_message.id}")

    return new_message


async def create_message(db: AsyncSession, message: MessageCreateSchema):
    conversation = await fetch_or_create_conversation(message.conversation_id, db=db)

    create_msg = MessageCreateSchema(
        role=message.role,
        content=message.content,
        conversation_id=conversation.id,
    )

    logger.debug(f"Creating message in conversation {create_msg.model_dump()}")

    msg = await __create_message(
        db=db,
        message=create_msg,
    )
    return msg


async def list_conversations(db: AsyncSession):
    result = await db.execute(select(ConversationModel))

    conversations = result.scalars().all()

    logger.info(f"Retrieved {len(conversations)} conversations.")

    return conversations


async def list_messages(
    db: AsyncSession, conversation: ConversationModel, limit: int = 50, offset: int = 0
) -> list[MessageModel]:
    messages = (
        select(MessageModel)
        .where(MessageModel.conversation_id == conversation.id)
        .limit(limit)
        .offset(offset)
    )
    result = await db.execute(messages)

    messages = result.scalars().all()
    logger.info(
        f"Retrieved {len(messages)} messages for conversation {conversation.id}."
    )
    return list(messages)


async def get_conversation_history(
    db: AsyncSession, conversation_id: Optional[UUID]
) -> list[MessageModel]:
    if not conversation_id:
        return []

    conversation = await fetch_conversation(db, conversation_id)

    messages = await list_messages(db, conversation, limit=10, offset=0)

    return messages
