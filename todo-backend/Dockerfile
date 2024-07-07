# Stage 1: Base
FROM node:22-alpine AS base
WORKDIR /server
COPY package*.json ./
RUN npm install --force

# Stage 2: Development
FROM base AS dev
WORKDIR /server
COPY . .
EXPOSE 5000
CMD ["npm", "run", "dev"]

# Stage 3: Build
FROM base AS build
WORKDIR /server
COPY . .
RUN npm run build

# Stage 4: Production
FROM node:22-alpine AS prod
WORKDIR /server
COPY --from=build /server .
EXPOSE 5000
CMD ["npm", "run", "start"]
