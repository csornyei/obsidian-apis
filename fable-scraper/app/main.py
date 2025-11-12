import file_api
from logger import logger
from schemas import BooksResponse, BookResultItem
from fable import get_book_lists, get_books_from_list


def get_all_books_from_list(book_list_id: str) -> BooksResponse:
    all_books = []
    limit = 20
    offset = 0

    while True:
        books_response = get_books_from_list(book_list_id, limit, offset)
        all_books.extend(books_response.results)

        if books_response.next is None:
            break

        offset += limit

    return BooksResponse(count=len(all_books), results=all_books)


def collect_books() -> dict[str, list[BookResultItem]]:
    book_list_response = get_book_lists()

    shelves = {}

    for book_list in book_list_response.results:
        print(f"{book_list.name}, count: {book_list.count}")
        if book_list.count > 0:
            books_response = get_all_books_from_list(book_list.id)
            logger.info(f"Total books in '{book_list.name}': {books_response.count}")

            shelves[book_list.name] = list(
                map(lambda x: x.book, books_response.results)
            )

    return shelves


def get_shelf_name(shelf_name: str) -> str:
    mapping = {
        "Want to Read": "tbr",
        "Currently Reading": "reading",
        "Read": "finished",
    }
    return mapping.get(shelf_name, "unknown")


if __name__ == "__main__":
    if not file_api.test_connection():
        logger.error("Cannot connect to the File API. Please ensure it is running.")
        exit(1)
    shelves = collect_books()

    book_files = file_api.get_book_list()

    books_requests = []
    for shelf_name, books in shelves.items():
        for book in books:
            file_name = f"books/{book.title}.md"

            frontmatter = {
                "title": book.title,
                "authors": ", ".join(author["name"] for author in (book.authors or [])),
                "started": book.started_reading_at,
                "finished": book.finished_reading_at,
                "shelf": get_shelf_name(shelf_name),
                "genres": [genre["name"] for genre in (book.genres or [])],
                "isbn": book.isbn,
                "cover": book.cover_image,
                "subjects": [">".join(subjects) for subjects in (book.subjects or [])],
                "tags": ["book"],
            }

            if file_name in book_files:
                logger.info(f"{file_name} already exists, updating frontmatter only.")
                try:
                    file_api.update_frontmatter(
                        file_name=file_name, frontmatter=frontmatter
                    )
                except Exception as e:
                    logger.error(f"Error updating frontmatter for {file_name}: {e}")
                continue

            logger.info(f"Saving book file: {file_name}")
            try:
                file_api.save_book_file(
                    file_name=file_name,
                    content=[
                        f"![[{book.cover_image}]]",
                        f"## {book.title}",
                        "### Description",
                        f"{book.description or 'No description available.'}",
                        "",
                        "### Notes",
                    ],
                    frontmatter=frontmatter,
                )
            except Exception as e:
                logger.error(f"Error saving book file {file_name}: {e}")
