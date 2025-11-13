import os
from typing import Optional


def get_env_var(
    key: str, default_value: Optional[str] = None, raise_if_missing: bool = False
) -> Optional[str]:
    value = os.getenv(key, default_value)
    if value is None and raise_if_missing:
        raise EnvironmentError(f"Environment variable '{key}' is missing.")
    if value is None and default_value is not None:
        return EnvironmentError(
            f"Environment variable '{key}' is missing. No default value provided."
        )
    return value


FABLE_BASE_URL = get_env_var("FABLE_BASE_URL", raise_if_missing=True)
FILE_API_BASE_URL = get_env_var("FILE_API_BASE_URL", "http://localhost:8000")
