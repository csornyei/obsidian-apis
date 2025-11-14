from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_db
import app.service as service
import app.enhancer as enhancer
from app.logger import logger
from app.llm import get_llm_client, LLMClient
from app.schemas import MessageCreateSchema, ChatResponseSchema
from app.exception import BaseAppException

router = APIRouter()


@router.post(
    "/chat", tags=["chat"], name="Send message", response_model=ChatResponseSchema
)
async def send_message(
    message: MessageCreateSchema,
    db: AsyncSession = Depends(get_db),
    llm_client: LLMClient = Depends(get_llm_client),
):
    try:
        print(f"Received message: {message.content} with role: {message.role}")

        msg = await service.create_message(db, message)

        logger.info(f"Created message: {msg.model_dump()}")

        msg_history = await service.get_conversation_history(db, msg.conversation_id)
        logger.info(f"Conversation history: {msg_history}")

        enhanced_msg = await enhancer.add_history_message(
            history=msg_history, message=msg
        )

        llm_response = await llm_client.chat(enhanced_msg)

        assistant_message = MessageCreateSchema(
            role="assistant",
            content=llm_response,
            conversation_id=msg.conversation_id,
        )

        assistant_msg = await service.create_message(db, assistant_message)

        logger.info(f"LLM response: {assistant_msg.content}")

        return ChatResponseSchema(
            conversation_id=msg.conversation_id,
            response=MessageCreateSchema(
                role=assistant_msg.role, content=assistant_msg.content
            ),
        )

    except BaseAppException as e:
        return e.to_response()
    except Exception as e:
        return {
            "status_code": 500,
            "message": f"An unexpected error occurred: {str(e)}",
        }


@router.get("/conversations", tags=["conversations"], name="List conversations")
async def get_conversations(db: AsyncSession = Depends(get_db)):
    logger.info("Listing all conversations")
    conversations = await service.list_conversations(db)
    return conversations


@router.get(
    "/conversations/{conversation_id}",
    tags=["conversations"],
    name="List messages in a conversation",
)
async def list_messages(
    conversation_id: str,
    db: AsyncSession = Depends(get_db),
    limit: int = 50,
    offset: int = 0,
):
    logger.info(f"Getting conversation with ID {conversation_id}")

    conversation = await service.fetch_conversation(db, conversation_id)

    messages = await service.list_messages(db, conversation, limit=limit, offset=offset)

    return messages
