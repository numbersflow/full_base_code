from fastapi import FastAPI
from app.core.api_version import APIVersion, APIVersionManager
from app.core.settings import get_settings
from app.utils.execution_time import ExecutionTimeMiddleware

# 각 버전별 라우터 import
from app.router.v1.api import recruit_api_router_v1

settings = get_settings()

def create_app() -> FastAPI:
    """애플리케이션 생성"""
    version_manager = APIVersionManager()
    
    # 기본 서버 설정
    base_servers = [
        {
            "url": "http://localhost:8000",
            "description": "로컬 환경 서버",
            "environment": "local"
        },
        {
            "url": "https://dev-ai.grabberhr.com",
            "description": "개발 환경 서버",
            "environment": "development"
        },
        {
            "url": "https://api.grabberhr.com",
            "description": "운영 환경 서버",
            "environment": "production"
        }
    ]

    # V1 API 설정
    version_manager.add_version(
        APIVersion(
            prefix="/api/v1",
            title="AI API V1",
            version="1.0.0",
            description="AI 프롬프트 관리 서버",
            servers=[
                {
                    **server,
                    "url": f"{server['url']}/api/v1"
                } for server in base_servers
            ],
            router=recruit_api_router_v1,
            enabled=True
        )
    )

    # 앱 생성
    app = version_manager.create_apps(
        cors_origins=settings.cors_origin_list,
        middlewares=[ExecutionTimeMiddleware]
    )
    
    return app

# 애플리케이션 인스턴스 생성
app = create_app()