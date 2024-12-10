import os
import anthropic
from fastapi import HTTPException, status, Depends

from app.utils.logging import logger

from app.core.settings import anthropic_api_key

if anthropic_api_key is None:
    raise ValueError("ANTHROPIC_KEY 환경 변수가 설정되지 않았습니다.")


def get_anthropic_client():
    try:
        logger.info('API 키로 Claude-3 세션을 초기화합니다.')
        return anthropic.Anthropic(api_key=anthropic_api_key)
    
    except anthropic.AuthenticationError as e:
        logger.error(f"인증 오류 발생: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={
                "error": "인증 오류", 
                "message": "API 인증에 실패했습니다. API 키를 확인하세요.",
                "alert": True
            }
        )

    except anthropic.PermissionDeniedError as e:
        logger.error(f"권한 거부 오류 발생: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={
                "error": "권한 거부", 
                "message": "해당 작업에 대한 권한이 없습니다.",
                "alert": True
            }
        )
        
    except Exception as e:
        logger.error(f"예기치 않은 오류 발생: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                "error": "서버 오류", 
                "message": "요청을 처리하는 중 예기치 않은 오류가 발생했습니다.",
                "alert": True
            }
        )