FROM node:20

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm@9.15.4 && pnpm install --frozen-lockfile

COPY . .

EXPOSE 3001

# Start the React app using 'react-scripts start'
# Not recommended for production where we would rather use something like nginx to serve built files
CMD ["pnpm", "start"]
