import os


def get_env_var(key: str, default_value: str, raise_if_missing: bool = False) -> str:
    value = os.getenv(key, default_value)
    if value is None and raise_if_missing:
        raise EnvironmentError(f"Environment variable '{key}' is missing.")
    return value


MAIN_MAC_ADDRESS = get_env_var("MAIN_MAC_ADDRESS", raise_if_missing=True)
SECRET_KEY = get_env_var("SECRET_KEY", raise_if_missing=True)
