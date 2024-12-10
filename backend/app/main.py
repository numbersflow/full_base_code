from fastapi import FastAPI
from app.core.api_version import APIVersion, APIVersionManager
from app.core.settings import get_settings, ENVIRONMENT
from app.utils.execution_time import ExecutionTimeMiddleware

# 각 버전별 라우터 import
from app.router.v1.api import recruit_api_router_v1

settings = get_settings()


def _get_base_servers() -> list:
    """서버 환경 설정 반환"""
    return [
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


def _configure_api_versions(
    version_manager: APIVersionManager,
    base_servers: list
) -> None:
    """API 버전 설정"""
    
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
    

    # V2 API 설정
    version_manager.add_version(
        APIVersion(
            prefix="/api/v2",
            title="AI API V2",
            version="2.0.0",
            description="""
            AI 프롬프트 관리 서버
            
            주요 기능:
            - AI 프롬프트 생성 및 관리
            - 응답 생성 및 처리
            """,
            servers=[
                {
                    **server,
                    "url": f"{server['url']}/api/v2"
                } for server in base_servers
            ],
            router=recruit_api_router_v1,
            enabled=True
        )
    )


def _configure_base_endpoints(app: FastAPI) -> None:
    """기본 엔드포인트 설정"""
    
    @app.get("/healths")
    async def health_check():

        return {
            "status": "ok",
            "environment": ENVIRONMENT
        }


def create_app() -> FastAPI:
    """애플리케이션 생성 및 설정"""
    
    # 기본 설정 초기화
    version_manager = APIVersionManager()
    
    # 환경별 서버 설정
    base_servers = _get_base_servers()
    
    # API 버전 설정
    _configure_api_versions(version_manager, base_servers)
    
    # 앱 생성 및 미들웨어 설정
    app = version_manager.create_apps(
        cors_origins=settings.get_cors_origins(),
        middlewares=[ExecutionTimeMiddleware]
    )
    
    # 기본 엔드포인트 설정
    _configure_base_endpoints(app)
    
    return app


# 애플리케이션 인스턴스 생성
app = create_app()
