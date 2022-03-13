# 이미지 사용
FROM node:16-alpine

WORKDIR /usr/src/app

COPY ./package.json ./

RUN yarn

COPY ./ ./

# 실행
EXPOSE 4000
CMD ["yarn", "start"]