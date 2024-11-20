# 개발 환경을 위한 Dockerfile
FROM node:18.19-alpine3.18

# 타임존 설정
ENV TZ=Asia/Seoul

# 작업 디렉토리 설정
WORKDIR /app

# 패키지 파일 복사
COPY package*.json ./

# 패키지 설치 (package-lock.json 사용)
RUN npm ci

# 소스 코드 복사
COPY . .

# 개발 서버 포트 설정
EXPOSE 3000

# 개발 서버 실행
CMD ["npm", "run", "dev:dev"]