from fastapi import APIRouter
from app.router.v1.endpoint import analyses

recruit_api_router_v1 = APIRouter()
recruit_api_router_v1.include_router(analyses.router, tags=['analysis'])