from pydantic import BaseModel, Field
from typing import List, Dict

class CompanyDataRequest(BaseModel):
    company_data: str = Field(
        ...,
        description="분석할 기업 정보 텍스트",
        min_length=10,
        max_length=10000
    )


################################# response #################################


class GrabberHRResponse(BaseModel):
    vision_comment: str
    workstyle_comment: str
    summary_comment: str