import json


class BaseAppException(Exception):
    def __init__(self, status_code: int, message: str):
        super().__init__(self.message)
        self.message = message
        self.status_code = status_code

    def to_response(self):
        return {
            "status_code": self.status_code,
            "message": json.dumps({"error": self.message}),
        }


class NotFoundException(BaseAppException):
    def __init__(self, message: str = "Resource not found"):
        super().__init__(status_code=404, message=message)
