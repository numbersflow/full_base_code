import httpx
from fastapi import Request
from datetime import datetime

from app.core.settings import ENVIRONMENT

class SlackNotifier:
    def __init__(self, token: str, channel: str, project: str):
        self.token = token
        self.channel = channel
        self.project = project
        self.base_url = "https://slack.com/api/chat.postMessage"

    async def send_error_notification(
        self,
        error_type: str,
        message: str,
        detail_message: str,
        request: Request
    ):

        timestamp = datetime.utcnow().isoformat()
        notification = self._format_error_message(
            timestamp, error_type, message, detail_message, request
        )
        await self._send_message(notification)

    def _format_error_message(
        self, 
        timestamp: str,
        error_type: str,
        message: str,
        detail_message: str,
        request: Request
    ) -> str:
        return (
            "==========================================\n"
            f"[{self.project}-{ENVIRONMENT}]\n"
            f"timestamp : {timestamp}\n"
            f"path : {request.method} {request.url.path}\n"
            f"requestId : {request.headers.get('X-Request-ID', 'N/A')}\n"
            f"error_type : {error_type}\n"
            f"message : {message}\n"
            f"detail : {detail_message}\n"
            "=========================================="
        )

    async def _send_message(self, message: str):
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.token}"
        }
        payload = {
            "channel": self.channel,
            "text": message
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                self.base_url,
                headers=headers,
                json=payload
            )
            response.raise_for_status()