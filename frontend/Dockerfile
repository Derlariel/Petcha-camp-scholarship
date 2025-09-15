FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache openssl
COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "preview"]
