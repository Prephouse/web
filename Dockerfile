FROM node:16

WORKDIR /app

# ENV PATH /app/node_modules/.bin:$PATH

RUN npm i -g pnpm

COPY pnpm-lock.yaml ./
RUN pnpm fetch

ADD . ./
RUN pnpm install -r --offline

EXPOSE 3000

CMD [ "pnpm", "start" ]
