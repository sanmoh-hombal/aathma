FROM node:current-alpine3.15

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

ARG EXPRESS_PORT
ENV EXPRESS_PORT=${EXPRESS_PORT}

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN yarn

COPY . .

RUN yarn build

CMD ["yarn", "start"]
