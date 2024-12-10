from dataclasses import dataclass
from typing import List, Optional, Dict, Callable
from fastapi import FastAPI, Request, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from h11 import LocalProtocolError

from app.utils.error_codes import ERROR_MAPPINGS
from app.utils.errorhandler import ErrorHandler
from app.utils.error_response_builder import ErrorResponseBuilder


@dataclass
class APIVersion:
    prefix: str
    title: str
    version: str
    description: str
    servers: List[dict]
    router: object
    enabled: bool = True


class ExceptionHandlerManager:
    """예외 처리 관리자 클래스"""
    def __init__(self):
        self.error_handler = ErrorHandler
        self.error_mapping = ERROR_MAPPINGS

    async def handle_http_exception(
        self, 
        request: Request, 
        exc: HTTPException
    ) -> JSONResponse:
        """HTTP 예외 처리"""
        error_info = self.error_mapping.get(exc.status_code, {
            "error_type": f"{exc.status_code}: unknown_error",
            "default_message": "알 수 없는 오류가 발생했습니다.",
            "should_log": True
        })

        # 커스텀 detail이 있는 경우와 없는 경우 처리
        if isinstance(exc.detail, dict):
            error_detail = {
                "error": exc.detail.get("error", error_info["error_type"]),
                "message": exc.detail.get("message", error_info["default_message"]),
                "alert": exc.detail.get("alert", True)
            }
            # 추가 정보가 있다면 포함
            if additional_info := exc.detail.get("additional_info"):
                error_detail["additional_info"] = additional_info
        else:
            # detail이 문자열이거나 다른 타입인 경우 기본 매핑 사용
            error_detail = {
                "error": error_info["error_type"],
                "message": error_info["default_message"],
                "alert": True
            }

        if error_info["should_log"]:
            await self.error_handler.handle_error(
                exc,
                error_info["error_type"],
                error_detail["message"],
                request,
                error_detail["alert"]
            )

        return ErrorResponseBuilder.create_response(
            request=request,
            status_code=exc.status_code,
            **error_detail
        )


    async def handle_validation_exception(
        self, 
        request: Request, 
        exc: RequestValidationError
    ) -> JSONResponse:
        """검증 예외 처리"""
        validation_errors = exc.errors()
        
        # 상세한 유효성 검사 오류 메시지 생성
        error_details = []
        for error in validation_errors:
            location = " -> ".join(map(str, error["loc"][1:]))
            error_details.append({
                "field": location,
                "type": error["type"],
                "message": error["msg"]
            })

        error_message = "입력값 검증에 실패했습니다."
        if error_details:
            error_message = "; ".join([
                f"{error['field']}: {error['message']}" 
                for error in error_details
            ])

        await self.error_handler.handle_error(
            exc,
            "422: validation_error",
            error_message,
            request,
            True
        )

        return ErrorResponseBuilder.create_response(
            request=request,
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            error="Validation Error",
            message=error_message,
            alert=True,
            additional_info={"validation_errors": error_details}
        )


    async def handle_internal_error(
        self, 
        request: Request, 
        exc: Exception
    ) -> Optional[JSONResponse]:
        
        if isinstance(exc, LocalProtocolError):
            return None

        try:
            error_message = "서버 내부 오류가 발생했습니다."
            error_type = "500: internal_server_error"
            
            # 특정 예외에 대한 커스텀 처리
            if isinstance(exc, TimeoutError):
                error_message = "서버 처리 시간이 초과되었습니다."
                error_type = "500: timeout_error"
            elif isinstance(exc, ConnectionError):
                error_message = "서버 연결에 실패했습니다."
                error_type = "500: connection_error"
            
            await self.error_handler.handle_error(
                exc,
                error_type,
                str(exc),
                request,
                True
            )

            return ErrorResponseBuilder.create_response(
                request=request,
                status_code=500,
                error=error_type,
                message=error_message,
                alert=True,
            )

        except Exception as unknown_exc:
            await self.error_handler.handle_error(
                unknown_exc,
                "500: critical_error",
                str(unknown_exc),
                request,
                True
            )

            return ErrorResponseBuilder.create_response(
                request=request,
                status_code=500,
                error="Critical Error",
                message="심각한 서버 오류가 발생했습니다. 관리자에게 문의해주세요.",
                alert=True
            )

class APIVersionManager:
    def __init__(self):
        self.versions: List[APIVersion] = []
        
    def add_version(self, version: APIVersion):
        self.versions.append(version)
        
    def _configure_exception_handlers(
        self, 
        app: FastAPI, 
        handler_manager: ExceptionHandlerManager
    ):

        app.add_exception_handler(
            HTTPException,
            handler_manager.handle_http_exception
        )
        app.add_exception_handler(
            RequestValidationError,
            handler_manager.handle_validation_exception
        )
        app.add_exception_handler(
            Exception,
            handler_manager.handle_internal_error
        )

    def create_apps(
        self, 
        cors_origins: List[str], 
        middlewares: Optional[List[Callable]] = None
    ) -> FastAPI:

        main_app = FastAPI()
        
        # CORS 설정
        main_app.add_middleware(
            CORSMiddleware,
            allow_origins=cors_origins,
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
        
        # 버전별 앱 생성 및 설정
        for version in self.versions:
            if not version.enabled:
                continue
                
            version_app = FastAPI(
                title=version.title,
                version=version.version,
                description=version.description,
                servers=version.servers
            )
            
            # 미들웨어 추가
            if middlewares:
                for middleware in middlewares:
                    version_app.add_middleware(middleware)
            
            # 라우터 및 예외 핸들러 설정
            version_app.include_router(version.router)
            handler_manager = ExceptionHandlerManager(version.error_handler)
            self._configure_exception_handlers(version_app, handler_manager)
            
            # 메인 앱에 마운트
            main_app.mount(version.prefix, version_app)
            
        return main_app