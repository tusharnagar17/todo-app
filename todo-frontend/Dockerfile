## Stage 1: Base
FROM node:22-alpine AS base

WORKDIR /app

COPY package* ./

RUN npm ci

## Stage 2: Developement
FROM base AS dev 

WORKDIR /app

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

# Stage 3: Build
FROM dev AS build
RUN npm run build

# Stage 4: Production
FROM node:22-alpine AS prod
WORKDIR /server
COPY --from=build /server .
EXPOSE 3000
CMD ["npm", "run", "start"]