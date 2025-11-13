import httpx

from env import FILE_API_BASE_URL


def test_connection() -> bool:
    try:
        response = httpx.get(f"{FILE_API_BASE_URL}/")
        if response.status_code == 200:
            body = response.json()
            return body.get("message") == "Welcome to the File Listing API!"
    except httpx.RequestError:
        return False


def get_book_list() -> list:
    response = httpx.get(
        f"{FILE_API_BASE_URL}/v1/files/", params={"type": "files", "path": "books"}
    )

    if response.status_code != 200:
        raise Exception(f"Failed to fetch book list: {response.text}")
    return response.json()


def save_book_file(file_name: str, content: list[str], frontmatter: dict) -> None:
    payload = {
        "content": content,
        "frontmatter": frontmatter,
    }

    response = httpx.post(
        f"{FILE_API_BASE_URL}/v1/files/write", params={"path": file_name}, json=payload
    )

    if response.status_code != 201:
        raise Exception(f"Failed to save book file: {response.text}")


def update_frontmatter(file_name: str, frontmatter: dict) -> None:
    payload = {
        "path": f"books/{file_name}",
        "frontmatter": frontmatter,
        "content": [],
    }

    response = httpx.patch(
        f"{FILE_API_BASE_URL}/v1/files/write",
        params={"path": file_name, "type": "frontmatter"},
        json=payload,
    )

    if response.status_code != 204:
        raise Exception(f"Failed to update frontmatter: {response.text}")
