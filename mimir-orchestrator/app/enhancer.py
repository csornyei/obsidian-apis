from typing import List

from app.schemas import MessageStub


async def add_history_message(
    history: List[MessageStub], message: MessageStub
) -> MessageStub:
    """
    Enhance the incoming message by appending conversation history.

    Args:
        history (List[MessageStub]): List of previous messages in the conversation.
        message (str): The new incoming message.

    Returns:
        str: The enhanced message with conversation history.
    """
    enhanced_message = "Conversation History:\n"
    for msg in history:
        enhanced_message += f"{msg.role.capitalize()}: {msg.content}\n"
    enhanced_message += f"New Message: {message.content}"

    return MessageStub(
        content=enhanced_message, **message.model_dump(exclude={"content"})
    )
