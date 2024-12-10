from datetime import datetime
from typing import Dict, Optional
from fastapi import Request
from fastapi.responses import JSONResponse

class ErrorResponseBuilder:
    @staticmethod
    def build(
        request: Request,
        status_code: int,
        error: str,
        message: str,
        alert: bool = False,
        additional_info: Optional[Dict] = None
    ) -> Dict:
        response = {
            "timestamp": datetime.utcnow().isoformat(),
            "method": request.method,
            "path": request.url.path,
            "status": status_code,
            "code": status_code,
            "error": error,
            "message": message,
            "alert": alert
        }
        
        if additional_info:
            response.update(additional_info)
            
        return response

    @staticmethod
    def create_response(
        request: Request,
        status_code: int,
        error: str,
        message: str,
        alert: bool = False,
        additional_info: Optional[Dict] = None
    ) -> JSONResponse:
        content = ErrorResponseBuilder.build(
            request, status_code, error, message, alert, additional_info
        )
        return JSONResponse(status_code=status_code, content=content)