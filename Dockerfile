FROM node:alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json yarn.lock ./
RUN yarn global add react-scripts typescript
RUN yarn install

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]
