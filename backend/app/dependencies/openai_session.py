# import os
# import openai
# from aiohttp import ClientSession
# from fastapi import HTTPException, status, Depends

# from app.utils.logging import logger
# from app.utils.error_message import CHATGPT_ERROR_MESSAGE

# from app.dependencies.get_country_code import get_country_code


# api_key = os.environ.get('OPENAI_KEY')

# if api_key is None:
#     raise ValueError("OPENAI_KEY 환경 변수가 설정되지 않았습니다.")


# # OpenAI 초기화
# openai.api_key = api_key

# # def get_openai_session():
# #     return openai