from typing import List

from app.schemas import MessageEnhancerInputSchema, MessageStub


async def add_history_message(
    history: List[MessageEnhancerInputSchema], message: MessageEnhancerInputSchema
) -> MessageStub:
    """
    Enhance the incoming message by appending conversation history.

    Args:
        history (List[MessageEnhancerInputSchema]): List of previous messages in the conversation.
        message (MessageEnhancerInputSchema): The new incoming message.

    Returns:
        MessageStub: The enhanced message with conversation history.
    """
    enhanced_message = "Conversation History:\n"
    for msg in history:
        if msg.id == message.id:
            continue
        enhanced_message += f"{msg.role.capitalize()}: {msg.content}\n"
    enhanced_message += f"New Message: {message.content}"

    return MessageStub(
        content=enhanced_message, **message.model_dump(exclude={"content"})
    )
