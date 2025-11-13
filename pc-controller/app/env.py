import os
from typing import Optional
from pathlib import Path

from dotenv import load_dotenv

env_path = Path(__file__).parent.parent / ".env"
if env_path.exists():
    load_dotenv(dotenv_path=env_path)


def get_env_var(
    key: str, default_value: Optional[str] = None, raise_if_missing: bool = True
) -> Optional[str]:
    value = os.getenv(key, default_value)
    if value is None and raise_if_missing:
        raise EnvironmentError(f"Environment variable '{key}' is missing.")
    return value


PC_CONTROL_API_KEY = get_env_var("PC_CONTROL_API_KEY")
