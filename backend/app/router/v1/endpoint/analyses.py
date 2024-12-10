from fastapi import APIRouter, HTTPException, Body, Depends
from typing import Optional, Dict, Callable
import json

from app.prompts import analyses

from app.dependencies.execution_time import log_execution_time

from app.schemas.v1.contents import CompanyDataRequest

from app.services.v1.extract_ketwords import extract_keywords
from app.services.v1.json_decoding import process_string_to_json
from app.services.v1.generate_ai_contents import anthropic_response

from app.utils.logging import logger


router = APIRouter()


from fastapi import HTTPException, status
from typing import List, Dict
from app.utils.logging import logger


def get_messages(company_data: str, top_keyword: str = "", output_type: str = "vision") -> List[Dict[str, str]]:
    """분석용 메시지 생성 함수"""
    try:
        # 입력값 검증
        if not company_data:
            raise ValueError("기업 정보가 비어있습니다.")
            
        if output_type not in ["vision", "workstyle"]:
            raise ValueError(f"지원하지 않는 출력 타입입니다: {output_type}")

        # 프롬프트 선택
        if output_type == "vision":
            system_prompt = analyses.VISION_SYSTEM_PROMPT
            user_prompt = analyses.VISION_USER_PROMPT.format(top_keyword=top_keyword)
        else:
            system_prompt = analyses.WORKSTYLE_SYSTEM_PROMPT
            user_prompt = analyses.WORKSTYLE_USER_PROMPT

        # 프롬프트 검증
        if not system_prompt or not user_prompt:
            logger.error(f"프롬프트 누락: system_prompt={bool(system_prompt)}, user_prompt={bool(user_prompt)}")
            raise ValueError("프롬프트 설정이 누락되었습니다.")

        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"기업 정보입니다.\n\n{company_data}"},
            {"role": "assistant", "content": "네. 기업 정보를 확인하였습니다."},
            {"role": "user", "content": user_prompt}
        ]
        
        return messages
        
    except ValueError as e:
        logger.error(f"메시지 생성 중 검증 오류: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "error": "메시지 생성 실패",
                "message": str(e),
                "alert": True
            }
        )
    except Exception as e:
        logger.error(f"메시지 생성 중 예기치 않은 오류: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                "error": "메시지 생성 실패",
                "message": "메시지 생성 중 오류가 발생했습니다.",
                "alert": True
            }
        )


@router.post("/analyze/vision")
async def analyze_vision(
    company_data: str = Body(..., embed=True),
    _: Callable = Depends(log_execution_time)
) -> Dict:
    """기업 비전 분석 API"""
    # 키워드 추출
    top_keyword = extract_keywords(company_data)
    
    # 메시지 생성
    messages = get_messages(company_data, top_keyword, "vision")
    
    # AI 응답 생성
    response = await anthropic_response(prompt=messages)
    
    # JSON 파싱 및 결과 반환
    return await process_string_to_json(response)
        



@router.post("/analyze/workstyle")
async def analyze_workstyle(
    company_data: str = Body(..., embed=True),
    vision_data: Optional[Dict] = Body(None),
    _: Callable = Depends(log_execution_time)
) -> Dict:
    """기업 업무스타일 분석 API"""
    if vision_data:
        company_data = f"{company_data}\n\n비전 점수 정보:\n{json.dumps(vision_data)}"
    
    # 키워드 추출 (실패시 빈 문자열 반환)
    top_keyword = extract_keywords(company_data)
        
    # 메시지 생성
    messages = get_messages(company_data, top_keyword, "workstyle")
    
    # AI 응답 생성
    response = await anthropic_response(prompt=messages)
    
    # JSON 파싱 및 결과 반환
    return await process_string_to_json(response)