# 이미지 사용
FROM node:16-alpine

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install

ARG WOW_BNET_ID
ARG WOW_BNET_SECRET
ARG WOW_DB_HOST
ARG WOW_DB_PORT
ARG WOW_DB_USER
ARG WOW_DB_PASSWORD
ARG WOW_DB_DATABASE

COPY ./ ./

# 실행
EXPOSE 4000
CMD ["npm", "start"]