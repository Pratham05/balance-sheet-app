# Use official Node.js LTS image
FROM node:20

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm@9.15.4 && pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

EXPOSE 4000

CMD ["pnpm", "start"]
