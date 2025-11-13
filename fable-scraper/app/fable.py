import httpx

from logger import logger
from env import FABLE_BASE_URL
from schemas import BookListResponse, BooksResponse


def get_book_lists() -> BookListResponse:
    get_book_lists_url = f"{FABLE_BASE_URL}/book_lists/?media_type=book"

    logger.info(f"Fetching book lists from URL: {get_book_lists_url}")
    response = httpx.get(get_book_lists_url)

    if response.status_code == 200:
        data = response.json()
        return BookListResponse(**data)
    else:
        logger.error(f"Failed to retrieve data: {response.status_code}")
        return BookListResponse(count=0, results=[])


def get_books_from_list(
    book_list_id: str, limit: int = 20, offset: int = 0
) -> BooksResponse:
    url = f"{FABLE_BASE_URL}/book_lists/{book_list_id}/books?limit={limit}&offset={offset}"

    logger.info(f"Fetching books from URL: {url}")

    response = httpx.get(url)

    if response.status_code == 200:
        return BooksResponse(**response.json())
    else:
        logger.error(f"Failed to retrieve data: {response.status_code}")
        return BooksResponse(count=0, results=[])
