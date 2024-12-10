import time
from contextlib import asynccontextmanager
from fastapi import Request
from typing import AsyncGenerator

from app.utils.logging import logger

@asynccontextmanager
async def log_execution_time(request: Request) -> AsyncGenerator:
    """
    API 요청 처리 시간을 로깅하는 의존성
    """
    start_time = time.time()
    try:
        yield
    finally:
        execution_time = time.time() - start_time
        logger.info(f"API 요청 처리 시간: {request.url.path} - {execution_time:.5f}초")