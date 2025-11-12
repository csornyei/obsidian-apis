from pydantic import BaseModel, Field
from typing import Optional


class BLResult(BaseModel):
    id: str
    name: str
    count: int


class BookListResponse(BaseModel):
    count: int
    next: str | None
    previous: str | None
    results: list[BLResult] = Field(default_factory=list)


class BookResultItem(BaseModel):
    id: str
    title: str
    subtitle: Optional[str]
    cover_image: Optional[str]
    isbn: Optional[str]
    source: Optional[str]
    description: Optional[str]

    authors: Optional[list[dict]] = None
    subjects: Optional[list[list[str]]] = None
    genres: Optional[list[dict]] = None
    started_reading_at: Optional[str] = None
    finished_reading_at: Optional[str] = None


class BookResult(BaseModel):
    book: BookResultItem


class BooksResponse(BaseModel):
    count: int
    next: Optional[str] = None
    previous: Optional[str] = None
    results: list[BookResult] = Field(default_factory=list)
