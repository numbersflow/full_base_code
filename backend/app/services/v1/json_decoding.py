import re
import json
from collections import OrderedDict
from fastapi import HTTPException, status

# 비전 키워드 순서 정의
VISION_ORDER = [
    "혁신", "고객", "도전", "성장", "최고지향", "창조", "전문성", "상생",
    "소통", "사회공헌", "인재", "열정", "문제해결", "성과", "즐거움", "신속성"
]

# 업무스타일 키워드 순서 정의
WORKSTYLE_ORDER = [
    "전문가형", "역할중심형", "분석형", "겸손형", "논리형", "조율자형", "조력자형", "협력형",
    "마당발형", "과정주의형", "몰입형", "일중심사고형", "성취형", "도전형", "자기확신형", "혁신형",
    "창조형", "열린사고형", "직관형", "책임형", "열정형", "솔선수범형", "스피드형", "효율형",
    "신뢰형", "유니크형", "윤리형", "끈기형", "목표지향형", "긍정형"
]

async def process_string_to_json(text: str) -> dict:
    try:
        # 첫 번째 '{' 와 마지막 '}' 찾기
        start_idx = text.find('{')
        end_idx = text.rfind('}')
        
        if start_idx == -1 or end_idx == -1:
            raise ValueError("JSON 형식의 데이터를 찾을 수 없습니다.")
            
        # JSON 부분 추출 및 전처리
        json_str = text[start_idx:end_idx + 1]
        json_str = json_str.strip()
        
        # JSON 파싱 시도
        try:
            parsed_data = json.loads(json_str)
        except json.JSONDecodeError:
            # 공백, 줄바꿈 정리 후 재시도
            json_str = re.sub(r'\s+', ' ', json_str)
            parsed_data = json.loads(json_str)

        # 키 순서 재정렬
        ordered_data = OrderedDict()
        
        if "vision" in parsed_data:
            ordered_vision = OrderedDict()
            for key in VISION_ORDER:
                ordered_vision[key] = parsed_data["vision"][key]
            ordered_data["vision"] = ordered_vision
            
        if "workstyle" in parsed_data:
            ordered_workstyle = OrderedDict()
            for key in WORKSTYLE_ORDER:
                ordered_workstyle[key] = parsed_data["workstyle"][key]
            ordered_data["workstyle"] = ordered_workstyle
            
        return ordered_data
        
    except json.JSONDecodeError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "error": "JSON 파싱 실패",
                "message": str(e),
                "alert": True
            }
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "error": "잘못된 입력",
                "message": str(e),
                "alert": True
            }
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                "error": "데이터 처리 오류",
                "message": "서비스 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
                "alert": True
            }
        )