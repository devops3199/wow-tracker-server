# 이미지 사용
FROM node:16-alpine

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY ./ ./

# 실행
EXPOSE 4000
CMD ["npm", "run", "start"]