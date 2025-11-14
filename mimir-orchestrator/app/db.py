from typing import AsyncGenerator

from sqlmodel.ext.asyncio.session import AsyncSession
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.orm import sessionmaker

from app.env import DATABASE_URL

engine = create_async_engine(DATABASE_URL, echo=False, future=True)

AsyncSessionLocal = sessionmaker(
    engine,
    expire_on_commit=False,
    class_=AsyncSession,
)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session
