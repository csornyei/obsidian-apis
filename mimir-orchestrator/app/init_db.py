from sqlmodel import SQLModel

from app.env import DATABASE_URL
from app.db import engine
from app.models import ConversationModel, MessageModel


async def init_db() -> None:
    """TODO: use alembic for migrations

    Initialize the database by creating all tables.
    """
    print("Initializing database...", DATABASE_URL)
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)
        await conn.run_sync(ConversationModel.metadata.create_all)
        await conn.run_sync(MessageModel.metadata.create_all)


if __name__ == "__main__":
    import asyncio

    asyncio.run(init_db())
