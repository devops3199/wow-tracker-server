# 이미지 사용
FROM node:14-alpine

# 소스 전체 복사
COPY . /usr/src/app/server

# 해당 디렉토리로 이동 후 환경 설치
WORKDIR /usr/src/app/server
RUN npm install

# 실행
EXPOSE 4000
CMD ["npm", "run", "start"]