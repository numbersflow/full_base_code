from typing import Dict, Any

ERROR_MAPPINGS: Dict[int, Dict[str, Any]] = {
    400: {
        "error_type": "400: bad_request",
        "default_message": "잘못된 요청입니다.",
        "should_log": True
    },
    401: {
        "error_type": "401: unauthorized",
        "default_message": "인증이 필요합니다.",
        "should_log": True
    },
    402: {
        "error_type": "402: payment_required",
        "default_message": "결제가 필요한 서비스입니다.",
        "should_log": True
    },
    403: {
        "error_type": "403: forbidden",
        "default_message": "접근 권한이 없습니다.",
        "should_log": True
    },
    404: {
        "error_type": "404: not_found",
        "default_message": "요청하신 리소스를 찾을 수 없습니다.",
        "should_log": True
    },
    405: {
        "error_type": "405: method_not_allowed",
        "default_message": "허용되지 않은 메소드입니다.",
        "should_log": True
    },
    408: {
        "error_type": "408: request_timeout",
        "default_message": "요청 시간이 초과되었습니다.",
        "should_log": True
    },
    409: {
        "error_type": "409: conflict",
        "default_message": "리소스 충돌이 발생했습니다.",
        "should_log": True
    },
    429: {
        "error_type": "429: too_many_requests",
        "default_message": "너무 많은 요청이 발생했습니다. 잠시 후 다시 시도해주세요.",
        "should_log": True
    },
    500: {
        "error_type": "500: internal_server_error",
        "default_message": "서버 내부 오류가 발생했습니다.",
        "should_log": True
    },
    502: {
        "error_type": "502: bad_gateway",
        "default_message": "게이트웨이 오류가 발생했습니다.",
        "should_log": True
    },
    503: {
        "error_type": "503: service_unavailable",
        "default_message": "서비스가 일시적으로 불가능합니다.",
        "should_log": True
    },
    504: {
        "error_type": "504: gateway_timeout",
        "default_message": "게이트웨이 시간 초과가 발생했습니다.",
        "should_log": True
    }
}