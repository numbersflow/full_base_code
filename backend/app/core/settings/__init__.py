from functools import lru_cache
import os
import dotenv

ENVIRONMENT = os.getenv('PYTHON_PROFILES_ACTIVE', 'development')

class Settings:
    def __init__(self):
        # 환경변수 파일 로드
        env_file = f".env.{ENVIRONMENT}"
        if not os.path.exists(env_file):
            raise ValueError(f"Environment file {env_file} not found")
        
        dotenv.load_dotenv(env_file)
        
        # 필수 환경변수 검증
        required_vars = {'DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME', 
                        'ANTHROPIC_KEY', 'OPENAI_KEY'}
        
        missing = [var for var in required_vars if not os.getenv(var)]
        if missing:
            raise ValueError(f"Missing required settings: {', '.join(missing)}")

    def get(self, key: str, default=None):
        """환경변수 값 반환"""
        return os.getenv(key, default)
    
    def get_cors_origins(self):
        origins = self.get('CORS_ORIGINS', '*')
        if origins == '*':
            return ['*']
        return [origin.strip() for origin in origins.split(',')]

@lru_cache()
def get_settings() -> Settings:
    return Settings()