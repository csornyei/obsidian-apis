import os
from typing import Optional
from pathlib import Path

from dotenv import load_dotenv

env_path = Path(__file__).parent.parent / ".env"
if env_path.exists():
    load_dotenv(dotenv_path=env_path)


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


MAIN_MAC_ADDRESS = get_env_var("MAIN_MAC_ADDRESS", raise_if_missing=True)
SECRET_KEY = get_env_var("SECRET_KEY", raise_if_missing=True)
PC_CONTROLLER_API_KEY = get_env_var("PC_CONTROLLER_API_KEY", raise_if_missing=True)
PC_CONTROLLER_URL = get_env_var("PC_CONTROLLER_URL", raise_if_missing=True)
