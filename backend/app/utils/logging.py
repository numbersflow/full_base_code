import logging
import os

# 현재 파일의 위치를 기준으로 프로젝트 루트 디렉토리 경로 설정
project_root = os.path.dirname(os.path.abspath(__file__))

# 루트 디렉토리에 logs 폴더 생성
log_directory = os.path.join(project_root, "logs")

# 디렉토리가 존재하지 않으면 생성
if not os.path.exists(log_directory):
    os.makedirs(log_directory)

# 로거 설정
logger = logging.getLogger("GrabberHRLogger")
logger.setLevel(logging.INFO)

# 핸들러를 통해 로그 파일로 출력
log_file_path = os.path.join(log_directory, "hr_analyses.log")
file_handler = logging.FileHandler(log_file_path)
file_handler.setLevel(logging.INFO)

# 포맷 설정
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
file_handler.setFormatter(formatter)

# 로거에 핸들러 추가
logger.addHandler(file_handler)