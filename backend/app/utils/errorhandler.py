
import traceback
from fastapi import Request

from app.core.settings import get_settings


from app.utils.slack_notifer import SlackNotifier

settings = get_settings()

class SingletonMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            instance = super().__call__(*args, **kwargs)
            cls._instances[cls] = instance
        return cls._instances[cls]


class ErrorHandler(metaclass=SingletonMeta):
    def __init__(self):
        self.slack_notifier = SlackNotifier(
            settings.get('SLACK_TOKEN'), 
            settings.get('SLACK_CHANNEL'), 
            settings.get('SLACK_PROJECT')
        )

    async def handle_error(
        self, 
        error: Exception,
        error_type: str,
        detail_message: str = None,
        request: Request = None,
        should_notify: bool = False
    ):
        """에러 처리 및 로깅"""
        trace = traceback.format_exc()
        error_message = str(error)
        
        # 에러 로깅
        await self.log_error(error_type, error_message, trace, detail_message)
        
        # 슬랙 알림이 필요한 경우
        if should_notify and request:
            await self.slack_notifier.send_error_notification(
                error_type=error_type,
                message=error_message,
                detail_message=detail_message,
                request=request
            )