FROM node:22

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

RUN npx prisma generate

RUN yarn build

RUN chown 1000:1002 .

EXPOSE 8100

CMD ["yarn", "start:prod"]
#CMD ["yarn", "start:dev"]